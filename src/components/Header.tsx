import React from "react";
import Logo from "../assets/images/logo.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="w-full justify-between flex py-4 px-6 items-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} className="w-14 h-12" />
        <h1 className="text-2xl bolder">pass the lightr</h1>
      </div>
      <h1
        className="text-2xl cursor-pointer hover:-translate-y-1 text-gray-100 transition-all duration-100"
        onClick={() => navigate("/about")}
      >
        About
      </h1>
    </motion.div>
  );
};
