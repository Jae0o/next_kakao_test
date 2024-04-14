import React from "react";
import style from "./Log.style.module.css";
import { Position } from "./Log.types";
import { Map, MapMarker } from "react-kakao-maps-sdk";
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
  pathRange: number;
  pinList: Position[];
  recordingTime: number;
  startRecord: () => void;
  endRecord: () => void;
  onClickFallback: () => void;
  onCreate: (param: kakao.maps.Polyline) => void;
  insertPin: () => void;
}

const LogView = ({
  isRecording,
  path,
  center,
  centerFetchCount,
  errorCount,
  pathRange,
  pathFetchCount,
  pinList,
  recordingTime,
  startRecord,
  endRecord,
  onClickFallback,
  onCreate,
  insertPin,
}: LogViewProps) => {
  return (
    <section className={style.log__layout}>
      <Map center={center} className={style.log__map}>
        <CenterMarker center={center} />
        {path.length !== 0 && <PathLine path={path} onCreate={onCreate} />}
        {pinList &&
          pinList.map((pinPosition, index) => (
            <MapMarker position={pinPosition} key={index} />
          ))}
      </Map>
      <button className={style.log__fallback} onClick={onClickFallback}>
        <FallbackIcon />
      </button>
      {/* Count Information Container */}
      <ul className={style.log__count_list}>
        <li className={style.log__count_item}>
          Api Call Count : {centerFetchCount}
        </li>
        <li className={style.log__count_item}>
          Path Fetch Count : {pathFetchCount}
        </li>
        <li className={style.log__count_item}>
          Path Array Length Count : {path.length}
        </li>
        <li className={style.log__count_item}>Pin Count : {pinList.length}</li>
        <li className={style.log__count_item}>Error Count : {errorCount}</li>
      </ul>
      <div className={style.log__action_layout}>
        {/* Start Button */}
        {!isRecording && (
          <div className={style.log__action_container}>
            <button onClick={startRecord} className={style.log_button}>
              start
            </button>
          </div>
        )}

        {isRecording && (
          <>
            <button onClick={insertPin} className={style.log__pin_button}>
              Pin
            </button>
            <div className={style.log__action_container}>
              <div className={style.log__record_container}>
                <p className={style.log__record}>{`
                  ${Math.floor(recordingTime / 3600)}시
                  ${Math.floor((recordingTime % 3600) / 60)}분
                  ${recordingTime % 60}초
                `}</p>
                <p className={style.log__record}> {`${pathRange} M`}</p>
              </div>
              <button onClick={endRecord} className={style.log_button}>
                end
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LogView;
