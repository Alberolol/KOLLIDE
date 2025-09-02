"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function K3DImpactText() {
  const text = "Revolutionary 3D-printed protection technology. We transform how products protect with advanced energy-absorbing structures, exceptional impact absorption, and unparalleled customization for sports equipment and beyond.";
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Split text into individual characters while preserving spaces
  const characters = text.split('');
  
  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
          style={{
            fontWeight: 700,
            letterSpacing: '-0.02em'
          }}
        >
          {characters.map((char, index) => {
            // Calculate when this character should start appearing
            const start = index / characters.length;
            const end = (index + 1) / characters.length;
            
            return (
              <motion.span
                key={index}
                className="text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: start * 2, // Stagger the animation
                  duration: (end - start) * 2
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}

