import { create } from "zustand";
import { Position } from "../app/log/Log.types";

const DEFAULT_CENTER_POSITION = {
  lat: 33.450701,
  lng: 126.570667,
};

interface UseUserLocation {
  currentLocation: Position;
  isLoading: boolean;
  fetchLocation: (param: Position) => void;
  setLoading: (value: boolean) => void;
}

export const useUserLocation = create<UseUserLocation>((set) => ({
  currentLocation: DEFAULT_CENTER_POSITION,
  isLoading: false,

  fetchLocation: ({ lat, lng }) => {
    set(() => ({ currentLocation: { lat, lng } }));
  },

  setLoading: (isLoading) => {
    set(() => ({ isLoading }));
  },
}));
