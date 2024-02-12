"use client";

import { useEffect, useRef } from "react";
import useLogModel from "./Log.model";
import { Position } from "./Log.types";
import LogView from "./Log.view";
import { throttle } from "lodash";
import { useRouter } from "next/navigation";
import { useUserLocation } from "../../store/useUserLocation";

const LogPage = () => {
  const {
    isRecording,
    center,
    path,
    pathFetchCount,
    errorCount,
    watchCode,
    centerFetchCount,
    pathRange,
    pinList,

    setPath,
    setCenter,
    setPathFetchCount,
    setIsRecording,
    setWatchCode,
    setCenterFetchCount,
    setErrorCount,
    setPathRange,
    setPinList,
  } = useLogModel();
  const router = useRouter();

  const { fetchLocation } = useUserLocation();

  useEffect(() => {
    return () => {
      // watch에 대한 클린업을 진행
      if (!watchCode) {
        return;
      }

      navigator.geolocation.clearWatch(watchCode);
    };
  }, []);

  const changePath = useRef(
    throttle(({ lat, lng }: Position) => {
      setPath((prevPath) => [...prevPath, { lat, lng }]);

      // 테스트를 위한 Path Watch 동작 Count
      setPathFetchCount((prevCount) => prevCount + 1);
    }, 5000)
  ).current;

  const changeCenter = useRef(
    throttle(({ lat, lng }: Position) => {
      setCenter({ lat, lng });

      // 테스트를 위한 Center Watch 동작 Count
      setCenterFetchCount((prevCount) => prevCount + 1);
    }, 200)
  ).current;

  const handleWatchSuccess = ({ coords }: GeolocationPosition) => {
    const newPosition: Position = {
      lat: coords.latitude,
      lng: coords.longitude,
    };

    changePath(newPosition);
    changeCenter(newPosition);
  };

  const handleWatchError = () => {
    setErrorCount((prevErrorCount) => prevErrorCount + 1);
  };

  const startRecord = () => {
    // GPS 가 움직였다 라고 판단되면 동작
    // path
    const newWatchCode = navigator.geolocation.watchPosition(
      handleWatchSuccess,
      handleWatchError,
      { enableHighAccuracy: true }
    );

    setWatchCode(newWatchCode);
    setIsRecording(true);
  };

  const endRecord = () => {
    setIsRecording(false);

    navigator.geolocation.clearWatch(watchCode);

    // 위치 측정 종료시 현재 위치를 store에 저장함
    const getCurrentLocationSuccess = ({ coords }: GeolocationPosition) => {
      fetchLocation({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    };
    navigator.geolocation.getCurrentPosition(
      getCurrentLocationSuccess,
      handleWatchError,
      { enableHighAccuracy: true }
    );
  };

  const getPolyLineInfo = (polyLine: kakao.maps.Polyline) => {
    const newRange = Math.floor(polyLine.getLength());

    setPathRange(newRange);
  };

  const handleInsertPin = () => {
    setPinList((prevList) => [...prevList, center]);
  };

  return (
    <LogView
      isRecording={isRecording}
      center={center}
      path={path}
      pathRange={pathRange}
      centerFetchCount={centerFetchCount}
      pathFetchCount={pathFetchCount}
      errorCount={errorCount}
      pinList={pinList}
      startRecord={startRecord}
      endRecord={endRecord}
      onClickFallback={() => router.back()}
      onCreate={getPolyLineInfo}
      insertPin={handleInsertPin}
    />
  );
};

export default LogPage;
