"use client";

import { motion } from "framer-motion";

const ECGLine = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 60"
      fill="none"
      className="w-full max-w-[400px] h-8 text-black"
    >
      <motion.path
        d="
          M0 30 
          H20 
          L30 10 
          L40 50 
          L50 30 
          H70 
          L80 15 
          L90 45 
          L100 30 
          H120 
          L130 5 
          L140 55 
          L150 30 
          H170 
          L180 10 
          L190 50 
          L200 30 
          H220 
          L230 15 
          L240 45 
          L250 30 
          H270 
          L280 5 
          L290 55 
          L300 30 
          H320
        "
        stroke="currentColor"
        strokeWidth="2"
        fill="transparent"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
};

export default ECGLine;
