import { useState } from "react";
import { Position } from "./Log.types";

const DEFAULT_CENTER_POSITION = {
  lat: 33.450701,
  lng: 126.570667,
};

const useLogModel = () => {
  const [center, setCenter] = useState<Position>(DEFAULT_CENTER_POSITION);
  const [path, setPath] = useState<Position[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [centerFetchCount, setCenterFetchCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [watchCode, setWatchCode] = useState(0);

  return {
    center,
    setCenter,
    path,
    setPath,
    isRecording,
    setIsRecording,
    centerFetchCount,
    setCenterFetchCount,
    errorCount,
    setErrorCount,
    watchCode,
    setWatchCode,
  };
};

export default useLogModel;
