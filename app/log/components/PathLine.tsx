"use client";

import { useEffect, useState } from "react";
import { Polyline } from "react-kakao-maps-sdk";

interface Position {
  lat: number;
  lng: number;
}

const PathLine = () => {
  const [path, setPath] = useState<Position[]>([]);

  const success = ({ coords }: GeolocationPosition) => {
    const newPosition = {
      lat: coords.latitude,
      lng: coords.longitude,
    };
    setPath((prevPath) => [...prevPath, newPosition]);
    console.log("path record", newPosition);
  };

  const error = ({ code, message }: GeolocationPositionError) => {
    console.log("path Error code", code);
    console.log("path Error Message", message);
  };

  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
    });
  };

  useEffect(() => {
    const intervalCode = setInterval(getPosition, 1000);
    console.log("start path record", intervalCode);

    return () => {
      clearInterval(intervalCode);
      console.log("end path record", intervalCode);
    };
  }, []);

  return (
    <>
      <Polyline
        path={path}
        strokeColor="#ff7f50"
        strokeStyle="solid"
        strokeWeight={10}
        strokeOpacity={1}
      />
    </>
  );
};

export default PathLine;
