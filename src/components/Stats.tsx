import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getMetadata } from "../client/client";

export const Stats = () => {
  const [metadata, setMetadata] = useState<{
    totalPassed: number;
    totalLighters: number;
    totalKm: number;
  } | null>({
    totalPassed: 0,
    totalLighters: 0,
    totalKm: 0,
  });
  useEffect(() => {
    const getData = async () => {
      getMetadata()
        .then((metadata) => {
          setMetadata(metadata);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

  return (
    <motion.div
      className="bg-white bg-opacity-100 flex justify-around flex-col md:flex-row gap-12 py-6"
      style={{
        minHeight: "350px",
      }}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-black text-5xl font-black">
          {metadata?.totalPassed}
        </h1>
        <h1 className="text-black text-xl font-bolder">Lighters passed</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-black text-5xl font-black">
          {metadata?.totalLighters}
        </h1>
        <h1 className="text-black text-xl font-bolder">
          Lighters in circulation
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-black text-5xl font-black">
          {(metadata?.totalKm + "").split(".")[0]}
        </h1>
        <h1 className="text-black text-xl font-bolder">KMS travelled</h1>
      </div>
    </motion.div>
  );
};
