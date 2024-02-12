"use client";

import React, { useEffect } from "react";
import HomeView from "./Home.view";
import { useRouter } from "next/navigation";
import { useUserLocation } from "../store/useUserLocation";

const HomeControl = () => {
  const router = useRouter();
  const { fetchLocation } = useUserLocation();

  useEffect(() => {
    const success = ({ coords }: GeolocationPosition) => {
      fetchLocation({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    };

    navigator.geolocation.getCurrentPosition(success);
  });

  // const success = ({ coords }: GeolocationPosition) => {
  //   const { latitude, longitude } = coords;

  //   if (typeof window === "undefined") {
  //     return;
  //   }

  //   router.push(`/log/?lat=${latitude}&lng=${longitude}`);
  // };

  // const error = () => {
  //   alert("위치 정보를 받아오는데 실패함");
  // };

  const handleClick = () => {
    router.push("/log");
  };

  return <HomeView onClick={handleClick} />;
};

export default HomeControl;
