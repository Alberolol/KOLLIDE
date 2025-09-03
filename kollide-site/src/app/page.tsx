"use client";

import HeroSection from "@/components/HeroSection";
import StickyNav from "@/components/StickyNav";
import { useNavigation } from "@/components/NavigationProvider";

export default function Home() {
  const { isHamburgerMenuOpen, setIsHamburgerMenuOpen } = useNavigation();
  
  const handleMenuClose = () => {
    setIsHamburgerMenuOpen(false);
  };
  
  return (
    <>
      <StickyNav isHamburgerMenuOpen={isHamburgerMenuOpen} onMenuClose={handleMenuClose} />
      <HeroSection />
    </>
  );
}
