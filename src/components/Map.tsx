import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";
import { Log } from "../types/types";
import LigtherPlaceholder from "../assets/images/lighter-placeholder.png";
import { Verified } from "@mui/icons-material";
import { Card } from "@mui/material";

const RouteMap = ({ log }: { log: Log[] }) => {
  return <Map log={log} />;
};

const lineSymbol = {
  strokeOpacity: 1,
  path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
  strokeColor: "#ff477b",
};
const dashSymbol = {
  path: "M 0,-1 0,1",
  strokeOpacity: 1,
  scale: 2,
  strokeColor: "#000",
};

const options = {
  icons: [
    {
      icon: lineSymbol,
      offset: "0",
      repeat: "100px",
    },
    {
      icon: dashSymbol,
      offset: "0",
      repeat: "10px",
    },
  ],
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
    setPolyline([...coordinates]);
  };

  return (
    <GoogleMap
      zoom={8}
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
              <Card className="flex my-4" elevation={2} key={index}>
                <div className="w-24 h-24 md:w-32 md:h-32">
                  <img
                    src={log[index].image || LigtherPlaceholder}
                    alt=""
                    className="h-full object-cover"
                  />
                </div>
                <div className="flex flex-col w-full p-2 px-4">
                  <div className="flex justify-between w-full items-center">
                    <p className="text-lg font-black">{log[index].nickname}</p>
                    <p className="text-sm">{log[index].when}</p>
                  </div>
                  <p className="text-xs">
                    {log[index].where.name}{" "}
                    {log[index].where.verified && (
                      <label
                        className="text-green-500"
                        style={{ fontSize: ".7em" }}
                      >
                        <Verified style={{ fontSize: "1.2em" }} />
                        Verified
                      </label>
                    )}
                  </p>
                  <p className="text-sm mt-4">{log[index].message}</p>
                </div>
              </Card>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
};
export default RouteMap;
