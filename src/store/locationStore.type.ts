export interface Location {
  lat: number;
  lng: number;
}

export type SetState = {
  currentLocation: Location | null;
  loading: boolean;
  error: string | null;
};

export interface LocationState extends SetState {
  setCurrentLocation: (location: Location) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  getCurrentLocation: () => Promise<Location>;
}
