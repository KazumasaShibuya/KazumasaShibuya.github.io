import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './components/GlassCard';
import TechOrbit from './components/TechOrbit';
import TokyoTime from './components/TokyoTime';
import { FaLinkedinIn } from 'react-icons/fa';
import { useIsMobile } from './hooks/useIsMobile';
import { useLanguage } from './context/LanguageContext';
import { data as enData } from './data/en';
import { data as jaData } from './data/ja';
import LanguageToggle from './components/LanguageToggle';

// 1. Define Animation Variants for the staggered load
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each card
      delayChildren: 0.3,    // Wait before starting
    },
  },
};

const itemVariants = {
  hidden: { y: 2000, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 50, damping: 15 },
  },
};

const headerVariants = {
  hidden: { x: -1500, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 30, damping: 10 },
  },
};

function App() {
  const { language } = useLanguage();
  const data = language === 'en' ? enData : jaData;
  const isMobile = useIsMobile();
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 relative font-sans selection:bg-purple-500/30">

      {/* --- BACKGROUND ORBITS --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%]"
        >
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[900px] w-[900px] rounded-full bg-pink-500/8 blur-[120px]" />
          <div className="absolute top-1/3 left-1/3 h-[900px] w-[900px] rounded-full bg-red-600/8 blur-[150px]" />
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[100%] -right-[100%] w-[300%] h-[300%]"
        >
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 h-[900px] w-[900px] rounded-full bg-blue-600/8 blur-[150px]" />
          <div className="absolute bottom-1/2 left-1/4 h-[900px] w-[900px] rounded-full bg-cyan-500/8 blur-[150px]" />
        </motion.div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl relative z-10 p-8 py-20"
      >
        <motion.header variants={headerVariants} className="mb-16">
          <h1 className="text-6xl font-bold tracking-tighter text-white">
            {data.firstname}{" "}
            <span className="relative inline-block">
              <span
                className="animate-rgb-wave bg-gradient-to-r from-red-500 via-green-500 via-blue-500 via-purple-500 to-red-500 bg-[length:200%_auto] bg-clip-text text-transparent inline-block py-2 px-4 -my-2 -mx-4"
              >
                {data.lastname}
              </span>

              {/* Matching Glow Layer */}
              <span
                className="absolute inset-0 animate-rgb-wave bg-gradient-to-r from-red-500 via-green-500 via-blue-500 via-purple-500 to-red-500 bg-[length:200%_auto] bg-clip-text text-transparent blur-sm opacity-40 select-none py-2 px-4 -my-2 -mx-4"
                aria-hidden="true"
              >
                {data.lastname}
              </span>
            </span>
          </h1>
          <p className="text-xl text-neutral-500 font-mono mt-2">{data.title}</p>
          <LanguageToggle />
          <p className="text-xl text-neutral-400 max-w-lg leading-relaxed">
  </p>
        </motion.header>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr">

          {/* 1. About Card (2x2 Square) */}
          <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2 aspect-square">
            <GlassCard className="h-full flex flex-col justify-center p-10">
              <h2 className="text-3xl font-bold text-white mb-6 uppercase tracking-tighter">{data.about.heading}<div className="h-1 w-8 bg-blue-500 mt-1" /></h2>

              <p className="text-neutral-400 leading-relaxed text-lg">
                {data.about.body}
              </p>
            </GlassCard>
          </motion.div>

          {/* --- CONDITIONAL LOGIC FOR STACK & TIME --- */}

          {/* On Mobile, Stack comes 3rd. On Desktop, Time comes 3rd. */}
          {isMobile ? (
            <>
              {/* 2. LinkedIn (1x1 Square) */}
              <motion.div variants={itemVariants} className="aspect-square">
                <GlassCard className="h-full flex flex-col items-center justify-center group border-white/5 hover:border-blue-500/50 transition-colors">
                  <a href="https://www.linkedin.com/in/kazumasa-shibuya/" target="_blank" rel="noopener noreferrer" className="h-full block">
                    <FaLinkedinIn size={85} className="text-[#0077B5]" />
                    <span className="mt-4 text-[18px] font-mono uppercase tracking-[0.2em] text-white">{data.linkedin}</span>
                  </a>
                </GlassCard>
              </motion.div>

              {/* 4. Experience (2x1 Rectangle) */}
              <motion.div variants={itemVariants} className="md:col-span-2 h-full">
                <GlassCard className="h-full flex flex-col justify-between p-8">
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase">{data.experience.heading}</h3>
                    <div className="h-1 w-8 bg-blue-500 mt-1" />
                    <div className="flex justify-between items-end mb-2 mt-6">
                      <h3 className="text-[18px] font-mono text-neutral-500 uppercase tracking-[0.2em]">{data.experience.items[0].title}</h3>
                      <span className="text-[14px] font-mono text-neutral-500 uppercase tracking-[0.2em]">{data.experience.items[0].status}</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full relative">
                      <div
                        className="h-full w-[50%] animate-rgb-wave rounded-full bg-gradient-to-r from-red-500 via-green-500 via-blue-500 via-purple-500 to-red-500 bg-[length:200%_auto] 
               relative z-10"
                        style={{
                          boxShadow: '0 0 5px rgba(59, 130, 246, 0.5), 0 0 30px rgba(168, 85, 247, 0.3)'
                        }}
                      />

                      

                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex justify-between items-end mb-2">
                      <h3 className="text-[18px] font-mono text-neutral-500 uppercase tracking-[0.2em]">{data.experience.items[1].title}</h3>
                      <span className="text-[14px] font-mono text-neutral-500 uppercase tracking-[0.2em]">{data.experience.items[1].status}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-neutral-600" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* 6. Stack Card (2x2 Square - Pushed Right) */}
              <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2 aspect-square">
                <GlassCard className="h-full flex flex-col overflow-hidden relative">
                  <div className="">
                    <h2 className="text-lg font-bold text-white tracking-tighter uppercase">{data.stack}</h2>
                    <div className="h-1 w-8 bg-blue-500 mt-1" />
                  </div>
                  <div className="flex-grow flex items-center justify-center scale-90 -translate-y-8">
                    <TechOrbit />
                  </div>
                </GlassCard>
              </motion.div>

              {/* 5. Buffer: Languages (2x1 Rectangle) */}
              <motion.div variants={itemVariants} className="md:col-span-2 h-full">
                <GlassCard className="h-full flex flex-col justify-between p-8">
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase">{data.languages.heading}</h3>
                    <div className="h-1 w-8 bg-blue-500 mt-1" />
                    <div className="flex justify-between items-end mb-2 mt-6">
                      <h3 className="text-[18px] font-mono text-neutral-500 uppercase tracking-[0.2em]">{data.languages.items[0].title}</h3>
                      <span className="text-[14px] font-mono text-neutral-500 uppercase tracking-[0.2em]">{data.languages.items[0].fluency}</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full relative"> {/* Removed overflow-hidden */}
                      <div
                        className="h-full w-[100%] animate-rgb-wave rounded-full bg-gradient-to-r from-red-500 via-green-500 via-blue-500 via-purple-500 to-red-500 bg-[length:200%_auto] 
               relative z-10"
                        style={{
                          boxShadow: '0 0 5px rgba(59, 130, 246, 0.5), 0 0 30px rgba(168, 85, 247, 0.3)'
                        }}
                      />

        
                      
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex justify-between items-end mb-2 mt-6">
                      <h3 className="text-[18px] font-mono text-neutral-500 uppercase tracking-[0.2em]">{data.languages.items[1].title}</h3>
                      <span className="text-[14px] font-mono text-neutral-500 uppercase tracking-[0.2em]">{data.languages.items[1].fluency}</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full relative"> {/* Removed overflow-hidden */}
                      <div
                        className="h-full w-[85%] animate-rgb-wave rounded-full bg-gradient-to-r from-red-500 via-green-500 via-blue-500 via-purple-500 to-red-500 bg-[length:200%_auto] 
               relative z-10"
                        style={{
                          boxShadow: '0 0 5px rgba(59, 130, 246, 0.5), 0 0 30px rgba(168, 85, 247, 0.3)'
                        }}
                      />

                     
                      
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* 3. Tokyo Time (1x1 Square) */}
              <motion.div variants={itemVariants} className="aspect-square">
                {/* Add flex and flex-col to GlassCard to enable centering */}
                <GlassCard className="h-full flex flex-col items-center justify-center">
                  <TokyoTime />
                </GlassCard>
              </motion.div>

              {/* 7. Extra Buffer Card to fill space (2x1 Rectangle) */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <GlassCard className="h-full flex items-center p-8">
                  <p className="text-s font-mono text-neutral-600 leading-relaxed uppercase">
                    Focused on building high-performance applications with a focus on type-safety and organic scalability.
                  </p>
                </GlassCard>
              </motion.div>

            </>
          ) : (
            <>
              {/* 2. LinkedIn (1x1 Square) */}
              <motion.div variants={itemVariants} className="aspect-square">
                <a href="https://www.linkedin.com/in/kazumasa-shibuya/" target="_blank" rel="noopener noreferrer" className="h-full block">
                  <GlassCard className="h-full flex flex-col items-center justify-center group border-white/5 hover:border-blue-500/50 transition-colors">
                    <FaLinkedinIn size={85} className=" group-hover:text-[#0077B5] transition-all duration-500 group-hover:scale-110" />
                    <span className="mt-4 text-[18px] font-mono uppercase tracking-[0.2em] text-neutral-600 group-hover:text-white">{data.linkedin}</span>
                  </GlassCard>
                </a>
              </motion.div>

              {/* 3. Tokyo Time (1x1 Square) */}
              <motion.div variants={itemVariants} className="aspect-square">
                {/* Add flex and flex-col to GlassCard to enable centering */}
                <GlassCard className="h-full flex flex-col items-center justify-center">
                  <TokyoTime />
                </GlassCard>
              </motion.div>

              {/* 4. Experience (2x1 Rectangle) */}
              <motion.div variants={itemVariants} className="md:col-span-2 h-full">
                <GlassCard className="h-full flex flex-col justify-between p-8">
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase">{data.experience.heading}</h3>
                    <div className="h-1 w-8 bg-blue-500 mt-1" />
                    <div className="flex justify-between items-end mb-2 mt-6">
                      <h3 className="text-[18px] font-mono text-neutral-500 uppercase tracking-[0.2em]">{data.experience.items[0].title}</h3>
                      <span className="text-[14px] font-mono text-neutral-500 uppercase tracking-[0.2em]">{data.experience.items[0].status}</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full relative"> {/* Removed overflow-hidden */}
                      <div
                        className="h-full w-[50%] animate-rgb-wave rounded-full bg-gradient-to-r from-red-500 via-green-500 via-blue-500 via-purple-500 to-red-500 bg-[length:200%_auto] 
               relative z-10"
                        style={{
                          boxShadow: '0 0 5px rgba(59, 130, 246, 0.5), 0 0 30px rgba(168, 85, 247, 0.3)'
                        }}
                      />

                    

                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex justify-between items-end mb-2">
                      <h3 className="text-[18px] font-mono text-neutral-500 uppercase tracking-[0.2em]">{data.experience.items[1].title}</h3>
                      <span className="text-[14px] font-mono text-neutral-500 uppercase tracking-[0.2em]">{data.experience.items[1].status}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-neutral-600" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* 5. Buffer: Languages (2x1 Rectangle) */}
              <motion.div variants={itemVariants} className="md:col-span-2 h-full">
                <GlassCard className="h-full flex flex-col justify-between p-8">
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase">{data.languages.heading}</h3>
                    <div className="h-1 w-8 bg-blue-500 mt-1" />
                    <div className="flex justify-between items-end mb-2 mt-6">
                      <h3 className="text-[18px] font-mono text-neutral-500 uppercase tracking-[0.2em]">{data.languages.items[0].title}</h3>
                      <span className="text-[14px] font-mono text-neutral-500 uppercase tracking-[0.2em]">{data.languages.items[0].status}</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full relative"> {/* Removed overflow-hidden */}
                      <div
                        className="h-full w-[100%] animate-rgb-wave rounded-full bg-gradient-to-r from-red-500 via-green-500 via-blue-500 via-purple-500 to-red-500 bg-[length:200%_auto] 
               relative z-10"
                        style={{
                          boxShadow: '0 0 5px rgba(59, 130, 246, 0.5), 0 0 30px rgba(168, 85, 247, 0.3)'
                        }}
                      />

                
                      
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex justify-between items-end mb-2 mt-6">
                      <h3 className="text-[18px] font-mono text-neutral-500 uppercase tracking-[0.2em]">{data.languages.items[1].title}</h3>
                      <span className="text-[14px] font-mono text-neutral-500 uppercase tracking-[0.2em]">{data.languages.items[1].status}</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full relative"> {/* Removed overflow-hidden */}
                      <div
                        className="h-full w-[85%] animate-rgb-wave rounded-full bg-gradient-to-r from-red-500 via-green-500 via-blue-500 via-purple-500 to-red-500 bg-[length:200%_auto] 
               relative z-10"
                        style={{
                          boxShadow: '0 0 5px rgba(59, 130, 246, 0.5), 0 0 30px rgba(168, 85, 247, 0.3)'
                        }}
                      />

                    
                      
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* 6. Stack Card (2x2 Square - Pushed Right) */}
              <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2 aspect-square">
                <GlassCard className="h-full flex flex-col overflow-hidden relative">
                  <div className="">
                    <h2 className="text-lg font-bold text-white tracking-tighter uppercase">{data.stack}</h2>
                    <div className="h-1 w-8 bg-blue-500 mt-1" />
                  </div>
                  <div className="flex-grow flex items-center justify-center scale-90 -translate-y-18">
                    <TechOrbit />
                  </div>
                </GlassCard>
              </motion.div>

              {/* 7. Extra Buffer Card to fill space (2x1 Rectangle) */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <GlassCard className="h-full flex items-center p-8">
                  <p className="text-s font-mono text-neutral-600 leading-relaxed uppercase">
                    Focused on building high-performance applications with a focus on type-safety and organic scalability.
                  </p>
                </GlassCard>
              </motion.div>
            </>
          )}



        </div>
      </motion.div>
    </div>
  );
}

export default App;