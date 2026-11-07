import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../config';
import { saveRsvp, generateDocId } from '../services/db';
import SizeChartModal from './SizeChartModal';
import {
  User,
  Crown,
  Sparkles,
  Calendar,
  Shirt,
  Ruler,
  Check,
  AlertCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Heart,
} from 'lucide-react';

export default function RsvpForm({ initialTeam, onRsvpSuccess, existingRsvps = [] }) {
  // Form State
  const [name, setName] = useState('');
  const [team, setTeam] = useState(initialTeam || 'bride');
  const [preferredDate, setPreferredDate] = useState(config.dates[0]?.id || '2027-01-28');
  const [needsJersey, setNeedsJersey] = useState(true);
  const [jerseySize, setJerseySize] = useState('M');

  // UI State
  const [currentStep, setCurrentStep] = useState(1);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync initialTeam prop if clicked from FaceOffBanner
  useEffect(() => {
    if (initialTeam) {
      setTeam(initialTeam);
    }
  }, [initialTeam]);

  // Determine total steps: 4 if jersey needed, 3 if not needed
  const totalSteps = needsJersey ? 4 : 3;

  const validateStep = (step) => {
    setErrorMsg('');
    if (step === 1) {
      if (!name.trim()) {
        setErrorMsg('Please enter your full name to proceed.');
        return false;
      }
      if (name.trim().length < 2) {
        setErrorMsg('Please enter a valid full name.');
        return false;
      }
    }
    if (step === 2) {
      if (!team) {
        setErrorMsg(`Please choose your squad (${config.teams.bride.name} or ${config.teams.groom.name}).`);
        return false;
      }
    }
    if (step === 4 && needsJersey) {
      if (!jerseySize) {
        setErrorMsg('Please pick a jersey size.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 3 && !needsJersey) {
        handleSubmit();
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      }
    }
  };

  const handlePrev = () => {
    setErrorMsg('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validateStep(1)) {
      setCurrentStep(1);
      return;
    }
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        name: name.trim(),
        team,
        preferredDate,
        needsJersey,
        jerseySize: needsJersey ? jerseySize : 'None',
      };

      const result = await saveRsvp(payload);

      if (result.success) {
        if (onRsvpSuccess) {
          onRsvpSuccess({ ...payload, docId: result.docId, isCloud: result.isCloud });
        }
      } else {
        setErrorMsg(result.error || 'Failed to submit RSVP to the cloud database. Please check your internet connection.');
      }
    } catch (err) {
      console.error('RSVP submit error', err);
      setErrorMsg('Something went wrong saving your RSVP. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#fffaf5] via-[#fff5f6] to-[#fffaf5] relative">
      <div className="mx-auto max-w-lg">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300 px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
            <Heart className="h-3.5 w-3.5 text-rose-600 fill-rose-600" />
            <span>Join the Match Sheet</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
            Reserve Your Spot & Jersey
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
            {config.dates[0]?.fullDate || 'Thursday, Jan 28, 2027'} • Pick your squad & jersey size for custom printing.
          </p>
        </div>

        {/* Wizard Card with Rose & Gold Wedding Border */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-rose-900/5 border border-rose-200/80">
          {/* Progress Bar & Header */}
          <div className="border-b border-rose-100 bg-[#fffdfa] p-4 sm:p-5">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span className="text-rose-700 font-serif font-bold">
                {currentStep === 1 && 'Player Info'}
                {currentStep === 2 && 'Select Squad'}
                {currentStep === 3 && 'Jersey Option'}
                {currentStep === 4 && 'Select Size'}
              </span>
            </div>

            {/* Stepper bar: Rose & Gold */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-100 flex">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Step Body */}
          <form onSubmit={(e) => e.preventDefault()} className="p-5 sm:p-6">
            <AnimatePresence mode="wait">
              {/* STEP 1: Full Name */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="fullname" className="block text-sm font-bold text-stone-800 mb-1 font-serif">
                      1. What is your full name? <span className="text-rose-500">*</span>
                    </label>
                    <p className="text-xs text-stone-500 mb-3">
                      This will be printed on the match roster and jersey handover list.
                    </p>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-rose-400">
                        <User className="h-5 w-5" />
                      </div>
                      <input
                        id="fullname"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errorMsg) setErrorMsg('');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleNext();
                          }
                        }}
                        placeholder="e.g. Divya Nair"
                        className="w-full rounded-2xl border border-rose-200 bg-[#fffaf5] py-3.5 pl-11 pr-4 text-sm font-medium text-stone-900 placeholder-stone-400 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-500/15"
                        autoFocus
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Team Selection (Rose vs Gold) */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-bold text-stone-800 mb-1 font-serif">
                      2. Choose your squad <span className="text-rose-500">*</span>
                    </label>
                    <p className="text-xs text-stone-500 mb-3">
                      Tap the squad card you'd like to back on the pitch!
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Team Amritha (Rose Gold) */}
                      <div
                        onClick={() => setTeam('bride')}
                        className={`relative cursor-pointer rounded-2xl p-4 border-2 transition-all flex flex-col justify-between ${
                          team === 'bride'
                            ? 'border-rose-500 bg-rose-50/80 shadow-md ring-2 ring-rose-400/20'
                            : 'border-stone-200 bg-white hover:border-rose-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500 via-pink-600 to-rose-700 text-white shadow-sm">
                            <Crown className="h-5 w-5 text-amber-200" />
                          </div>
                          {team === 'bride' && (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-white">
                              <Check className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </div>
                        <h4 className="text-base font-extrabold text-rose-950 font-serif">
                          {config.teams.bride.name}
                        </h4>
                        <p className="text-xs text-rose-700 mt-0.5">
                          {config.teams.bride.subtitle}
                        </p>
                        <span className="mt-2 text-[10px] font-semibold text-rose-600 uppercase tracking-wider">
                          Jersey: {config.teams.bride.colorName}
                        </span>
                      </div>

                      {/* Team Sanjay (Champagne Gold) */}
                      <div
                        onClick={() => setTeam('groom')}
                        className={`relative cursor-pointer rounded-2xl p-4 border-2 transition-all flex flex-col justify-between ${
                          team === 'groom'
                            ? 'border-amber-500 bg-amber-50/80 shadow-md ring-2 ring-amber-400/20'
                            : 'border-stone-200 bg-white hover:border-amber-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-600 to-amber-700 text-white shadow-sm">
                            <Sparkles className="h-5 w-5 text-amber-100" />
                          </div>
                          {team === 'groom' && (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-white">
                              <Check className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </div>
                        <h4 className="text-base font-extrabold text-amber-950 font-serif">
                          {config.teams.groom.name}
                        </h4>
                        <p className="text-xs text-amber-700 mt-0.5">
                          {config.teams.groom.subtitle}
                        </p>
                        <span className="mt-2 text-[10px] font-semibold text-amber-700 uppercase tracking-wider">
                          Jersey: {config.teams.groom.colorName}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Jersey Requirement */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-bold text-stone-800 mb-1 font-serif">
                      3. Custom jersey available. Do you need one? <span className="text-rose-500">*</span>
                    </label>
                    <p className="text-xs text-stone-500 mb-3">
                      We are printing team jerseys with your squad colors for everyone playing!
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setNeedsJersey(true)}
                        className={`flex flex-col items-center justify-center rounded-2xl p-5 border-2 transition-all ${
                          needsJersey
                            ? 'border-rose-600 bg-rose-50 text-rose-900 shadow-md ring-2 ring-rose-400/20 font-bold'
                            : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-700 mb-2">
                          <Shirt className="h-6 w-6" />
                        </div>
                        <span className="text-base font-extrabold font-serif">Yes, please!</span>
                        <span className="text-[11px] text-rose-700 mt-1">I want a squad jersey</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setNeedsJersey(false)}
                        className={`flex flex-col items-center justify-center rounded-2xl p-5 border-2 transition-all ${
                          !needsJersey
                            ? 'border-amber-600 bg-amber-50 text-amber-950 shadow-md ring-2 ring-amber-400/20 font-bold'
                            : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700 mb-2">
                          <Check className="h-6 w-6" />
                        </div>
                        <span className="text-base font-extrabold font-serif">No, thanks</span>
                        <span className="text-[11px] text-stone-500 mt-1">I'll wear my own outfit</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Jersey Size (Only shown if needsJersey is true) */}
              {currentStep === 4 && needsJersey && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm font-bold text-stone-800 font-serif">
                        4. Select your jersey size <span className="text-rose-500">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsSizeChartOpen(true)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 hover:text-rose-900 underline underline-offset-2"
                      >
                        <Ruler className="h-3.5 w-3.5" />
                        <span>View size chart</span>
                      </button>
                    </div>
                    <p className="text-xs text-stone-500 mb-3">
                      Standard unisex athletic sizing (XS to 3XL):
                    </p>

                    {/* Size Selector Grid: Rose & Gold */}
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {config.jerseySizeChart.map((item) => {
                        const isSelected = jerseySize === item.size;
                        return (
                          <button
                            key={item.size}
                            type="button"
                            onClick={() => setJerseySize(item.size)}
                            className={`flex flex-col items-center justify-center rounded-xl py-3 border-2 transition-all ${
                              isSelected
                                ? 'border-rose-600 bg-gradient-to-r from-rose-600 to-amber-600 text-white font-extrabold shadow-md scale-105'
                                : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-rose-300 font-semibold'
                            }`}
                          >
                            <span className="text-sm sm:text-base">{item.size}</span>
                            <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-amber-100' : 'text-stone-400'}`}>
                              {item.chest}cm
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            {errorMsg && (
              <div className="mt-4 flex items-center gap-2 rounded-2xl bg-rose-50 p-3 text-xs text-rose-700 border border-rose-200">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Nav & Submit Buttons */}
            <div className="mt-6 flex items-center gap-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-1.5 rounded-2xl border border-stone-300 bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-stone-700 hover:bg-stone-50 disabled:opacity-50 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 py-3.5 px-5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-rose-950/20 hover:from-rose-700 hover:to-amber-700 active:scale-98 transition-all"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 py-3.5 px-6 text-sm font-extrabold text-white shadow-xl shadow-rose-950/25 hover:from-rose-700 hover:to-amber-700 active:scale-98 disabled:opacity-75 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                      <span>Saving your spot...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm RSVP & Jersey</span>
                      <Sparkles className="h-4 w-4 text-amber-200" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Size Chart Modal */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        onSelectSize={(sz) => setJerseySize(sz)}
      />
    </section>
  );
}
