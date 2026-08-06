import React, { useState } from 'react';
import { VenturePackage, ventureStudioService } from '../services/ventureStudio';
import { BusinessOpportunity } from '../types';
import { Lightbulb, Rocket, DollarSign, Award, Download, CheckCircle2, ChevronRight, Presentation } from 'lucide-react';

interface VentureStudioViewProps {
  opportunities: BusinessOpportunity[];
}

export const VentureStudioView: React.FC<VentureStudioViewProps> = ({ opportunities }) => {
  const [selectedOpp, setSelectedOpp] = useState<BusinessOpportunity>(opportunities[0]);
  const [venturePkg, setVenturePkg] = useState<VenturePackage>(
    ventureStudioService.generateVenturePackage(opportunities[0].title, opportunities[0].category)
  );

  const handleSelectOpp = (opp: BusinessOpportunity) => {
    setSelectedOpp(opp);
    setVenturePkg(ventureStudioService.generateVenturePackage(opp.title, opp.category));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Rocket className="w-5 h-5 text-indigo-400" />
            <span>AI VENTURE STUDIO & PITCH DECK BUILDER</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Convert market gap opportunities into a full 10-slide VC Pitch Deck, TAM/SAM/SOM financial model, and competitive moat analysis.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Select Opportunity */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400 px-1 font-mono">
            Discovered Opportunities ({opportunities.length})
          </h3>
          {opportunities.map((opp) => {
            const isSelected = selectedOpp.id === opp.id;
            return (
              <div
                key={opp.id}
                onClick={() => handleSelectOpp(opp)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border-indigo-500 shadow-lg shadow-indigo-500/20'
                    : 'glass-card border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  {opp.category}
                </span>
                <h4 className="text-sm font-bold text-white mt-2">{opp.title}</h4>
                <div className="text-[10px] text-slate-400 mt-2 font-mono">Unicorn Prob: <strong className="text-emerald-400">{opp.unicornProbability}%</strong></div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Generated Pitch Deck & Unit Economics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Venture Package Ready
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">{venturePkg.startupName}</h3>
                <p className="text-xs text-slate-300 italic">{venturePkg.tagline}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-mono">Competitive Moat</span>
                <span className="text-xs font-bold text-indigo-300">{venturePkg.competitiveMoatRating}</span>
              </div>
            </div>

            {/* Financial Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">TAM (Total Market)</span>
                <strong className="text-emerald-400 text-sm">{venturePkg.tamSize}</strong>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">SAM (Serviceable)</span>
                <strong className="text-indigo-400 text-sm">{venturePkg.samSize}</strong>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Gross Margins</span>
                <strong className="text-purple-400 text-sm">{venturePkg.grossMarginPercentage}%</strong>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">CAC Payback</span>
                <strong className="text-amber-400 text-sm">{venturePkg.paybackPeriodMonths} Months</strong>
              </div>
            </div>

            {/* Pitch Deck 10 Slides Grid */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                <Presentation className="w-4 h-4" /> 10-Slide Investor Pitch Deck Blueprint
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {venturePkg.pitchDeckSlides.map((slide) => (
                  <div key={slide.slideNumber} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-indigo-400 font-mono">Slide {slide.slideNumber}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono">
                        {slide.keyGraphicMetric}
                      </span>
                    </div>
                    <h5 className="font-bold text-white text-sm">{slide.title}</h5>
                    <p className="text-slate-400 text-[11px]">{slide.subtitle}</p>
                    <ul className="space-y-1 text-slate-300 pt-1">
                      {slide.bulletPoints.map((bp, i) => <li key={i}>• {bp}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
