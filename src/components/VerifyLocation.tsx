import { Card, CircularProgress } from "@mui/material";
import { useState } from "react";
import { haversine_distance } from "../utils";
import { CurrentLog } from "../hooks/useLog";

export const VerifyLocation = ({
  close,
  currentLog,
}: {
  close: () => void;
  currentLog: CurrentLog;
}) => {
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [error, setError] = useState("");
  const verify = () => {
    setVerificationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        if (
          haversine_distance(
            {
              lat: currentLog.log.where.lat,
              lng: currentLog.log.where.lng,
            },
            {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
          ) < 30
        ) {
          setVerificationLoading(false);
          close();
        } else {
          setError("Your location doesnt match. Please try again.");
          setTimeout(() => {
            close();
          }, 3000);
        }
      });
    }
  };
  return (
    <div className="fixed w-screen h-screen flex items-center justify-center bg-slate-200  top-0 left-0 z-50">
      <Card className="p-6 flex-col gap-6 flex">
        <h2 className="text-2xl font-black text-center">
          Your location is more than 500km away from last log.
        </h2>
        <p>Please verify your location.</p>
        <button
          onClick={verify}
          className="px-4 py-1 rounded-xl"
          style={{
            backgroundColor: "#ff477b",
          }}
        >
          {verificationLoading ? (
            <CircularProgress
              style={{ width: "1.2em", height: "1.2em" }}
              sx={{ color: "white" }}
            />
          ) : (
            <h1 className="font-black">Verify</h1>
          )}
        </button>
        <h2 className="text-red">{error}</h2>
      </Card>
    </div>
  );
};
