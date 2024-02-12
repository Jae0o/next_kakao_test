"use client";

import { useRef } from "react";
import useLogModel from "./Log.model";
import { Position } from "./Log.types";
import LogView from "./Log.view";
import { throttle } from "lodash";
import { useRouter } from "next/navigation";

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

    setPath,
    setCenter,
    setPathFetchCount,
    setIsRecording,
    setWatchCode,
    setCenterFetchCount,
    setErrorCount,
    setPathRange,
  } = useLogModel();
  const router = useRouter();

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
  };

  const getPolyLineInfo = (polyLine: kakao.maps.Polyline) => {
    const newRange = Math.floor(polyLine.getLength());

    setPathRange(newRange);
  };

  // 사용자가 의도적으로 중단 버튼을 누르지 않고 페이지를 이동해버린 경우 - clear 동작이 안됨

  return (
    <LogView
      isRecording={isRecording}
      center={center}
      path={path}
      pathRange={pathRange}
      centerFetchCount={centerFetchCount}
      pathFetchCount={pathFetchCount}
      errorCount={errorCount}
      startRecord={startRecord}
      endRecord={endRecord}
      onClickFallback={() => router.back()}
      onCreate={getPolyLineInfo}
    />
  );
};

export default LogPage;
