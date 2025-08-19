"use client";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  direction?: "vertical" | "horizontal";
  gestureDirection?: "vertical" | "horizontal" | "both";
  smooth?: boolean;
  mouseMultiplier?: number;
  smoothTouch?: boolean;
  touchMultiplier?: number;
  infinite?: boolean;
}

// Extend Window type safely
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export const useLenis = (options?: LenisOptions) => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(1);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth ease-out
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false, // Disable on mobile for better performance
      touchMultiplier: 2,
      infinite: false,
      ...options,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
      window.lenis = undefined;
    };
  }, [options]);

  return lenisRef; // gives access to the instance
};
