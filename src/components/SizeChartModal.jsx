import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../config';
import { X, Ruler, Info, Check } from 'lucide-react';

export default function SizeChartModal({ isOpen, onClose, onSelectSize }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-rose-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-rose-100 bg-gradient-to-r from-rose-50 via-amber-50/50 to-rose-50 px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-sm">
                <Ruler className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-stone-900 font-serif">
                  Shirt Size Chart
                </h3>
                <p className="text-xs text-stone-500">Official measurements in inches</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 hover:bg-rose-100 hover:text-stone-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Table Container */}
          <div className="p-4 sm:p-5">
            <div className="overflow-x-auto rounded-2xl border border-stone-800 shadow-lg bg-stone-950 text-white">
              {/* Header Title Banner */}
              <div className="bg-black py-2.5 px-4 text-center border-b border-stone-800">
                <h4 className="font-extrabold tracking-widest text-sm uppercase text-white font-mono">
                  SHIRT SIZE CHART
                </h4>
              </div>

              {/* Exact Matrix Matching Reference Chart */}
              <table className="w-full text-center text-xs sm:text-sm">
                <thead>
                  <tr className="bg-stone-900 border-b border-stone-800 text-amber-300 font-bold uppercase text-xs sm:text-sm">
                    <th className="px-3 py-2.5 text-left text-stone-400 font-mono text-[11px] w-28">
                      Dimension
                    </th>
                    {config.jerseySizeChart.map((s) => (
                      <th key={s.size} className="px-2.5 sm:px-3 py-2.5 font-black text-amber-300 text-sm">
                        {s.size}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 font-mono text-stone-200">
                  <tr className="hover:bg-stone-900/50 transition-colors">
                    <td className="px-3 py-2.5 text-left font-sans font-bold text-stone-300 text-xs uppercase tracking-wide">
                      CHEST
                    </td>
                    {config.jerseySizeChart.map((s) => (
                      <td key={s.size} className="px-2.5 sm:px-3 py-2.5 font-bold text-white">
                        {s.chest}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-stone-900/50 transition-colors">
                    <td className="px-3 py-2.5 text-left font-sans font-bold text-stone-300 text-xs uppercase tracking-wide">
                      LENGTH
                    </td>
                    {config.jerseySizeChart.map((s) => (
                      <td key={s.size} className="px-2.5 sm:px-3 py-2.5">
                        {s.length}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-stone-900/50 transition-colors">
                    <td className="px-3 py-2.5 text-left font-sans font-bold text-stone-300 text-xs uppercase tracking-wide">
                      SLEEVE LENGTH
                    </td>
                    {config.jerseySizeChart.map((s) => (
                      <td key={s.size} className="px-2.5 sm:px-3 py-2.5">
                        {s.sleeve}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-stone-900/50 transition-colors">
                    <td className="px-3 py-2.5 text-left font-sans font-bold text-stone-300 text-xs uppercase tracking-wide">
                      SHOULDER
                    </td>
                    {config.jerseySizeChart.map((s) => (
                      <td key={s.size} className="px-2.5 sm:px-3 py-2.5">
                        {s.shoulder}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>

              {/* Quick Select Row */}
              <div className="p-3 bg-stone-900 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <span className="text-[11px] text-stone-400 font-sans font-semibold">
                  Tap to select your size:
                </span>
                <div className="flex items-center gap-1.5 w-full sm:w-auto justify-center">
                  {config.jerseySizeChart.map((s) => (
                    <button
                      key={s.size}
                      type="button"
                      onClick={() => {
                        if (onSelectSize) onSelectSize(s.size);
                        onClose();
                      }}
                      className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-extrabold text-xs shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1"
                    >
                      <span>{s.size}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sizing tip */}
            <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-amber-50 p-3.5 text-xs text-amber-950 border border-amber-200">
              <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                <strong>Fitting Advice:</strong> All measurements are in inches. The jerseys are athletic dri-fit fabric. If you prefer a looser or more relaxed fit, consider picking one size up!
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto rounded-xl bg-stone-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-stone-800 transition-colors"
              >
                Close & Return to Form
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
