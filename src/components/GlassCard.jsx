import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

const GlassCard = ({ children, className = "" }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX);
    y.set(mouseY);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateX.set(((mouseY - centerY) / centerY) * -10); // Subtle tilt
    rotateY.set(((mouseX - centerX) / centerX) * 10);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform",   // add this line
      }}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl group ${className}`}
    >
      {/* Moving Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${x}px ${y}px,
              rgba(132, 0, 255, 0.2),
              transparent 80%
            )
          `,
        }}
      />

      {/* Internal Content with 3D Pop */}
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d"
        }}
        className="relative z-10"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;