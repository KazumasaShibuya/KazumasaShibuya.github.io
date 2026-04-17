import React from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile"; // Import your hook
import { 
  SiReact, SiNodedotjs, SiTailwindcss, SiTypescript, SiFramer, 
  SiPython, SiDotnet, SiSqlalchemy, SiFastapi
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { TbBrandCSharp } from "react-icons/tb";

const TechOrbit = () => {
  const isMobile = useIsMobile();
  
  const icons = [
    { Icon: SiReact, color: "#61DAFB" },
    { Icon: SiTypescript, color: "#3178C6" },
    { Icon: DiJava, color: "#ED8B00" },
    { Icon: TbBrandCSharp, color: "#239120" },
    { Icon: SiDotnet, color: "#512BD4" },
    { Icon: SiNodedotjs, color: "#339933" },
    { Icon: SiPython, color: "#3776AB" },
    { Icon: SiSqlalchemy, color: "#D71F23" },
    { Icon: SiFastapi, color: "#05998B" },
    { Icon: SiTailwindcss, color: "#06B6D4" },
    { Icon: SiFramer, color: "#0055FF" },
  ];

  const SPEED = 40;

  // Responsive values
  const innerRadius = isMobile ? 85 : 110;
  const outerRadius = isMobile ? 135 : 200;
  const iconSize = isMobile ? 35 : 44;
  const containerMinHeight = isMobile ? "300px" : "550px";

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center overflow-visible"
      style={{ minHeight: containerMinHeight }}
    >
      
      {/* Central Core (Smaller on Mobile) */}
      <div className={`relative z-10 ${isMobile ? 'w-6 h-6' : 'w-12 h-12'} rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md`}>
        <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      </div>

      {/* Orbiting Icons */}
      {icons.map((item, index) => {
        const ringIndex = index % 2;
        const radius = ringIndex === 0 ? innerRadius : outerRadius;
        
        const iconsInRing = ringIndex === 0 ? Math.ceil(icons.length / 2) : Math.floor(icons.length / 2);
        const startAngle = (360 / iconsInRing) * Math.floor(index / 2);

        return (
          <motion.div
            key={index}
            className="absolute"
            initial={{ rotate: startAngle }}
            animate={{ rotate: startAngle + 360 }}
            transition={{
              duration: SPEED,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
            }}
          >
            <motion.div
              initial={{ rotate: -startAngle }}
              animate={{ rotate: -(startAngle + 360) }}
              transition={{
                duration: SPEED,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <item.Icon 
                size={iconSize}
                style={{ color: item.color }} 
        
              />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Background Rings (Dynamic Sizes) */}
      {[innerRadius * 2, outerRadius * 2].map((size, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-white/5 pointer-events-none"
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
};

export default TechOrbit;