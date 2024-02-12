import { create, useStore } from "zustand";
import { Position } from "../app/log/Log.types";

interface UseUserLocation {
  currentLocation: Position;
  watchCode: number;

  fetchLocation: (param: Position) => void;
  setWatchCode: (code: number) => void;
}

export const useUserLocation = create<UseUserLocation>((set) => ({
  currentLocation: {
    lat: 0,
    lng: 0,
  },
  watchCode: 0,

  fetchLocation: ({ lat, lng }) => {
    set(() => ({ currentLocation: { lat, lng } }));
  },

  setWatchCode: (newCode) => {
    set(() => ({ watchCode: newCode }));
  },
}));
