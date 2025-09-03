"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface StickyNavProps {
  isHamburgerMenuOpen?: boolean;
  onMenuClose?: () => void;
}

export default function StickyNav({ isHamburgerMenuOpen = false, onMenuClose }: StickyNavProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.3; // Show nav after scrolling 30% of viewport height
      setIsVisible(scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If hamburger menu is open, always show the nav (sticky mode)
  const shouldShowNav = isHamburgerMenuOpen || isVisible;

  return (
    <AnimatePresence>
      {shouldShowNav && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/media/logos/Kollide-logo_white.png"
                  alt="Kollide Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <Link
                  href="/k3d"
                  className="text-white/80 hover:text-white transition-colors duration-200"
                  onClick={onMenuClose}
                >
                  K3D
                </Link>
                <Link
                  href="/mtl3d"
                  className="text-white/80 hover:text-white transition-colors duration-200"
                  onClick={onMenuClose}
                >
                  MTL3D
                </Link>
                <Link
                  href="/about"
                  className="text-white/80 hover:text-white transition-colors duration-200"
                  onClick={onMenuClose}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-white/80 hover:text-white transition-colors duration-200"
                  onClick={onMenuClose}
                >
                  Contact
                </Link>
              </div>

              {/* Mobile menu - handled by HamburgerMenu component */}
              <div className="md:hidden">
                {/* Space reserved for hamburger menu positioning */}
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}




