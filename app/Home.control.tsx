"use client";

import React, { useEffect } from "react";
import HomeView from "./Home.view";
import { useRouter } from "next/navigation";
import { useUserLocation } from "../store/useUserLocation";

const HomeControl = () => {
  const router = useRouter();
  const { fetchLocation, isLoading, setLoading } = useUserLocation();

  useEffect(() => {
    setLoading(true);
    // 해당 부분의 동작은 추후 로그인과 동시에 진행되면 좋을 것 같음!
    // 정책에 위배 되지 않기 위해서 그리고 로그인과 동시에 위치에 대한 동의도 받기 위해서

    /* 문제

      현재 사용자의 위치를 useEffect를 통해 사용자의 액션 없이 위치 정보를 얻는 행동은 정책에 위배됨
      따라서 이후 버튼을 클릭하고 아래 위치에 대한 정보를 수집한다는 안내도 추후에 진행해야할것으로 생각됨

      watch 만 정책 위반인가  아니면 current 도 정책 위반인가?
      
    */

    const success = ({ coords }: GeolocationPosition) => {
      fetchLocation({
        lat: coords.latitude,
        lng: coords.longitude,
      });

      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const handleClick = () => {
    router.push("/log");
  };

  return <HomeView onClick={handleClick} isLoading={isLoading} />;
};

export default HomeControl;
