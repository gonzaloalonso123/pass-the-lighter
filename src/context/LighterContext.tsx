import React, { useEffect, useState } from "react";
import { Lighter } from "../types/types";
import { getOneLighter } from "../client/client";

type LighterContextType = {
  lighter: Lighter | null;
  setLighter: (lighter: Lighter) => void;
  logged: boolean;
  setLogged: () => void;
  update: () => void;
};

export const LighterContext = React.createContext<LighterContextType>({
  lighter: null,
  setLighter: () => {},
  logged: false,
  setLogged: () => {},
  update: () => {},
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

  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const isLogged = localStorage.getItem("logged");
    const l = sessionStorage.getItem("lighter");
    if (isLogged === lighter.id) {
      setLogged(true);
    }
    if (l) {
      setLighter(JSON.parse(l));
    }
  }, []);

  const setLoggedLocal = () => {
    localStorage.setItem("logged", lighter.id);
    setLogged(true);
  };

  const setLighterSession = (lighter: Lighter) => {
    sessionStorage.setItem("lighter", JSON.stringify(lighter));
    setLighter(lighter);
  };

  const update = async () => {
    const l = await getOneLighter(lighter.id);
    setLighterSession(l!);
  };

  return (
    <LighterContext.Provider
      value={{
        lighter,
        setLighter: setLighterSession,
        logged,
        setLogged: setLoggedLocal,
        update,
      }}
    >
      {children}
    </LighterContext.Provider>
  );
};
