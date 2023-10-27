import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Stats } from "../components/Stats";
import { resetTestLighter } from "../client/client";

export const Home = () => {

  return (
    <>
      <Hero />
      <Stats />
      {/* <button className="std-btn" onClick={resetTestLighter}>reset test lighter</button> */}
    </>
  );
};
