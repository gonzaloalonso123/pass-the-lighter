import { useContext, useEffect, useState } from "react";
import Lighter from "../assets/images/lighter.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LighterContext } from "../context/LighterContext";
import { getOneLighter } from "../client/client";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { light } from "@mui/material/styles/createPalette";

export const Hero = () => {
  const [currentCode, setCurrentCode] = useState<string>("");
  const { setLighter } = useContext(LighterContext);
  const navigate = useNavigate();
  const [notFoundError, setNotFoundError] = useState(false);

  const goToLighter = async () => {
    const lighter = await getOneLighter(currentCode.toUpperCase());
    if (lighter) {
      setLighter(lighter);
      navigate(`/lighter`);
    } else {
      setNotFoundError(true);
    }
  };

  return (
    <motion.div
      className="flex w-full flex-col gap-4 items-center justify-center md:mt-12 relative py-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <img
        src={Lighter}
        className="w-64 hidden md:block absolute -bottom-24 left-12"
      />
      <img
        src={Lighter}
        className="absolute -top-20 right-12 -z-10 w-64 hidden md:block"
        style={{
          transform: "rotate(-75deg)",
        }}
      />
      <img src={Lighter} className="w-1/2 mx-auto md:hidden" />
      <div className="w-full px-4 text-center">
        <h1 className="text-2xl md:text-5xl text-center">
          pass the lighter, pass the story
        </h1>
        <h1 className="text-center mt-4">
          Got one of our lighters? Log your code here and continue the story
        </h1>
      </div>
      <input
        onChange={(e) => setCurrentCode(e.target.value)}
        type="text"
        className="w-72 h-10 border-4 rounded-xl border-black text-black"
        style={{
          color: "black",
        }}
      />
      <h1 className="std-btn" onClick={goToLighter}>
        Show lighter log
      </h1>
      <h1 className="text-center text-black h-6">
        {notFoundError ? "Lighter not found" : ""}
      </h1>
    </motion.div>
  );
};
