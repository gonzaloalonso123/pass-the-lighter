import { useState } from "react";
import { Log } from "../types/types";

export type CurrentLog = {
  log: Log;
  setUser: (name: string) => void;
  setDate: (date: string) => void;
  setLocation: (location: {
    name: string;
    lat: number;
    lng: number;
    id: string;
    verified: boolean;
  }) => void;
  setImage: (image: string) => void;
  setMessage: (message: string) => void;
  firstLighterName: string;
  setFirstLighterName: (name: string) => void;
  firstLighterObjective: string;
  setFirstLighterObjective: (objective: string) => void;
};

export const useLog = () => {
  const [log, setLog] = useState<Log>({
    nickname: "",
    when: "",
    where: {
      name: "",
      id: "",
      lat: 0,
      lng: 0,
      verified: false,
    },
    image: "",
    message: "",
  });

  const [firstLighterName, setFirstLighterName] = useState("");
  const [firstLighterObjective, setFirstLighterObjective] = useState("");

  const setUser = (name: string) => {
    setLog((prev) => ({ ...prev, nickname: name }));
  };

  const setDate = (date: string) => {
    setLog((prev) => ({ ...prev, when: date }));
  };

  const setLocation = (location: {
    name: string;
    lat: number;
    lng: number;
    id: string;
    verified: boolean;
  }) => {
    setLog((prev) => ({ ...prev, where: location }));
  };

  const setImage = (image: string) => {
    setLog((prev) => ({ ...prev, image }));
  };

  const setMessage = (message: string) => {
    setLog((prev) => ({ ...prev, message }));
  };

  return {
    log,
    setUser,
    setDate,
    setLocation,
    setImage,
    setMessage,
    firstLighterName,
    setFirstLighterName,
    firstLighterObjective,
    setFirstLighterObjective,
  };
};
