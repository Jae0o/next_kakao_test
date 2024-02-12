import { create } from "zustand";
import { Position } from "../app/log/Log.types";

const DEFAULT_CENTER_POSITION = {
  lat: 33.450701,
  lng: 126.570667,
};

interface UseUserLocation {
  currentLocation: Position;
  watchCode: number;

  watchSuccess: (param: GeolocationPosition) => void;
  fetchLocation: (param: Position) => void;
  setWatchCode: (code: number) => void;
  deleteWatch: (code: number) => void;
}

export const useUserLocation = create<UseUserLocation>((set) => ({
  currentLocation: {
    lat: 0,
    lng: 0,
  },
  watchCode: 0,

  watchSuccess: () => {},

  fetchLocation: ({ lat, lng }) => {
    set(() => ({ currentLocation: { lat, lng } }));
  },

  setWatchCode: (newCode) => {
    set(() => ({ watchCode: newCode }));
  },

  deleteWatch: (code) => {
    navigator.geolocation.clearWatch(code);
  },
}));
