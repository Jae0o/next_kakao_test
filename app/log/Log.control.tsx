"use client";

import { useRef } from "react";
import useLogModel from "./Log.model";
import { Position } from "./Log.types";
import LogView from "./Log.view";
import { throttle } from "lodash";

const LogPage = () => {
  const {
    isRecording,
    center,
    path,
    pathFetchCount,
    errorCount,
    watchCode,
    centerFetchCount,

    setPath,
    setCenter,
    setPathFetchCount,
    setIsRecording,
    setWatchCode,
    setCenterFetchCount,
    setErrorCount,
  } = useLogModel();

  const handlePathSuccess = useRef(
    throttle(({ coords }: GeolocationPosition) => {
      const newPosition: Position = {
        lat: coords.latitude,
        lng: coords.longitude,
      };

      setPath((prevPath) => [...prevPath, newPosition]);

      // 테스트를 위한 Path Watch 동작 Count
      setPathFetchCount((prevCount) => prevCount + 1);
    }, 5000)
  ).current;

  const handleCenterWatch = ({ coords }: GeolocationPosition) => {
    setCenter({
      lat: coords.latitude,
      lng: coords.longitude,
    });

    // 테스트를 위한 Center Watch 동작 Count
    setCenterFetchCount((prevCount) => prevCount + 1);
  };

  const handleError = () => {
    setErrorCount((prevErrorCount) => prevErrorCount + 1);
  };

  const startRecord = () => {
    // GPS 가 움직였다 라고 판단되면 동작
    // path
    const newPathWatchCode = navigator.geolocation.watchPosition(
      handlePathSuccess,
      handleError,
      { enableHighAccuracy: true }
    );

    // pin
    const newCenterWatchCode = navigator.geolocation.watchPosition(
      handleCenterWatch,
      handleError,
      { enableHighAccuracy: true }
    );

    setWatchCode((prev) => ({
      ...prev,
      center: newCenterWatchCode,
      path: newPathWatchCode,
    }));

    setIsRecording(true);
  };

  const endRecord = () => {
    setIsRecording(false);

    navigator.geolocation.clearWatch(watchCode.center);
    navigator.geolocation.clearWatch(watchCode.path);
  };

  // 사용자가 의도적으로 중단 버튼을 누르지 않고 페이지를 이동해버린 경우 - clear 동작이 안됨

  return (
    <LogView
      isRecording={isRecording}
      center={center}
      path={path}
      centerFetchCount={centerFetchCount}
      pathFetchCount={pathFetchCount}
      errorCount={errorCount}
      startRecord={startRecord}
      endRecord={endRecord}
    />
  );
};

export default LogPage;
