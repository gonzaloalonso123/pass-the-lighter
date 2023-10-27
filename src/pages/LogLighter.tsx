import { useContext, useState } from "react";
import Map from "../components/Map";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Person4Icon from "@mui/icons-material/Person4";
import LigtherPlaceholder from "../assets/images/lighter-placeholder.png";
import HistoryIcon from "@mui/icons-material/History";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Light, Verified } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  TextField,
  Typography,
} from "@mui/material";

import { useLog } from "../hooks/useLog";
import { LighterLogForm } from "../components/LighterLogForm";
import { haversine_distance } from "../utils";
import { createLighter, submitLog } from "../client/client";
import { LighterContext } from "../context/LighterContext";
import { VerifyLocation } from "../components/VerifyLocation";
import { LighterInfo } from "../components/LighterInfo";
import { useError } from "../hooks/useError";
import { FirstOwner } from "../components/FirstOwner";
import { LighterStory } from "../components/LighterStory";

export const LogLighter = () => {
  const { setLogged, logged, lighter, update } = useContext(LighterContext);
  const currentLog = useLog();
  const [distanceCheck, setDistanceCheck] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const errors = useError();

  const submit = () => {
    setSubmitLoading(true);
    if (verifyFields()) {
      let distance =
        lighter!.log.length > 0
          ? haversine_distance(
              {
                lat: currentLog.log.where.lat,
                lng: currentLog.log.where.lng,
              },
              {
                lat: lighter!.log[lighter!.log.length - 1].where.lat,
                lng: lighter!.log[lighter!.log.length - 1].where.lng,
              }
            )
          : 0;

      if (distance > 500 && currentLog.log.where.verified === false) {
        setDistanceCheck(true);
        errors.setLocationError(true);
      } else {
        if (lighter!.nickname === "") {
          createLighter(
            lighter!.id,
            currentLog.firstLighterName,
            currentLog.firstLighterObjective
          );
        }
        setLogged();
        submitLog(
          currentLog.log,
          distance,
          lighter!.id,
          lighter!.distanceTraveled
        ).then(() => {
          update();
        });
      }
    }
    setSubmitLoading(false);
  };

  const verifyFields = () => {
    const nameError = currentLog.log.nickname === "";
    const locationError = currentLog.log.where.id === "";
    const dateError = currentLog.log.when === "";
    const messageError = currentLog.log.message === "";

    errors.setNameError(nameError);
    errors.setLocationError(locationError);
    errors.setDateError(dateError);
    errors.setMessageError(messageError);

    if (nameError || locationError || dateError || messageError) {
      return false;
    }
    return true;
  };

  return (
    <div
      style={{
        maxWidth: "800px",
      }}
      className="mx-auto flex flex-col gap-4 w-screen py-12 px-4"
    >
      {distanceCheck && (
        <VerifyLocation
          close={() => {
            setDistanceCheck(false);
          }}
          currentLog={currentLog}
        />
      )}
      {lighter !== null && (
        <>
          <h1 className="text-4xl font-black text-center">
            {lighter.nickname}
          </h1>
          <Card className="p-4">
            <LighterInfo />
            {lighter.nickname === "" && !logged && (
              <FirstOwner
                currentLog={currentLog}
                submit={submit}
                submitLoading={submitLoading}
                errors={errors}
              />
            )}
          </Card>
          {lighter.nickname !== "" && !logged && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                color="black"
              >
                <Typography
                  sx={{
                    color: "black",
                    fontSize: "1.5em",
                    fontWeight: "bold",
                    display: "flex",
                    gap: ".6rem",
                    alignItems: "center",
                  }}
                >
                  <Person4Icon />
                  Log yourself
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  paddingTop: "3em",
                }}
              >
                <LighterLogForm
                  currentLog={currentLog}
                  submit={submit}
                  errors={errors}
                  submitLoading={submitLoading}
                />
              </AccordionDetails>
            </Accordion>
          )}
          {logged && (
            <div className="bg-white p-4">
              <h2 className="text-2xl">
                <CheckCircleIcon
                  className="mr-2"
                  style={{
                    color: "#22ab00",
                  }}
                />
                Logged
              </h2>
            </div>
          )}
          <LighterStory />
        </>
      )}
    </div>
  );
};
