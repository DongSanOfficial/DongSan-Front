import { theme } from "src/styles/colors/theme";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";

interface Location {
  lat: number;
  lng: number;
}

interface TrackingMapProps {
  userLocation: Location;
  movingPath: Location[];
  pathToFollow?: Location[];
  isFollowing?: boolean;
  initialCenter?: Location;
}

export default function TrackingMap({
  userLocation,
  movingPath,
  pathToFollow,
  isFollowing,
  initialCenter,
}: TrackingMapProps) {
  return (
    <Map
      draggable={true}
      center={initialCenter || userLocation}
      style={{
        width: "100%",
        height: "100%",
      }}
      level={1}
    >
      <MapMarker position={userLocation}></MapMarker>

      {isFollowing && pathToFollow && pathToFollow.length > 0 && (
        <Polyline
          path={pathToFollow}
          strokeWeight={5}
          strokeColor={theme.Following}
          strokeOpacity={0.5}
          strokeStyle={"solid"}
        />
      )}

      {movingPath.length > 0 && (
        <Polyline
          path={movingPath}
          strokeWeight={5}
          strokeColor={theme.Green500}
          strokeOpacity={0.7}
          strokeStyle={"solid"}
        />
      )}
    </Map>
  );
}
