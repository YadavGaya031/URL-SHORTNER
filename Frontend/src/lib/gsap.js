// src/lib/gsap.js
import { gsap as core } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once
core.registerPlugin(ScrollTrigger);

export const gsap = core;
export { ScrollTrigger };

export const isReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;