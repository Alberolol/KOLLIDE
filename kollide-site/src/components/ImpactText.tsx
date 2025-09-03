"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ImpactText() {
  const text = "We create advanced 3D designs and additive manufacturing. We bring innovations like award‑winning football helmet technology with K3D, and on‑demand 3D printing in Montreal with MTL3D.";
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.1"]
  });

  // Split text into individual characters while preserving spaces
  const characters = text.split('');
  
  // Use a single scroll progress value
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  return (
    <section ref={containerRef} className="min-h-[60vh] md:min-h-screen flex items-center justify-center bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight whitespace-pre-wrap"
          style={{
            fontWeight: 700,
            letterSpacing: '-0.02em',
            '--scroll-progress': progress
          } as React.CSSProperties & { '--scroll-progress': import('framer-motion').MotionValue<number> }}
        >
          {characters.map((char, index) => {
            const start = index / characters.length;
            const end = (index + 1) / characters.length;
            
            return (
              <span
                key={index}
                className="text-white"
                style={{
                  opacity: `clamp(0, calc((var(--scroll-progress) - ${start}) / ${end - start}), 1)`
                }}
              >
                {char}
              </span>
            );
          })}
        </motion.h2>
      </div>
    </section>
  );
}



