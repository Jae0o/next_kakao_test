import React from "react";
import style from "./Log.style.module.css";
import { Position } from "./Log.types";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import PathLine from "./components/PathLine";
import CenterMarker from "./components/CenterMarker";
import FallbackIcon from "./components/FallbackIcon";

interface LogViewProps {
  isRecording: boolean;
  center: Position;
  path: Position[];
  centerFetchCount: number;
  errorCount: number;
  pathFetchCount: number;
  startRecord: () => void;
  endRecord: () => void;
  onClickFallback: () => void;
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
  onClickFallback,
}: LogViewProps) => {
  return (
    <section className={style.log__layout}>
      <Map center={center} className={style.log__map}>
        <CenterMarker center={center} />
        {path.length !== 0 && <PathLine path={path} />}
      </Map>

      <button className={style.log__fallback} onClick={onClickFallback}>
        <FallbackIcon />
      </button>

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
