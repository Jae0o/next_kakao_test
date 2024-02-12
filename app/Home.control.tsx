"use client";

import React from "react";
import HomeView from "./Home.view";
import { useRouter } from "next/navigation";

const HomeControl = () => {
  const router = useRouter();

  const success = ({ coords }: GeolocationPosition) => {
    const { latitude, longitude } = coords;

    if (typeof window === "undefined") {
      return;
    }

    router.push(`/log/?lat=${latitude}&lng=${longitude}`);
  };

  const error = () => {
    alert("위치 정보를 받아오는데 실패함");
  };

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(success, error);
  };

  return <HomeView onClick={handleClick} />;
};

export default HomeControl;
