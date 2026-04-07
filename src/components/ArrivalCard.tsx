"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Bus, Star, Radio, Clock } from "lucide-react";

export default function ArrivalCard() {
  // Track whether the card is pulled up or pushed down
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeToggles, setActiveToggles] = useState<Record<string, boolean>>({
    '36': true,
    '21E': true,
    '93': true,
    '50': true,
    '47': true,
    '141': true,
    '37': true,
    '108R': true
  });

  const busList = [
    { id: '36', number: '36 / 2-40', route: 'Rama 9 Depot → Si Phraya' },
    { id: '21E', number: '21E / 4-7E', route: 'EXPRESSWAY : Chulalongkorn University → Wa...' },
    { id: '93', number: '93 / 1-40', route: 'Nakkila Laemthong Village → Si Phraya' },
    { id: '50', number: '50 / 2-7', route: 'Rama 7 → Lumphini Park' },
    { id: '47', number: '47 / 3-41', route: 'Bangkok Department of Lands → Bangkok Port...' },
    { id: '141', number: '141 / 4-24E', route: 'EXPRESSWAY : Chulalongkorn University → Sa...' },
    { id: '37', number: '37 / 4-9', route: 'Chulalongkorn University → Phra Pradaeng Pier' },
    { id: '108R', number: '108R / 4-19', route: 'The Mall Thapra → Victory Monument → (RI...' },
  ];

  const handleToggle = (id: string) => {
    setActiveToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <motion.div
      // 1. Framer Motion Drag Properties
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }} 
      dragElastic={0.2} 
      onDragEnd={(e, { offset, velocity }) => {
        const swipeDown = offset.y > 0 || velocity.y > 500;
        const swipeUp = offset.y < 0 || velocity.y < -500;
        
        if (swipeUp) setIsExpanded(true);
        if (swipeDown) setIsExpanded(false);
      }}
      // 2. Animation States (Variants)
      initial="expanded"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={{
        expanded: { y: 0 },
        collapsed: { y: "calc(100% - 130px)" } 
      }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      // removed touch-none so the list inside is scrollable
      className="fixed bottom-0 left-0 right-0 mx-auto w-full md:w-[700px] lg:w-[800px] h-[90vh] bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 flex flex-col overflow-hidden"
    >
      {/* Header Section (Acts as Drag handle too) */}
      <div className="bg-[var(--color-primary)] text-white p-5 md:p-6 shrink-0 relative cursor-grab active:cursor-grabbing">
        {/* Pull handle for mobile */}
        <div 
          className="w-12 h-1.5 bg-white/30 hover:bg-white/50 rounded-full mx-auto mb-4 md:mb-5 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        
        <div className="flex justify-between items-center px-2">
          <div>
            <div className="flex items-center gap-1.5 opacity-90 mb-1">
              <Bus className="w-4 h-4" />
              <span className="text-xs font-semibold tracking-wide">Bus</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
              Osotsala
            </h2>
          </div>
          <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <Star className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* List Section */}
      <div className="flex-1 overflow-y-auto w-full bg-gray-50 pb-8">
        {busList.map((bus) => {

          return (
            <div key={bus.id} className="flex justify-between items-center p-4 md:px-6 md:py-5 border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors">
              <div className="flex-1 pr-4">
                <h3 className="text-xl md:text-2xl font-sans font-bold text-gray-900 mb-1">
                  {bus.number}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 font-medium truncate">
                  {bus.route}
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-1 md:gap-2 shrink-0 w-12">
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <Radio className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-[9px] md:text-[10px] font-bold uppercase mt-0.5">GPS</span>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={activeToggles[bus.id!] || false}
                    onChange={() => handleToggle(bus.id!)}
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}