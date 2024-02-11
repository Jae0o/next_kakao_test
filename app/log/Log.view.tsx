import React from "react";
import style from "./Log.style.module.css";
import { Position } from "./Log.types";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";

interface LogViewProps {
  isRecording: boolean;
  center: Position;
  path: Position[];
  centerFetchCount: number;
  errorCount: number;
  pathFetchCount: number;
  startRecord: () => void;
  endRecord: () => void;
}

const LogView = ({
  isRecording,
  path,
  center,
  centerFetchCount,
  errorCount,
  pathFetchCount,
  startRecord,
  endRecord,
}: LogViewProps) => {
  return (
    <section className={style.log__layout}>
      {isRecording && (
        <button onClick={endRecord} className={style.log_button}>
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
        {isRecording && (
          <Polyline
            path={path}
            strokeColor="#ff7f50"
            strokeStyle="solid"
            strokeWeight={10}
            strokeOpacity={1}
          />
        )}
      </Map>
      <h1>Center Fetch : {centerFetchCount}</h1>
      <h1>Path Fetch : {pathFetchCount}</h1>
      <h1>Error Count : {errorCount}</h1>
      <h1>Path Count : {path.length}</h1>
    </section>
  );
};

export default LogView;
