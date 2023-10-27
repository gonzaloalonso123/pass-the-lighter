import React, { useContext, useEffect } from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Stats } from "../components/Stats";
import { getOneLighter, resetTestLighter } from "../client/client";
import { LatestStory } from "../components/LatestStory";
import { LighterContext } from "../context/LighterContext";

export const Home = () => {
  // const { setLighter } = useContext(LighterContext);
  // useEffect(() => {
  //   const get = async () => {
  //     const l = await getOneLighter("1AKV5");
  //     setLighter(l!);
  //   };
  //   get();
  // }, []);
  return (
    <>
      <Hero />
      <Stats />
      {/* <button className="std-btn" onClick={resetTestLighter}>reset test lighter</button> */}
      {/* <div className="w-full max-w-4xl py-10 mx-auto">
        <LatestStory />
      </div> */}
    </>
  );
};
