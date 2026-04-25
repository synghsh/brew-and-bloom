import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TableStatus = 'available' | 'booked';
type TableType = 'round' | 'rect';

interface TableData {
  id: string;
  x: number;
  y: number;
  type: TableType;
  seats: number;
  status: TableStatus;
  area: string;
}

// Mock floor plan data
const CAFE_TABLES: TableData[] = [
  // Window Seats
  { id: 'W1', x: 80, y: 60, type: 'round', seats: 2, status: 'available', area: 'Window Side' },
  { id: 'W2', x: 80, y: 160, type: 'round', seats: 2, status: 'booked', area: 'Window Side' },
  { id: 'W3', x: 80, y: 260, type: 'round', seats: 2, status: 'available', area: 'Window Side' },
  
  // Main Floor (Rectangular)
  { id: 'M1', x: 220, y: 100, type: 'rect', seats: 4, status: 'available', area: 'Main Floor' },
  { id: 'M2', x: 340, y: 100, type: 'rect', seats: 4, status: 'available', area: 'Main Floor' },
  { id: 'M3', x: 220, y: 220, type: 'rect', seats: 4, status: 'booked', area: 'Main Floor' },
  { id: 'M4', x: 340, y: 220, type: 'rect', seats: 4, status: 'available', area: 'Main Floor' },

  // Private Corner
  { id: 'P1', x: 500, y: 80, type: 'round', seats: 6, status: 'available', area: 'Private Corner' },
  { id: 'P2', x: 500, y: 240, type: 'round', seats: 4, status: 'available', area: 'Private Corner' },
];

interface InteractiveSeatingMapProps {
  selectedTable: string | null;
  onSelectTable: (id: string) => void;
}

export default function InteractiveSeatingMap({ selectedTable, onSelectTable }: InteractiveSeatingMapProps) {
  const [hoveredTable, setHoveredTable] = useState<TableData | null>(null);

  const handleTableClick = (table: TableData) => {
    if (table.status === 'available') {
      onSelectTable(table.id);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6">
      
      {/* Info Panel */}
      <div className="h-16 w-full flex items-center justify-between px-6 bg-[#1A1110] border border-[#D4AF37]/20 rounded-2xl">
        <div className="flex gap-4 text-sm text-[#F5E6D3]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#4A3728]"></div> Available
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1A1110] border border-[#F5E6D3]/20"></div> Booked
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#D4AF37] gold-glow"></div> Selected
          </div>
        </div>

        <div className="text-right">
          <AnimatePresence mode="wait">
            {hoveredTable ? (
              <motion.p
                key="hovered"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[#D4AF37] font-medium"
              >
                {hoveredTable.area} • Table {hoveredTable.id} ({hoveredTable.seats} Seats)
                {hoveredTable.status === 'booked' && <span className="text-red-400 ml-2">(Unavailable)</span>}
              </motion.p>
            ) : (
              <motion.p
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#F5E6D3]/50 italic"
              >
                Hover over a table to see details
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Interactive SVG Floor Plan */}
      <div className="relative w-full aspect-[2/1] bg-[#1A1110]/50 rounded-3xl border border-[#D4AF37]/10 overflow-hidden premium-shadow">
        <svg
          viewBox="0 0 600 320"
          className="w-full h-full drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }}
        >
          {/* Cafe Floor Layout Lines */}
          <rect x="20" y="20" width="560" height="280" rx="16" fill="none" stroke="#D4AF37" strokeWidth="2" strokeOpacity="0.2" strokeDasharray="8 8" />
          <line x1="160" y1="20" x2="160" y2="300" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="440" y1="20" x2="440" y2="300" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.2" />
          
          <text x="90" y="45" fill="#F5E6D3" opacity="0.3" fontSize="12" textAnchor="middle" letterSpacing="2">WINDOW</text>
          <text x="300" y="45" fill="#F5E6D3" opacity="0.3" fontSize="12" textAnchor="middle" letterSpacing="2">MAIN FLOOR</text>
          <text x="500" y="45" fill="#F5E6D3" opacity="0.3" fontSize="12" textAnchor="middle" letterSpacing="2">PRIVATE</text>

          {/* Map through Tables */}
          {CAFE_TABLES.map((table) => {
            const isSelected = selectedTable === table.id;
            const isAvailable = table.status === 'available';
            
            // Colors based on status
            let fillColor = isAvailable ? '#4A3728' : '#1A1110';
            let strokeColor = isAvailable ? '#C67B5C' : 'rgba(245, 230, 211, 0.1)';
            
            if (isSelected) {
              fillColor = '#D4AF37'; // Gold
              strokeColor = '#FFFFFF';
            }

            return (
              <motion.g
                key={table.id}
                className={isAvailable ? 'cursor-none' : 'cursor-not-allowed'}
                onMouseEnter={() => setHoveredTable(table)}
                onMouseLeave={() => setHoveredTable(null)}
                onClick={() => handleTableClick(table)}
                whileHover={{ scale: isAvailable ? 1.05 : 1 }}
                whileTap={{ scale: isAvailable ? 0.95 : 1 }}
              >
                {table.type === 'round' ? (
                  <circle cx={table.x} cy={table.y} r={24} fill={fillColor} stroke={strokeColor} strokeWidth="2" className="transition-colors duration-300" />
                ) : (
                  <rect x={table.x - 30} y={table.y - 20} width={60} height={40} rx={6} fill={fillColor} stroke={strokeColor} strokeWidth="2" className="transition-colors duration-300" />
                )}
                
                {/* Table Label */}
                <text
                  x={table.x}
                  y={table.y + 4}
                  textAnchor="middle"
                  fill={isSelected ? '#1A1110' : (isAvailable ? '#F5E6D3' : '#F5E6D3')}
                  opacity={isAvailable ? 1 : 0.3}
                  fontSize="12"
                  fontWeight="bold"
                  style={{ pointerEvents: 'none' }}
                >
                  {table.id}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}