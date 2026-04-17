import React, { useState, useEffect } from 'react';

const TokyoTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const options = { timeZone: 'Asia/Tokyo', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const timeString = time.toLocaleTimeString('en-GB', options);

  return (
    /* Added h-full and w-full to ensure it fills the GlassCard */
    <div className="flex flex-col justify-center items-center h-full w-full space-y-4">
      <span className="text-4xl font-mono font-bold text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
        {timeString}
      </span>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
        <span className="text-[16px] font-mono text-neutral-500 uppercase tracking-[0.2em]">
          Tokyo, JST
        </span>
      </div>
    </div>
  );
};

export default TokyoTime;