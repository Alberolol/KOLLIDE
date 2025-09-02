"use client";

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";

export default function K3DImpactText() {
  const text = "Revolutionary 3D-printed protection technology. We transform how products protect with advanced energy-absorbing structures, exceptional impact absorption, and unparalleled customization for sports equipment and beyond.";
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.1"]
  });

  // Split text into individual characters while preserving spaces
  const characters = text.split('');
  
  // Create motion values for each character
  const characterOpacities = characters.map(() => useMotionValue(0));
  
  // Update character opacities based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      characters.forEach((_, index) => {
        const start = index / characters.length;
        const end = (index + 1) / characters.length;
        
        let opacity = 0;
        if (progress >= start && progress <= end) {
          opacity = (progress - start) / (end - start);
        } else if (progress > end) {
          opacity = 1;
        }
        
        characterOpacities[index].set(opacity);
      });
    });
    
    return unsubscribe;
  }, [scrollYProgress, characters, characterOpacities]);
  
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
            return (
              <motion.span
                key={index}
                style={{ opacity: characterOpacities[index] }}
                className="text-white"
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
