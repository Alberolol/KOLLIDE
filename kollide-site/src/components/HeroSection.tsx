"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ImpactText from "./ImpactText";

// TwoBoxSection component with synchronized background animation
function TwoBoxSection({ teamScrollProgress }: { teamScrollProgress: any }) {
  // Use the team section's scroll progress for background animation
  const backgroundColor = useTransform(
    teamScrollProgress,
    [0, 1],
    ["rgb(0, 0, 0)", "rgb(255, 255, 255)"]
  );

  return (
    <motion.div 
      style={{ backgroundColor }}
      className="relative z-10 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4" style={{ height: '80vh' }}>
          {/* Left Box - K3D */}
          <motion.div
            className="flex-1 bg-transparent flex items-center justify-center relative overflow-hidden group cursor-pointer"
            style={{ borderRadius: '2rem' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Video playing by default */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover blur-none md:blur-sm md:group-hover:blur-none transition-all duration-300"
              ref={(video) => {
                if (video) {
                  video.playbackRate = 0.67; // 33% slower
                }
              }}
            >
              <source src="/media/videos/k3d_preview.mp4" type="video/mp4" />
            </video>

            {/* White overlay (50% by default, 0% on hover, transparent on mobile) */}
            <div className="absolute inset-0 bg-transparent md:bg-white/50 md:group-hover:bg-transparent transition-colors duration-300" />
            
            {/* K3D Logo (always visible, disappears on hover on desktop) */}
            <Image
              src="/media/logos/k3d_logo_black.png"
              alt="K3D Logo"
              width={200}
              height={100}
              className="relative z-10 opacity-100 transition-opacity duration-300 md:group-hover:opacity-0"
            />

            {/* Text and button (visible on mobile, appear on hover on desktop) */}
            <div className="absolute bottom-8 left-8 right-8 z-20 opacity-100 translate-y-0 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300">
              <h3 className="text-white text-xl md:text-2xl font-semibold mb-4">
                Transforming how products protect.
              </h3>
              <Link href="/k3d">
                <button className="border-2 border-white text-white px-6 py-3 rounded-full hover:bg-white/10 transition-colors duration-200">
                  Learn more
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right Box - MTL3D */}
          <motion.div
            className="flex-1 bg-transparent flex items-center justify-center relative overflow-hidden group cursor-pointer"
            style={{ borderRadius: '2rem' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Video playing by default */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover blur-none md:blur-sm md:group-hover:blur-none transition-all duration-300"
              ref={(video) => {
                if (video) {
                  video.playbackRate = 0.67; // 33% slower
                }
              }}
            >
              <source src="/media/videos/3D print2.mp4" type="video/mp4" />
            </video>

            {/* White overlay (50% by default, 0% on hover, transparent on mobile) */}
            <div className="absolute inset-0 bg-transparent md:bg-white/50 md:group-hover:bg-transparent transition-colors duration-300" />
            
            {/* MTL3D Text (always visible, disappears on hover on desktop) */}
            <div className="relative z-10 text-black text-4xl md:text-5xl font-bold opacity-100 transition-opacity duration-300 md:group-hover:opacity-0">
              MTL3D
            </div>

            {/* Text and button (visible on mobile, appear on hover on desktop) */}
            <div className="absolute bottom-8 left-8 right-8 z-20 opacity-100 translate-y-0 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300">
              <h3 className="text-white text-xl md:text-2xl font-semibold mb-4">
                On-demand 3D printing at scale.
              </h3>
              <Link href="/mtl3d">
                <button className="border-2 border-white text-white px-6 py-3 rounded-full hover:bg-white/10 transition-colors duration-200">
                  Learn more
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// TeamSection component with scroll-triggered background and letter-by-letter title animation
const TeamSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  const titleText = "Meet Our Team";
  
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLDivElement>,
    offset: ["start 0.9", "start 0.3"]
  });

  // Animate background from black to white
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgb(0, 0, 0)", "rgb(255, 255, 255)"]
  );

  // Split text into individual characters
  const characters = titleText.split('');

  return (
    <motion.div 
      ref={ref}
      style={{ backgroundColor }}
      className="relative z-10 py-20 min-h-screen flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Team Title with letter-by-letter animation */}
        <div className="text-center mb-16">
          <h2 
            className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6"
            style={{
              fontWeight: 700,
              letterSpacing: '-0.02em'
            }}
          >
            {characters.map((char, index) => {
              // Calculate when this character should start appearing
              const start = index / characters.length;
              const end = (index + 1) / characters.length;
              
              const opacity = useTransform(
                scrollYProgress,
                [start, end],
                [0, 1]
              );

              return (
                <motion.span
                  key={index}
                  style={{ opacity }}
                  className="text-black"
                >
                  {char}
                </motion.span>
              );
            })}
          </h2>
          
          <motion.p 
            style={{
              opacity: useTransform(scrollYProgress, [0.6, 1], [0, 1])
            }}
            className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-600"
          >
            Our diverse team of innovators, designers, and engineers work together to push the boundaries of 3D technology and additive manufacturing, bringing cutting-edge solutions to life.
          </motion.p>
        </div>

        {/* Team Photos */}
        <motion.div 
          style={{
            opacity: useTransform(scrollYProgress, [0.7, 1], [0, 1])
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {[
            { name: "Eric Gaudreau", title: "CEO & Co-founder", image: "Eric Gaudreau - CEO et Co-fondateur.jpg" },
            { name: "Gabriel Boutin", title: "Advanced Concept Designer & Co-founder", image: "Gabriel Boutin - Advanced Concept designer et Co-fondateur.jpg" },
            { name: "Cyrille Cambien", title: "Operations Manager", image: "Cyrille Cambien Responsable des opérations.jpg" },
            { name: "Romain Auméras", title: "R&D Coordinator", image: "Romain Auméras - R&D Coordinator.jpg" },
            { name: "Tristan Garbies", title: "Senior Designer", image: "Tristan Garbies - Senior designer.jpg" }
          ].map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-square">
                                  <Image
                    src={`/media/images/${member.image}`}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
              </div>
              <h3 className="font-semibold text-black text-lg mb-1">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
});

TeamSection.displayName = 'TeamSection';

// ContactSection component with video background and contact form
function ContactSection() {
  return (
    <div className="relative z-10 bg-white p-4 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden flex items-center bg-black"
          style={{ borderRadius: '2rem', height: '80vh' }}
        >
          {/* Video Background with reduced opacity */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ opacity: 0.15 }}
          >
            <source src="/media/videos/type.mp4" type="video/mp4" />
          </video>
          
          {/* Content */}
          <div className="relative z-20 w-full flex flex-col items-center p-8 md:p-16">
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-16"
              style={{
                fontWeight: 700,
                letterSpacing: '-0.02em'
              }}
            >
              Get In Touch
            </motion.h2>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="w-full max-w-2xl space-y-8"
            >
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={6}
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center mt-12">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 text-lg"
                >
                  Send Message
                </motion.button>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const teamSectionRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Team section scroll progress for shared background animation
  const { scrollYProgress: teamScrollProgress } = useScroll({
    target: teamSectionRef,
    offset: ["start 0.9", "start 0.3"]
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
      video.addEventListener('loadeddata', () => setIsVideoLoaded(true));
      video.play().catch(console.error);
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
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
            <source src="/media/videos/waves.mp4" type="video/mp4" />
          </video>
          
          {/* Black overlay (50% opacity) */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        {/* Logo in center */}
        <motion.div
          style={{ opacity: logoOpacity }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Image
              src="/media/logos/Kollide-logo_white.png"
              alt="Kollide Logo"
              width={400}
              height={200}
              className="max-w-[300px] md:max-w-[400px] h-auto"
              priority
            />
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
      <ImpactText />

      {/* Two Box Section */}
      <TwoBoxSection teamScrollProgress={teamScrollProgress} />

      {/* Team Section */}
      <TeamSection ref={teamSectionRef} />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
