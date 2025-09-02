"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import K3DImpactText from "@/components/K3DImpactText";
import StickyNav from "@/components/StickyNav";

// Scroll-controlled video component
function ScrollControlledVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const videoTime = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const unsubscribe = videoTime.on('change', (progress) => {
      // Wait for video metadata to load
      if (video.readyState >= 1 && video.duration) {
        const targetTime = progress * video.duration;
        video.currentTime = targetTime;
        console.log('Video time updated:', targetTime, 'Progress:', progress);
      }
    });

    // Force video to load metadata
    video.addEventListener('loadedmetadata', () => {
      console.log('Video metadata loaded, duration:', video.duration);
    });

    return unsubscribe;
  }, [videoTime]);

  return (
    <motion.section 
      ref={containerRef} 
      className="relative z-10 w-full overflow-hidden" 
      style={{ height: '67vh' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={() => console.log('Metadata loaded via onLoadedMetadata')}
        style={{ filter: 'brightness(0.5)' }}
      >
        <source src="/media/videos/k3d_shine.mp4" type="video/mp4" />
      </video>
    </motion.section>
  );
}

export default function K3DPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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
      video.addEventListener('loadeddata', () => setIsVideoLoaded(true));
      video.play().catch(console.error);
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Sticky Navigation */}
      <StickyNav />
      
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
            <source src="/media/videos/K3DHero.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* K3D Logo in center */}
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
              src="/media/logos/k3d_logo_white.png"
              alt="K3D Logo"
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
      <K3DImpactText />

      {/* Helmet Image Section */}
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
              src="/media/images/helmet.jpeg"
              alt="K3D Helmet Technology"
              fill
              className="object-cover"
            />
            {/* Subtle gradient overlay */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.7) 15%, rgba(0, 0, 0, 0) 30%)'
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
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
              How It Works
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Our revolutionary 3D-printed lattice structures create nonlinear viscoelastic damping, 
              precisely engineering structural deformation for optimal impact absorption while 
              maximizing airflow through high surface-to-volume ratios.
            </p>
          </motion.div>

          {/* Images Grid with Text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - 2x2 Image Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { src: "/media/images/3dprint1.jpg", alt: "3D Printed Lattice Structure 1" },
                { src: "/media/images/3dprint2.jpg", alt: "3D Printed Lattice Structure 2" },
                { src: "/media/images/3dprint3.jpg", alt: "3D Printed Lattice Structure 3" },
                { src: "/media/images/3dprint4.jpg", alt: "3D Printed Lattice Structure 4" }
              ].map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="aspect-square rounded-2xl overflow-hidden bg-gray-900 group cursor-pointer"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>

            {/* Right Side - Explanatory Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Advanced Energy Absorption
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Our dynamic mechanics create superior impact dissipation through precisely 
                  engineered lattice structures that deform optimally under force.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Breathable Design
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  High surface-to-volume ratios ensure maximum airflow and superior thermal 
                  regulation during intense activity.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Customizable Integration
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  3D printing enables rapid innovation and seamless integration into protective 
                  equipment, enhancing safety, comfort, and performance.
                </p>
              </div>


            </motion.div>
          </div>
        </div>
      </section>

      {/* Scroll-Controlled Video Section */}
      <ScrollControlledVideo />

      {/* Learn More Section */}
      <section className="relative z-10 bg-black pt-40 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 mt-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Want to learn more?
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Discover the full range of K3D's revolutionary helmet technology and see how we're transforming protection across sports.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="pt-8"
            >
              <motion.a
                href="https://www.k3dtechnology.com/en"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center space-x-3 bg-white text-black px-8 py-4 text-xl font-semibold hover:bg-gray-100 transition-all duration-300 group"
                style={{ borderRadius: '999px' }}
              >
                <span>Visit K3D Technology</span>
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}