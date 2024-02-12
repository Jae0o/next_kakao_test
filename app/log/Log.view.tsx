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
      <Map center={center} className={style.log__map}>
        <MapMarker position={center} />
        {path.length !== 0 && (
          <Polyline
            path={path}
            strokeColor="#ff7f50"
            strokeStyle="solid"
            strokeWeight={10}
            strokeOpacity={1}
          />
        )}
      </Map>

      {/* Count Information Container */}
      <ul className={style.log__count_list}>
        <li className={style.log__count_item}>
          Center Fetch Count : {centerFetchCount}
        </li>
        <li className={style.log__count_item}>
          Path Fetch Count : {pathFetchCount}
        </li>
        <li className={style.log__count_item}>
          Path Array Length Count : {path.length}
        </li>
        <li className={style.log__count_item}>Error Count : {errorCount}</li>
      </ul>

      <div className={style.log__action_container}>
        {/* Start Button */}
        {!isRecording && (
          <button onClick={startRecord} className={style.log_button}>
            start
          </button>
        )}

        {isRecording && (
          <>
            <div className={style.log__record_container}>
              <p className={style.log__record}> 25 : 25 : 25</p>
              <p className={style.log__record}> 100.40 km</p>
            </div>
            <button onClick={endRecord} className={style.log_button}>
              end
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default LogView;
