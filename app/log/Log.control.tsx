"use client";

import { useCallback } from "react";
import useLogModel from "./Log.model";
import { Position } from "./Log.types";
import LogView from "./Log.view";

const LogPage = () => {
  const {
    isRecording,
    center,
    path,
    centerFetchCount,
    errorCount,
    watchCode,
    setPath,
    setCenter,
    setCenterFetchCount,
    setIsRecording,
    setWatchCode,
  } = useLogModel();

  const handleSuccess = ({ coords }: GeolocationPosition) => {
    const newPosition: Position = {
      lat: coords.latitude,
      lng: coords.longitude,
    };

    setPath((prevPath) => [...prevPath, newPosition]);

    setCenter(newPosition);

    setCenterFetchCount((prevCount) => prevCount + 1);

    console.log("new Center Position", newPosition);
  };

  const handleError = ({ message, code }: GeolocationPositionError) => {
    console.log("Error Code", code);
    console.log("Error Message", message);
  };

  const startRecord = useCallback(() => {
    const newWatchCode = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      { enableHighAccuracy: true }
    );

    console.log("start Center Record", watchCode);

    setWatchCode(newWatchCode);
    setIsRecording(true);
  }, []);

  const endRecord = useCallback(() => {
    setIsRecording(false);
    navigator.geolocation.clearWatch(watchCode);

    console.log("end Path Record", watchCode);

    console.log("Recording Path", path);
  }, []);

  return (
    <LogView
      isRecording={isRecording}
      center={center}
      path={path}
      centerFetchCount={centerFetchCount}
      errorCount={errorCount}
      startRecord={startRecord}
      endRecord={endRecord}
    />
  );
};

export default LogPage;
