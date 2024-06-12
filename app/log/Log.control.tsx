"use client";

import { useEffect, useRef } from "react";
import useLogModel from "./Log.model";
import { Position } from "./Log.types";
import LogView from "./Log.view";
import { throttle } from "lodash";
import { useRouter } from "next/navigation";
import { useUserLocation } from "../../store/useUserLocation";
import distanceFilter from "../../util/distanceFilter";

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
    recordingTime,
    timerId,

    setPath,
    setCenter,
    setPathFetchCount,
    setIsRecording,
    setWatchCode,
    setCenterFetchCount,
    setErrorCount,
    setPathRange,
    setPinList,
    setRecordingTime,
    setTimerId,
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

  useEffect(() => {
    if (isRecording) {
      const id = setInterval(() => {
        setRecordingTime((prevTime) => (prevTime += 1));
      }, 1000);
      setTimerId(id);
    } else {
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }
      setRecordingTime(0);
    }
  }, [isRecording]);

  const changePath = useRef(
    throttle((newPosition: Position) => {
      setPath((prevPath) => {
        const prevPosition = prevPath[prevPath.length - 1];

        if (prevPosition) {
          const pointDistance = distanceFilter(newPosition, prevPosition);

          if (pointDistance < 25 || pointDistance > 80) {
            return prevPath;
          }
        }

        setPathFetchCount((prevCount) => prevCount + 1);
        return [...prevPath, newPosition];
      });
    }, 0)
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
      recordingTime={recordingTime}
    />
  );
};

export default LogPage;
