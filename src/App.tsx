
import { StickyTopBar } from './components/StickyTopBar'
import { QuotationHero } from './components/QuotationHero'
import { ExecutiveMetrics } from './components/ExecutiveMetrics'
import { BudgetAllocation } from './components/BudgetAllocation'
import { OfficialQuotationTable } from './components/OfficialQuotationTable'
import { ProductCards } from './components/ProductCards'
import { RawMaterialTimeline } from './components/RawMaterialTimeline'
import { LiveBudgetMonitor } from './components/LiveBudgetMonitor'
import { ProductionTracker } from './components/ProductionTracker'
import { CommercialTerms } from './components/CommercialTerms'
import { FooterBranding } from './components/FooterBranding'
import { LoginGate } from './components/LoginGate'

function App() {
  return (
    <LoginGate>
    <div className="min-h-screen bg-bg-base text-text-primary flex flex-col relative font-arabic selection:bg-cyan-primary/20 selection:text-white">
      {/* Command Grid Background */}
      <div className="fixed inset-0 command-grid pointer-events-none z-0 no-print" aria-hidden="true" />

      {/* Subtle ambient lighting – navy/cyan instead of heavy gold blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden no-print" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-cyan-primary/[0.04] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-secondary/[0.04] rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />
      </div>

      <StickyTopBar />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10 relative space-y-16">
        <section id="hero"><QuotationHero /></section>
        <section id="metrics"><ExecutiveMetrics /></section>
        <section id="budget"><BudgetAllocation /></section>
        <section id="quotation"><OfficialQuotationTable /></section>
        <section id="products"><ProductCards /></section>
        <section id="materials"><RawMaterialTimeline /></section>
        <section id="simulation"><LiveBudgetMonitor /></section>
        <section id="tracker"><ProductionTracker /></section>
        <section id="terms"><CommercialTerms /></section>
        <FooterBranding />
      </main>
    </div>
    </LoginGate>
  )
}

export default App
