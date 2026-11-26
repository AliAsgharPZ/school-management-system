"use client";

import { motion, useReducedMotion, useScroll, useSpring, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

/** Thin scroll-linked progress indicator; uses the existing Bahar brand token. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="bahar-scroll-progress"
      style={{ scaleX, transformOrigin: "right center" }}
    />
  );
}

/** Scrolltide-inspired reveal, intentionally restrained for an operational UI. */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once, amount: 0.12, margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22, filter: "blur(5px)" }}
      animate={reduce || visible ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
