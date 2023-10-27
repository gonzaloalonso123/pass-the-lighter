import React, { useContext } from "react";
import { LighterContext } from "../context/LighterContext";
import PeopleIcon from "@mui/icons-material/People";
import FlagIcon from "@mui/icons-material/Flag";

export const LighterInfo = () => {
  const { lighter } = useContext(LighterContext);
  return (
    <div className="flex flex-col gap-6">
      {lighter && (
        <>
          <div className="w-full flex justify-between items-center gap-4">
            <div
              className="p-2 rounded-xl flex items-center gap-1"
              style={{
                backgroundColor: "#ff477b",
              }}
            >
              <PeopleIcon className="mr-2" style={{ color: "white" }} />
              <h1 className="font-black">Distance traveled</h1>
              <label className="font-black bg-white rounded-full px-3 py-1 flex items-center justify-center ml-8">
                {(lighter.distanceTraveled + "").split(".")[0]}km
              </label>
            </div>
          </div>
          <div className="w-full flex justify-between items-center gap-4">
            <div
              className="p-2 rounded-xl flex items-center gap-1"
              style={{
                backgroundColor: "#ff477b",
              }}
            >
              <PeopleIcon className="mr-2" style={{ color: "white" }} />
              <h1 className="font-black">Owners</h1>
              <label className="font-black bg-white rounded-full px-3 py-1 flex items-center justify-center ml-8">
                {lighter.log.length}
              </label>
            </div>
          </div>
          {lighter.objective && lighter.objective !== "" && (
            <div className="w-full flex flex-col justify-start items-start">
              <div
                className="p-2 rounded-xl flex items-center gap-1 z-10 pr-4"
                style={{
                  backgroundColor: "#ff477b",
                }}
              >
                <FlagIcon className="mr-2" style={{ color: "white" }} />
                <h1 className="font-black">Objective</h1>
              </div>
              <div className="border-2 -translate-y-2 rounded-xl p-4">
                <label className="font-normal">{lighter.objective}</label>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
