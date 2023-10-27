import React, { useEffect, useState } from "react";
import { Lighter } from "../types/types";
import { truncate } from "fs";
import { getOneLighter } from "../client/client";
import { useNavigate } from "react-router-dom";

type LighterContextType = {
  lighter: Lighter | null;
  setLighter: (lighter: Lighter) => void;
  logged: boolean;
  setLogged: () => void;
  setCode: (code: string) => void;
  getLighter: (lighter: Lighter) => void;
  code: string;
};

export const LighterContext = React.createContext<LighterContextType>({
  lighter: null,
  setLighter: () => {},
  logged: false,
  setLogged: () => {},
  setCode: () => {},
  getLighter: () => {},
  code: "",
});

export const LighterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lighter, setLighter] = React.useState<Lighter>({
    nickname: "",
    log: [],
    distanceTraveled: 0,
    objective: "",
    id: "",
  });

  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const isLogged = localStorage.getItem("logged");
    const lighter = sessionStorage.getItem("lighter");
    if (isLogged === "true") {
      setLogged(true);
    }
    if (lighter) {
      setLighter(JSON.parse(lighter));
    }
  }, []);

  useEffect(() => {
    console.log("code changed", code);
    if (code) {
      getLighter().then(() => {
        if (lighter) {
          navigate(`/lighter`);
        }
      });
    }
  }, [code]);

  const getLighter = async () => {
    // try {
    const l = await getOneLighter(lighter?.id || code.toUpperCase());
    if (l) {
      setLighterSession(l);
    }
    // } catch (e) {
    //   navigate(`/`);
    // }
  };

  const setLoggedLocal = () => {
    localStorage.setItem("logged", "true");
    setLogged(true);
  };

  const setLighterSession = (lighter: Lighter) => {
    sessionStorage.setItem("lighter", JSON.stringify(lighter));
    setLighter(lighter);
  };

  return (
    <LighterContext.Provider
      value={{
        lighter,
        setLighter: setLighterSession,
        logged,
        setLogged: setLoggedLocal,
        getLighter,
        setCode,
        code,
      }}
    >
      {children}
    </LighterContext.Provider>
  );
};
