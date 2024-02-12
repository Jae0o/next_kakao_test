import { create } from "zustand";
import { Position } from "../app/log/Log.types";

const DEFAULT_CENTER_POSITION = {
  lat: 33.450701,
  lng: 126.570667,
};

interface UseUserLocation {
  currentLocation: Position;

  fetchLocation: (param: Position) => void;
}

export const useUserLocation = create<UseUserLocation>((set) => ({
  currentLocation: {
    lat: 0,
    lng: 0,
  },

  fetchLocation: ({ lat, lng }) => {
    set(() => ({ currentLocation: { lat, lng } }));
  },
}));
