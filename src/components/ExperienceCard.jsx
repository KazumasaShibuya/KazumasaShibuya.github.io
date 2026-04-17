import React from 'react';

const ExperienceCard = () => {
  return (
    <div className="h-full flex flex-col justify-between py-2">
      {/* Professional */}
      <div>
        <div className="flex justify-between items-end mb-2">
          <h3 className="text-lg font-bold text-white">Software Engineer</h3>
          <span className="text-xs font-mono text-neutral-500">@Nagarro</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-[65%] animate-rgb-wave bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_auto]" />
        </div>
      </div>

      {/* The Gap is created by justify-between */}

      {/* Academic */}
      <div>
        <div className="flex justify-between items-end mb-2">
          <h3 className="text-lg font-bold text-white">BSc Bio & CompSci</h3>
          <span className="text-xs font-mono text-neutral-500">@UoA</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-full bg-neutral-400" /> {/* Solid bar for completion */}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;