import React from 'react';
import { issuer, client, digitalExperience } from '../data/quotationData';
import { GoldDivider } from './Shared';

export const FooterBranding: React.FC = () => {
  return (
    <footer className="mt-20 pb-12 pt-8 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
      <GoldDivider />
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
        
        {/* Left / Top: Issuer */}
        <div className="flex flex-col items-center md:items-start text-center md:text-right">
          <span className="text-xs text-text-secondary font-en uppercase tracking-wider mb-3">Issued By</span>
          <img src="/delight-logo.png" alt={issuer.nameEn} className="h-10 object-contain mb-3" />
          <span className="text-base font-bold text-text-primary">{issuer.name}</span>
        </div>

        {/* Center: Notice */}
        <div className="hidden md:block text-xs text-text-secondary/50 text-center max-w-xs">
          This document is highly confidential and intended solely for the use of {client.nameEn}.
        </div>

        {/* Right / Bottom: Tech Edge */}
        <div className="flex flex-col items-center md:items-end text-center md:text-left">
          <span className="text-[10px] text-text-secondary uppercase tracking-widest font-en mb-2 opacity-70">
            Digital Experience By
          </span>
          <div className="flex items-center gap-3">
            <img src="/techedge-logo.png" alt={digitalExperience.by} className="h-6 w-6 object-contain rounded-md" />
            <span className="text-sm font-bold font-en text-white tracking-wide">
              {digitalExperience.by}
            </span>
          </div>
        </div>

      </div>
      
      {/* Mobile only confidentiality notice */}
      <div className="md:hidden mt-8 text-center px-4">
        <p className="text-[10px] text-text-secondary/40 leading-relaxed font-en">
          Confidential document intended solely for {client.nameEn}.
        </p>
      </div>
    </footer>
  );
};
