"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import StickyNav from "@/components/StickyNav";
import { useNavigation } from "@/components/NavigationProvider";

// MTL3DImpactText component
function MTL3DImpactText() {
  const text = "We provide on‑demand 3D printing services in Montreal. From rapid prototyping to short‑run production, we deliver precision parts using advanced technologies like FDM, SLA, SLS, and MJF across a wide range of materials.";
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

export default function MTL3DPage() {
  const { isHamburgerMenuOpen, setIsHamburgerMenuOpen } = useNavigation();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform values based on scroll
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["2rem", "0rem"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [0.5, 0]);
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(console.error);
    }
  }, []);

  const handleMenuClose = () => {
    setIsHamburgerMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Sticky Navigation */}
      <StickyNav isHamburgerMenuOpen={isHamburgerMenuOpen} onMenuClose={handleMenuClose} />
      
      {/* Hero Container */}
      <motion.div
        ref={containerRef}
        style={{
          borderRadius,
          scale,
        }}
        className="relative h-screen mx-4 overflow-hidden bg-black"
      >
        {/* Video Background */}
        <motion.div
          style={{ opacity: videoOpacity }}
          className="absolute inset-0"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/media/videos/3D print2.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* MTL3D Text in center */}
        <motion.div
          style={{ opacity: logoOpacity }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4">
              MTL3D
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl">
              On‑Demand 3D Printing in Montreal
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator arrows */}
        <motion.div
          style={{ opacity: arrowOpacity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center space-y-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-white/70"
            />
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[16px] border-l-transparent border-r-transparent border-t-white/50"
            />
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-white/30"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Impact Text Section */}
      <MTL3DImpactText />

      {/* 3D Print Farm Image Section */}
      <section className="relative z-10 bg-black py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative w-full aspect-video rounded-2xl overflow-hidden"
          >
            <Image
              src="/media/images/3dprintfarm.png"
              alt="3D Print Farm"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 bg-black py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our Services
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Professional 3D printing services with cutting-edge technology, premium materials, 
              and rapid turnaround times for all your prototyping and production needs.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Technologies",
                description: "FDM, SLA, SLS, MJF, and more advanced 3D printing technologies for diverse applications.",
                features: ["FDM Printing", "SLA Resin", "SLS Powder", "MJF Technology"]
              },
              {
                title: "Materials",
                description: "Wide range of materials from standard plastics to specialized engineering polymers.",
                features: ["PLA & ABS", "PA12 Nylon", "Resins", "Elastomers"]
              },
              {
                title: "Turnaround",
                description: "Fast quotes and short lead times to keep your projects moving forward.",
                features: ["Rapid Quotes", "Quick Delivery", "Rush Orders", "Quality Assurance"]
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-400">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 bg-black py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Ready to get started?
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Upload your files, select materials, and get fast, precise 3D printed parts delivered to your door.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="pt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center space-x-3 bg-white text-black px-8 py-4 text-xl font-semibold hover:bg-gray-100 transition-all duration-300 group"
                style={{ borderRadius: '999px' }}
              >
                <span>Get a Quote</span>
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


