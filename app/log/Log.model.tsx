import { useState } from "react";
import { Position } from "./Log.types";
import { useUserLocation } from "../../store/useUserLocation";

const useLogModel = () => {
  const { currentLocation } = useUserLocation();

  const [center, setCenter] = useState<Position>(currentLocation);
  const [path, setPath] = useState<Position[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [pathFetchCount, setPathFetchCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [centerFetchCount, setCenterFetchCount] = useState(0);
  const [watchCode, setWatchCode] = useState({
    center: 0,
    path: 0,
  });
  const [pathRange, setPathRange] = useState(0);

  return {
    center,
    setCenter,
    path,
    setPath,
    isRecording,
    setIsRecording,
    pathFetchCount,
    setPathFetchCount,
    errorCount,
    setErrorCount,
    watchCode,
    setWatchCode,
    centerFetchCount,
    setCenterFetchCount,
    pathRange,
    setPathRange,
  };
};

export default useLogModel;
