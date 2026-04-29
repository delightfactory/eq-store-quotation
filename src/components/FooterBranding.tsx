import React from 'react';
import { issuer, client, digitalExperience } from '../data/quotationData';
import { NeutralDivider } from './Shared';

export const FooterBranding: React.FC = () => {
  return (
    <footer className="mt-12 md:mt-20 pb-12 pt-8 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
      {/* Cyan technical divider */}
      <NeutralDivider />

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8">

        {/* Issuer: Delight Factory */}
        <div className="flex flex-col items-center md:items-start text-center md:text-right">
          <span className="text-[9px] text-text-muted font-en uppercase tracking-widest mb-3">
            Manufacturing Partner
          </span>
          <img src="/delight-logo.png" alt={issuer.nameEn} className="h-10 object-contain mb-3" />
          <span className="text-base font-bold text-text-primary">{issuer.name}</span>
          <span className="text-[10px] text-text-muted mt-1">Source of Manufacturing</span>
        </div>

        {/* Center: Confidentiality notice */}
        <div className="hidden md:flex flex-col items-center gap-3 text-center max-w-xs">
          <div
            className="text-[10px] text-text-muted px-4 py-2 rounded-sm font-en"
            style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.10)' }}
          >
            This document is highly confidential and intended solely for the use of{' '}
            <span className="text-text-secondary font-medium">{client.nameEn}</span>.
          </div>
          <span
            className="text-[9px] font-en uppercase tracking-widest"
            style={{ color: 'rgba(0,212,255,0.35)' }}
          >
            FACTORY COMMAND BRIEF · EQ STORE
          </span>
        </div>

        {/* Tech Edge: Digital Systems Partner */}
        <div className="flex flex-col items-center md:items-end text-center md:text-left">
          <span className="text-[9px] text-text-muted font-en uppercase tracking-widest mb-2">
            Digital Systems Partner
          </span>
          <div className="flex items-center gap-3">
            <img
              src="/techedge-logo.png"
              alt={digitalExperience.by}
              className="h-8 w-8 object-contain rounded-md"
            />
            <span
              className="text-sm font-bold font-en tracking-wide"
              style={{ color: 'rgba(0,212,255,0.85)' }}
            >
              {digitalExperience.by}
            </span>
          </div>
          <span className="text-[9px] text-text-muted mt-1.5 font-en">
            Interactive Quotation Platform
          </span>
        </div>

      </div>

      {/* Mobile confidentiality */}
      <div className="md:hidden mt-8 text-center px-4">
        <p className="text-[10px] text-text-muted/50 leading-relaxed font-en">
          Confidential document intended solely for {client.nameEn}.
        </p>
      </div>
    </footer>
  );
};
