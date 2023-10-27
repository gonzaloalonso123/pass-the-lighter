import { TextField } from "@mui/material";
import React from "react";
import { Log } from "../types/types";
import { CurrentLog } from "../hooks/useLog";
import { LighterLogForm } from "./LighterLogForm";

export const FirstOwner = ({
  currentLog,
  submit,
  submitLoading,
  errors,
}: {
  currentLog: CurrentLog;
  submit: () => void;
  submitLoading: boolean;
  errors: {
    nameError: boolean;
    locationError: boolean;
    dateError: boolean;
    messageError: boolean;
  };
}) => {
  const { setFirstLighterName, setFirstLighterObjective } = currentLog;
  return (
    <div className="flex flex-col gap-6 mt-10">
      <h2>Congratulations! You are the first owner of this lighter.</h2>
      <h2 className="font-black">
        <label
          className="rounded-xl text-white mr-2"
          style={{
            backgroundColor: "#ff477b",
            padding: ".5rem 1rem",
          }}
        >
          1
        </label>{" "}
        Name the lighter
      </h2>
      <TextField
        onChange={(e) => {
          setFirstLighterName(e.target.value);
        }}
      />
      <h2 className="font-black">
        <label
          className="rounded-xl text-white mr-2"
          style={{
            backgroundColor: "#ff477b",
            padding: ".5rem 1rem",
          }}
        >
          2
        </label>
        Set a goal for the lighter
      </h2>
      <TextField onChange={(e) => setFirstLighterObjective(e.target.value)} />
      <h2 className="font-black mb-8">
        <label
          className="rounded-xl text-white mr-2"
          style={{
            backgroundColor: "#ff477b",
            padding: ".5rem 1rem",
          }}
        >
          3
        </label>{" "}
        Log yourself
      </h2>
      <LighterLogForm
        currentLog={currentLog}
        submit={submit}
        errors={errors}
        submitLoading={submitLoading}
      />
    </div>
  );
};
