"use client";

import { useCallback } from "react";
import { NavigationProvider, useNavigation } from "@/components/NavigationProvider";
import HamburgerMenu from "@/components/HamburgerMenu";
import { LenisProvider } from "@/components/LenisProvider";
import Link from "next/link";

function NavigationContent({ children }: { children: React.ReactNode }) {
  const { setIsHamburgerMenuOpen } = useNavigation();

  const handleMenuToggle = useCallback((isOpen: boolean) => {
    setIsHamburgerMenuOpen(isOpen);
  }, [setIsHamburgerMenuOpen]);

  const handleMenuClose = useCallback(() => {
    setIsHamburgerMenuOpen(false);
  }, [setIsHamburgerMenuOpen]);

  return (
    <>
      <HamburgerMenu onMenuToggle={handleMenuToggle} />
      {children}
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <LenisProvider>
        <NavigationContent>
          {children}
          <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-white/60">
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <p>© {new Date().getFullYear()} KOLLIDE</p>
              <div className="flex gap-4">
                <Link href="/k3d" className="hover:text-white">K3D</Link>
                <Link href="/mtl3d" className="hover:text-white">MTL3D</Link>
              </div>
            </div>
          </footer>
        </NavigationContent>
      </LenisProvider>
    </NavigationProvider>
  );
}
