import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';

interface Location {
  lat: number;
  lng: number;
}

interface TrackingMapProps {
  userLocation: Location;
  movingPath: Location[];
}

export default function TrackingMapTest({ userLocation, movingPath }: TrackingMapProps) {
  return (
    <Map 
    draggable={true}
    center={userLocation}
      style={{
        width: "100%",
        height: "100%",
      }}
      level={3}
    >
      <MapMarker position={userLocation}>
      </MapMarker>
      {movingPath.length > 0 && (
        <Polyline
          path={movingPath}
          strokeWeight={5} 
          strokeColor={"#167258"}
          strokeOpacity={0.7} 
          strokeStyle={"solid"} 
        />
      )}
    </Map>
  );
}