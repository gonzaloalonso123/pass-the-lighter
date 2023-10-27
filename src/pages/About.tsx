import React from "react";
import QA from "../assets/content/faq.json";
import Lighter from "../assets/images/lighter.png";
import { motion } from "framer-motion";

type qa = {
  q: string;
  a: string;
};

export const About = () => {
  return (
    <motion.div
      className="flex flex-col items-center text-center w-screen justify-center mx-auto py-12 px-4 gap-4 relative"
      style={{
        maxWidth: "800px",
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <h1 className="text-3xl">About</h1>
      {QA.map((qa: qa, index) => (
        <div className="z-10" key={index}>
          <h1 className="font-bold text-xl text-center">{qa.q}</h1>
          <p className="text-center">{qa.a}</p>
        </div>
      ))}
    </motion.div>
  );
};
