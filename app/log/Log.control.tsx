"use client";

import useLogModel from "./Log.model";
import { Position } from "./Log.types";
import LogView from "./Log.view";

const LogPage = () => {
  const {
    isRecording,
    center,
    path,
    pathFetchCount,
    errorCount,
    watchCode,
    centerFetchCount,
    insertPathCount,
    setPath,
    setCenter,
    setPathFetchCount,
    setIsRecording,
    setWatchCode,
    setCenterFetchCount,
    setErrorCount,
    setInsertPathCount,
  } = useLogModel();

  const handlePathSuccess = ({ coords }: GeolocationPosition) => {
    const newPosition: Position = {
      lat: coords.latitude,
      lng: coords.longitude,
    };

    setPath((prevPath) => {
      const prevPosition = prevPath[prevPath.length - 1];

      if (
        prevPosition &&
        prevPosition.lat === newPosition.lat &&
        prevPosition.lng === newPosition.lng
      ) {
        return prevPath;
      }

      console.log("new Path Position", [...prevPath, newPosition]);

      setInsertPathCount((prevCount) => prevCount + 1);
      return [...prevPath, newPosition];
    });

    setPathFetchCount((prevCount) => prevCount + 1);
  };

  const handleCenterSuccess = ({ coords }: GeolocationPosition) => {
    const newPosition: Position = {
      lat: coords.latitude,
      lng: coords.longitude,
    };

    setCenter(() => {
      console.log("new Center Position", newPosition);
      return newPosition;
    });

    setCenterFetchCount((prevCount) => prevCount + 1);
  };

  const handleError = ({ message, code }: GeolocationPositionError) => {
    console.log("Error Code", code);
    console.log("Error Message", message);
    setErrorCount((prevErrorCount) => prevErrorCount + 1);
  };

  const startRecord = () => {
    const newPathWatchCode = navigator.geolocation.watchPosition(
      handlePathSuccess,
      handleError,
      { enableHighAccuracy: true, maximumAge: 5000 }
    );

    const newCenterWatchCode = navigator.geolocation.watchPosition(
      handleCenterSuccess,
      handleError,
      { enableHighAccuracy: true, maximumAge: 0 }
    );

    console.log("start Path Record", newPathWatchCode);
    console.log("start Center Record", newCenterWatchCode);

    setWatchCode((prev) => ({
      ...prev,
      center: newCenterWatchCode,
      path: newPathWatchCode,
    }));

    setIsRecording(true);
  };

  const endRecord = () => {
    setIsRecording(false);
    console.log("clear", watchCode.center);

    navigator.geolocation.clearWatch(watchCode.center);
    navigator.geolocation.clearWatch(watchCode.path);

    console.log("Recording Path", path);
  };

  return (
    <LogView
      isRecording={isRecording}
      center={center}
      path={path}
      centerFetchCount={centerFetchCount}
      pathFetchCount={pathFetchCount}
      errorCount={errorCount}
      insertPathCount={insertPathCount}
      startRecord={startRecord}
      endRecord={endRecord}
    />
  );
};

export default LogPage;
