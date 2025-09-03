"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface HamburgerMenuProps {
  onMenuToggle: (isOpen: boolean) => void;
}

export default function HamburgerMenu({ onMenuToggle }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onMenuToggle(newState);
  };

  // Reset menu state when route changes
  useEffect(() => {
    setIsOpen(false);
    onMenuToggle(false);
  }, [pathname, onMenuToggle]);

  // Hide hamburger button when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.3; // Same threshold as StickyNav
      setIsVisible(scrollY <= threshold);
      
      // If user scrolls and menu was open, close it
      if (scrollY > threshold && isOpen) {
        setIsOpen(false);
        onMenuToggle(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen, onMenuToggle]);

  if (!isVisible) return null;

  return (
    <motion.button
      onClick={toggleMenu}
      className="fixed top-3 right-6 z-[60] p-2 bg-black/20 backdrop-blur-md rounded-full border border-white/10 hover:bg-black/40 transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-6 h-6 flex flex-col justify-center items-center">
        {/* Top line */}
        <motion.span
          className="block w-6 h-0.5 bg-white mb-1.5"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 8 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        {/* Middle line */}
        <motion.span
          className="block w-6 h-0.5 bg-white mb-1.5"
          animate={{
            opacity: isOpen ? 0 : 1,
            x: isOpen ? -20 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        {/* Bottom line */}
        <motion.span
          className="block w-6 h-0.5 bg-white"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -8 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>
    </motion.button>
  );
}
