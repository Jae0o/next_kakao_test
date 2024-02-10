"use client";

import { useCallback, useState } from "react";
import style from "./styles.module.css";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import PathLine from "./components/PathLine";

interface Position {
  lat: number;
  lng: number;
}

const Log = () => {
  const [center, setCenter] = useState<Position>({
    lat: 33.450701,
    lng: 126.570667,
  });

  const [path, setPath] = useState<Position[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [centerFetchCount, setCenterFetchCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [watchCode, setWatchCode] = useState(0);

  const error = ({ code, message }: GeolocationPositionError) => {
    console.log("watchError code", code);
    console.log("watchError message", message);
    setErrorCount((prevCount) => prevCount + 1);
  };

  const centerRecordSuccess = ({ coords }: GeolocationPosition) => {
    const newPosition: Position = {
      lat: coords.latitude,
      lng: coords.longitude,
    };

    setPath((prevPath) => [...prevPath, newPosition]);

    setCenter(newPosition);
    setCenterFetchCount((prevCount) => prevCount + 1);

    console.log("new Center Position", newPosition);
  };

  const startRecord = useCallback(() => {
    const newWatchCode = navigator.geolocation.watchPosition(
      centerRecordSuccess,
      error,
      {
        enableHighAccuracy: true,
      }
    );

    console.log("start Center Record", watchCode);
    setWatchCode(newWatchCode);

    setIsRecording(true);
  }, []);

  const clearRecord = useCallback(() => {
    setIsRecording(false);

    navigator.geolocation.clearWatch(watchCode);
    console.log("end Path Record", watchCode);
  }, []);

  return (
    <section className={style.log__layout}>
      {isRecording && (
        <button onClick={clearRecord} className={style.log_button}>
          end
        </button>
      )}

      {!isRecording && (
        <button onClick={startRecord} className={style.log_button}>
          start
        </button>
      )}

      <Map center={center} className={style.log__map}>
        <MapMarker position={center} />
        {isRecording && <PathLine />}
      </Map>
      <h1>Center Fetch : {centerFetchCount}</h1>
      <h1>Error Count : {errorCount}</h1>
    </section>
  );
};

export default Log;
