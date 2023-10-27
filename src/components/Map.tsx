import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";
import { Log } from "../types/types";

const RouteMap = ({ log }: { log: Log[] }) => {
  return <Map log={log} />;
};

const lineSymbol = {
  path: "M 0,-1 0,1",
  strokeOpacity: 1,
  fillOpacity: 0,
  scale: 3,
};

const options = {
  icons: [
    {
      icon: lineSymbol,
      offset: "0",
      repeat: "20px",
    },
  ],
  strokeOpacity: 0,
  strokeColor: "#ff477b",
};

const Map = ({ log }: { log: Log[] }) => {
  useEffect(() => {
    makePolyLine();
  }, [log]);
  const [polyLine, setPolyline] = useState<google.maps.LatLngLiteral[]>([]);
  const [visibleMarker, setVisibleMarker] = useState(-1);

  const makePolyLine = () => {
    let coordinates: google.maps.LatLngLiteral[] = [];
    log.map((log) => {
      coordinates.push({
        lat: log.where.lat,
        lng: log.where.lng,
      });
    });
    console.log(coordinates);
    setPolyline([...coordinates]);
  };

  return (
    <GoogleMap
      zoom={4}
      center={
        log[1] != null
          ? ({
              lat: log[1].where.lat,
              lng: log[1].where.lng,
            } as google.maps.LatLngLiteral)
          : { lat: 40, lng: -3 }
      }
      options={{
        gestureHandling: "greedy",
      }}
      mapContainerClassName="map-container"
    >
      {polyLine.length != 0 && <Polyline path={polyLine} options={options} />}
      {polyLine.map((point, index) => (
        <Marker
          onClick={() => setVisibleMarker(index)}
          position={point}
          key={index}
        >
          {index === visibleMarker && (
            <InfoWindow>
              <div>
                <span style={{ color: "#ff477b" }}>{log[index].nickname}</span>
                <p>{log[index].where.name}</p>
                <span style={{ color: "#ff477b" }}>{log[index].message}</span>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
};
export default RouteMap;
