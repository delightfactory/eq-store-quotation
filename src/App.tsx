
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
    <div className="min-h-screen bg-bg-base text-text-primary flex flex-col relative font-arabic selection:bg-gold-primary/30 selection:text-white">
      {/* Abstract background elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden no-print">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-tech/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
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
