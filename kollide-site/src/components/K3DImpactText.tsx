"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function K3DImpactText() {
  const text = "Revolutionary 3D-printed protection technology. We transform how products protect with advanced energy-absorbing structures, exceptional impact absorption, and unparalleled customization for sports equipment and beyond.";
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.1"]
  });
  
  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
          style={{
            fontWeight: 700,
            letterSpacing: '-0.02em',
            opacity: useTransform(scrollYProgress, [0, 1], [0, 1])
          }}
        >
          {text}
        </motion.h2>
      </div>
    </section>
  );
}

