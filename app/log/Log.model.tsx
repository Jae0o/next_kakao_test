import { useState } from "react";
import { Position } from "./Log.types";
import { useUserLocation } from "../../store/useUserLocation";

const useLogModel = () => {
  const { currentLocation } = useUserLocation();

  // 현재 사용자 위치
  const [center, setCenter] = useState<Position>(currentLocation);
  // 사용자 이동 경로
  const [path, setPath] = useState<Position[]>([]);
  // 현재 기록을 시작 했는가?
  const [isRecording, setIsRecording] = useState(false);
  // 현재 이동 거리 저장
  const [pathRange, setPathRange] = useState(0);
  // 감시 동작 코드 - 측정 종료시 clear 동작
  const [watchCode, setWatchCode] = useState(0);

  // Test Count 들
  const [pathFetchCount, setPathFetchCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [centerFetchCount, setCenterFetchCount] = useState(0);

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
