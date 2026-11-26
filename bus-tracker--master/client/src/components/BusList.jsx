import { useState } from 'react';
import { motion } from 'framer-motion';

export default function BusList({ buses, selectedBusNumber, onSelectBus }) {
  const busEntries = Object.entries(buses);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredBusEntries = busEntries.filter(([busNumber]) =>
    busNumber.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <aside
      style={{ width: 260, height: '100%', overflowY: 'auto', flexShrink: 0, borderLeft: '1px solid rgba(255,255,255,0.07)', background: 'rgba(8,12,24,0.97)' }}
      className="hidden sm:flex flex-col"
    >
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }} className="px-4 py-3">
        <p className="text-white/40 text-xs uppercase tracking-widest font-medium">Active Buses</p>
        <p className="text-white font-bold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>
          {busEntries.length} Online
        </p>
      </div>

      <div className="px-3 pt-3">
        <label htmlFor="bus-number-search" className="sr-only">Search buses by bus number</label>
        <input
          id="bus-number-search"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search bus number"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30"
        />
      </div>

      {/* List */}
      <div className="flex flex-col gap-1 p-3">
        {busEntries.length === 0 ? (
          <p className="text-white/20 text-xs text-center py-6">No buses online</p>
        ) : filteredBusEntries.length === 0 ? (
          <p className="text-white/20 text-xs text-center py-6">No buses match that number</p>
        ) : (
          filteredBusEntries.map(([busNumber, bus]) => (
            <motion.button
              key={busNumber}
              type="button"
              onClick={() => onSelectBus(busNumber)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col gap-1 text-left px-3 py-3 rounded-xl border transition-all ${
                selectedBusNumber === busNumber
                  ? 'border-amber-400/40 bg-amber-400/10 text-amber-400'
                  : 'border-white/5 bg-white/[0.02] text-white/60 hover:border-white/10 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${bus.lat ? 'bg-emerald-400 animate-pulse' : 'bg-white/20'}`} />
                <span className="font-bold text-sm font-mono">{busNumber}</span>
              </div>
              {bus.busName && <span className="text-xs text-white/35 pl-3.5">{bus.busName}</span>}
              {bus.driverName && <span className="text-xs text-white/25 pl-3.5">{bus.driverName}</span>}
            </motion.button>
          ))
        )}
      </div>
    </aside>
  );
}
