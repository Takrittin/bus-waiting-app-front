"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Bus, CheckCircle2, Wifi, Accessibility } from "lucide-react";

export default function ArrivalCard() {
  // Track whether the card is pulled up or pushed down
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      // 1. Framer Motion Drag Properties
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }} // Forces snap-back if not swiped hard enough
      dragElastic={0.2} // Adds that nice rubber-band feel
      onDragEnd={(e, { offset, velocity }) => {
        // 2. Logic to detect swipe direction and speed
        const swipeDown = offset.y > 0 || velocity.y > 500;
        const swipeUp = offset.y < 0 || velocity.y < -500;
        
        if (swipeUp) setIsExpanded(true);
        if (swipeDown) setIsExpanded(false);
      }}
      // 3. Animation States (Variants)
      initial="expanded"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={{
        expanded: { y: 0 },
        // Pushes the card down, leaving only the header/handle visible (~130px)
        collapsed: { y: "calc(100% - 130px)" } 
      }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      
      // 4. Styling updates
      // Replaced absolute/bottom-20 with fixed/bottom-0 for proper mobile bottom-sheet behavior.
      // Removed `-translate-x-1/2` from className and moved it to style to avoid transform conflicts.
      className="fixed bottom-0 left-0 right-0 mx-auto w-[92%] md:w-[700px] lg:w-[800px] h-[95vh] bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 touch-none p-6 md:p-8"
      style={{ x: "-50%" }} 
    >
      {/* Pull handle for mobile - added cursor styles and onClick toggle */}
      <div 
        className="w-16 h-1.5 bg-gray-300 hover:bg-gray-400 rounded-full mx-auto mb-6 md:hidden cursor-grab active:cursor-grabbing transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 md:gap-6 mb-8 mt-2 md:mt-0">
        <div>
          <p className="text-[10px] md:text-xs font-labels text-[var(--color-tertiary)] uppercase tracking-[0.15em] font-semibold mb-2 md:mb-3">
            Next Arrival
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 leading-tight mb-2 tracking-tight">
            Alexandria<br/>Square
          </h2>
          <p className="text-sm md:text-base font-sans text-gray-600">
            Platform 2 &bull; Heading Northbound
          </p>
        </div>
        
        <div className="text-left md:text-right mt-4 md:mt-0 flex flex-row md:flex-col items-baseline md:items-end justify-between w-full md:w-auto">
          <div className="flex items-baseline gap-2 text-[var(--color-primary)]">
            <span className="text-xs md:text-sm font-bold tracking-widest uppercase mb-1 md:hidden">ETA </span>
            <span className="hidden md:inline text-sm font-bold tracking-widest uppercase mb-1 mr-1">ETA:</span>
            <span className="text-6xl md:text-7xl font-sans font-medium tracking-tighter leading-none">7</span>
            <span className="text-lg font-serif">minutes</span>
          </div>
          <p className="text-[10px] md:text-xs font-labels text-gray-500 mt-1 md:mt-2 uppercase tracking-widest">
            Scheduled for 14:42
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap items-stretch md:items-center gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="flex gap-3 h-12 md:h-auto">
          <div className="flex-1 md:flex-none flex justify-center items-center gap-2 px-4 py-2.5 md:py-2 bg-[var(--color-surface-lowest)] rounded-lg text-sm text-gray-700 font-sans border-0 md:border md:border-[var(--color-outline-variant)]">
            <Bus className="w-4 h-4 text-[var(--color-primary)]" />
            <span className="font-medium">Capacity: 30%</span>
          </div>
          <div className="flex-1 md:flex-none flex justify-center items-center gap-2 px-4 py-2.5 md:py-2 bg-[var(--color-surface-lowest)] rounded-lg text-sm text-gray-700 font-sans border-0 md:border md:border-[var(--color-outline-variant)]">
            <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" />
            <span className="font-medium">On Time</span>
          </div>
        </div>
        
        <div className="flex-1 flex justify-end gap-3 mt-2 md:mt-0">
          <button className="flex-1 md:flex-none px-6 py-3.5 md:py-3 bg-[var(--color-surface-lowest)] text-[var(--color-primary)] rounded-lg font-medium text-sm transition-colors hover:bg-[var(--color-surface-dim)] border-0 md:border md:border-[var(--color-outline-variant)]">
            Notify Me
          </button>
          <button className="flex-1 md:flex-none px-6 py-3.5 md:py-3 bg-gradient-to-r from-[var(--color-primary)] to-[#155fc7] text-white rounded-lg font-medium text-sm transition-transform hover:scale-[1.02] shadow-[0_4px_14px_rgba(9,76,178,0.25)]">
            View Route
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center pt-5 md:pt-6 border-t border-[var(--color-outline-variant)] text-[9px] md:text-xs text-gray-400 font-labels uppercase tracking-[0.15em] font-semibold">
        <div className="flex gap-4 md:gap-6">
          <span className="flex items-center gap-1.5 md:gap-2">
            <Wifi className="w-3 h-3" /> <span className="hidden md:inline">Free Onboard</span> WiFi
          </span>
          <span className="flex items-center gap-1.5 md:gap-2">
            <Accessibility className="w-3 h-3" /> Fully Accessible
          </span>
        </div>
        <span>Updated 30s ago</span>
      </div>
    </motion.div>
  );
}