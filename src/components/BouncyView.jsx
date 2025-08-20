"use client";
import { motion } from "framer-motion";

const BouncyText = ({ text = "Bouncy Animation" }) => {
  return (
    <h2 className="text-4xl md:text-6xl font-bold text-center leading-none">
  {text.split("").map((char, i) => (
    <motion.span
      key={i}
      style={{ display: "inline-block" }}
      initial={{ y: 0 }}
      animate={{ y: [0, -15, 0] }} // increase bounce
      transition={{
        delay: i * 0.05,
        duration: 0.6,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: "easeInOut",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ))}
</h2>
  );
};

// export default BouncyText
export default BouncyText;
