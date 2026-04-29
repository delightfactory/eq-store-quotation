# INTERACTIVE_QUOTATION_SKILL.md

> **Authoritative skill file** for the EQ Store Manufacturing Quotation & Budget Monitor project.
> Read this file BEFORE writing any code. Re-read it before merging any change.
> If anything in implementation conflicts with this file, this file wins.

---

## 1. Mission

Build a premium, RTL Arabic, interactive quotation experience titled:

**EQ Store Manufacturing Quotation & Budget Monitor**

The page is a formal bulk manufacturing quotation issued by **Delight Factory for Car Care Products** to **EQ Store**, presented through a modern luxury B2B dashboard experience powered by **Tech Edge**.

The experience must:
- Function as a binding-grade commercial document at v1.0.
- Communicate strategic budget allocation, not just prices.
- Demonstrate Tech Edge's capability to build serious B2B digital experiences.
- Provide structural readiness for a future Production Tracker and Live Budget Monitor without compromising the integrity of the v1.0 issued quotation.

---

## 2. Project Identity (Locked)

| Attribute | Value |
|---|---|
| Quotation issuer | Delight Factory for Car Care Products |
| Client | EQ Store |
| Digital experience by | Tech Edge (presentation layer only) |
| Document type | Bulk liquid car care products quotation |
| Delivery scope | Ex-factory at Delight Factory |
| Total value | 503,125 EGP |
| Quotation version | 1.0 |
| Issue date | 29 April 2026 |
| Validity | 3 business days from issue date |
| Computed expiry | 4 May 2026 |
| VAT | NOT included |
| Packaging / filling / labeling | NOT included |
| Primary language | Arabic (RTL) |
| Supporting language | English (for headings and technical terms) |

---

## 3. Non-Negotiable Rules

These rules cannot be relaxed under any circumstance:

1. The page is **not** an e-commerce store. No cart, no checkout, no "Buy Now", no "Add to Order", no consumer pricing language, no product ratings, no "people also viewed".
2. The quotation is issued by **Delight Factory**. Tech Edge appears only in the footer and a small "Digital Experience by Tech Edge" mark.
3. All prices are **bulk manufacturing prices** ex-factory. They are **not** retail prices.
4. Prices **exclude VAT**. This must be visible in the hero, in the table footer, and in the commercial terms.
5. Prices **exclude packaging, filling, labeling, printing, cartons, and external supplies**. This must be stated explicitly.
6. The official quotation total (503,125 EGP) must never be overwritten silently. **In v1.0 there are no reviewed prices at all.**
7. A future official change requires a new **Quotation Version** (e.g., v2.0). The system must be capable of showing version history without altering history.
8. RTL is the primary direction. The layout must work in true RTL — not mirrored LTR with Arabic text.
9. Arabic copy must be formal, commercially precise, and free of consumer-marketing slang.
10. The page must be fully responsive and printable to a clean A4 PDF.
11. The page must carry `noindex, nofollow, noarchive, nosnippet` meta tags. Search engines must never index it.
12. OG/Twitter share previews must NOT reveal financial figures or product-level pricing.

---

## 4. UX Principles

### The 10-Second Rule

Within the first 10 seconds, the visitor must be able to answer:

1. Who issued this quotation? → Delight Factory
2. Who is it addressed to? → EQ Store
3. What is the total? → 503,125 EGP
4. What is being supplied? → Bulk liquid car care products, ex-factory
5. Why is this allocation strategic? → Top three categories visible at a glance
6. Until when is it valid? → 3 business days, with computed expiry date

### Information Hierarchy

- Headline financial figures (total, KPIs) take visual priority over decorative elements.
- Strategic narrative comes **before** detailed product tables.
- Long product descriptions live inside cards with tabs — never as walls of text.
- Commercial terms are scannable: Accordion with the four most critical terms expanded by default.

### Progressive Disclosure

- Product cards expose role, KPIs, and short message immediately.
- Detailed copy (strategic role, key strengths, inclusion reason) appears via tabs inside the card.
- The Live Budget Monitor in v1.0 is a single locked-state component. No reviewed prices, no comparison tables, no future-state UI in v1.0.
- The Production Tracker is shown as a Locked Preview until quotation approval.

### Trust Engineering

- Show the Raw Material Review timeline as a **historical transparency feature**. This single section signals manufacturer-grade transparency that competitors do not provide.
- The timeline shows **review dates only** — it does **not** imply that the quoted price has changed.
- Always show the quotation version (v1.0) near every major financial figure.

---

## 5. Visual Principles

### Concept: "Liquid Graphite"

The visual identity is inspired by the Graphite product itself — a noble metal: deep, quiet luminance, never flashy. Avoid two failure modes: generic SaaS dashboards and clichéd automotive (chrome + racing red).

### Color Palette (Final)

| Token | Hex | Usage |
|---|---|---|
| `--bg-base` | `#0A0E13` | Page background |
| `--bg-elevated` | `#141921` | Cards |
| `--bg-overlay` | `#1C232E` | Modals, hover states |
| `--gold-primary` | `#C9A961` | Financial totals, premium highlights |
| `--gold-secondary` | `#8B6F3D` | Premium card borders |
| `--text-primary` | `#E8E6E1` | Main text |
| `--text-secondary` | `#8A8B8E` | Labels, descriptions |
| `--accent-positive` | `#6B8E6F` | Stable, completed |
| `--accent-warning` | `#C9924A` | "+8%" Super Nova review note alert |
| `--accent-negative` | `#9C5141` | Reserved for future use only |
| `--accent-tech` | `#4A8B96` | Tech Edge–only elements (footer mark) |

**Forbidden:** racing red, chrome gradients, neon, glassmorphism over busy photos.

### Typography

- Arabic primary: **IBM Plex Sans Arabic** (400 / 600 / 700)
- English headings: **Inter** (500 / 600)
- Financial numbers (totals, prices): **JetBrains Mono** in 600 — gives an "engineering precision" feel and visually separates money from prose.
- Always use Latin digits for currency to maintain financial clarity.

### Cards (Glassmorphism, Restrained)

```css
background: rgba(28, 35, 46, 0.7);
backdrop-filter: blur(20px);
border: 1px solid rgba(201, 169, 97, 0.15);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
border-radius: 16px;
```

Premium card (Graphite): wider border (1.5px), subtle gold glow, "Premium" badge in corner.

### Charts

- Donut chart for category allocation: gaps of 4px, percentages centered, hover reveals products.
- Progress bars: 6px height, champagne→bronze gradient fill, ease-out animation on enter.
- Timeline: circular nodes with concentric rings, dashed connector line, soft amber dot for review notes.

### Animation

- Section entrance: fade + 16px translateY, 600ms ease-out, triggered via IntersectionObserver. **Once only.**
- Financial counter: 0 → final value, 1.2s, easeOutExpo, **once only**.
- Card hover: lift 4px, increase border-glow opacity. 200ms.
- Donut: stroke-dasharray draw-in on first reveal.
- **Forbidden:** parallax, scrolljacking, animations longer than 800ms (except the finance counter at 1.2s), infinite loops, decorative motion.

---

## 6. Data Rules

### Single Source of Truth

All quotation data lives in:

```
src/data/quotationData.ts
```

The file exports:
- `quotationMeta` — version, issue date, validity, delivery terms, VAT/packaging flags
- `issuer`, `client`, `digitalExperience`
- `categories` — keyed map of categories with labels and accent colors
- `products` — array of product records (see schema below)
- `productionStages` — ordered list of 8 stages
- `commercialTerms` — array with priority field
- `selectors` — pure functions that compute totals, allocations, and budget impact

### Calculation Rule

**Every total displayed in the UI must be computed from `quotationData.ts`.** No hardcoded duplicates of "503,125", "3,625", etc. anywhere in components. If the data file changes, the UI updates everywhere.

### Product Schema

Each product must include:
- `id`, `order` (strategic display order)
- `nameEn`, `nameAr`, `category`, `role`, `roleLabelAr`
- `quantityKg`, `pricePerKg`, `totalValue`
- `strategicRole`, `keyStrengths` (string[]), `inclusionReason`, `shortMessage`
- `rawMaterialReview` (date, note, optional trend indicator + percent)
- `currentReviewedPrice` (nullable — null means no review yet; **always null in v1.0**)
- `reviewedAt`, `reviewNote` (nullable)
- `productionStatus`, `productionLastUpdate`

---

## 7. Pricing & Versioning Rules

1. The official quotation is **Version 1.0**, total **503,125 EGP**, fixed for the validity window.
2. **In v1.0, every product MUST have `currentReviewedPrice === null`.** No reviewed prices exist in the v1.0 release.
3. The Live Budget Monitor in v1.0 renders **only the Locked State** — no comparison tables, no estimated totals, no budget impact figures.
4. The Locked State message must read (Arabic, with English subtext):
   - **AR:** "حالة العرض: مغلق على الإصدار 1.0 — جميع الأسعار مثبتة وفقًا للعرض الرسمي الصادر بتاريخ 29 أبريل 2026"
   - **EN:** "Quotation v1.0 Locked — All prices shown are the official issued quotation prices."
5. The Locked State must explain — in plain Arabic — that future reviewed prices, if introduced, will appear as non-binding estimates and will never alter the issued quotation total without a new version.
6. Any future change to the quoted price requires bumping `quotationMeta.version` to v2.0+ and is the **only** path to officially altering the total.
7. The Raw Material Review Timeline shows **review dates only**. It does NOT imply the quoted price has changed. Trend indicators (e.g., "Super Nova +8%" reflecting raw-material cost movement) are informational transparency notes, not price changes.
8. The historical quoted price must never be deleted or overwritten — only annotated.

---

## 8. Component Requirements

### Required Components (named, single-purpose)

```
StickyTopBar
QuotationHero
ExecutiveMetrics + KpiCard
StrategicAllocation + BudgetDonutChart + AllocationStory
OfficialQuotationTable + QuotationTableRow + QuotationTableTotal
ProductStorytellingGrid + ProductCard + ProductCardKpis + ProductCardTabs + ProductRoleBadge
RawMaterialTimeline + TimelineNode
LiveBudgetMonitor (renders BudgetMonitorLocked in v1.0)
ProductionTracker + TrackerLockedPreview + ProductionStageItem
CommercialTerms + TermAccordionItem
NextStepsSection + NextStepCard
FooterBranding
```

### Shared Primitives

- `GlassCard` — the only card primitive; ensures consistent glassmorphism.
- `AnimatedNumber` — financial counter, runs once on enter.
- `CategoryBadge` — small pill with category accent color.
- `TrendBadge` — +%, stable, or − with appropriate semantic color (used only on the Raw Material Timeline in v1.0).
- `GoldDivider` — gradient hairline divider.
- `PrintPdfButton` — triggers print via `window.print()` from the `/print` route or via a print-friendly stylesheet.

### Product Card Spec

Each product card must render:
- Order number (in a metallic circle)
- Product name (Arabic primary, English secondary)
- Category badge
- Role badge (Hero / Premium / Support / Specialized / Consumable)
- 3 KPIs in a row: Quantity, Price/kg, Total
- 3 tabs: الدور / نقاط القوة / سبب الإدراج
- Short message (1 sentence)

Long descriptions must live inside tabs, not exposed by default.

---

## 9. RTL & Arabic Requirements

1. Set `dir="rtl"` and `lang="ar"` at the root.
2. Use logical CSS properties (`margin-inline-start`, `padding-inline-end`) — never hard `margin-left/right`.
3. Numbers and currency use Latin digits in `direction: ltr` inline span when embedded in Arabic text, to prevent ambiguous rendering.
4. Tables: column order should read right-to-left. The first visual column (rightmost) is "م" (sequence number).
5. Icons that imply direction (arrows, chevrons) must flip in RTL.
6. All Arabic typography uses IBM Plex Sans Arabic. Avoid fonts without proper Arabic kerning.
7. Punctuation between Arabic and English must be handled — use a thin space, not a regular space, when transitioning between scripts.
8. Avoid italic Arabic — Arabic typography does not use italics; use weight changes instead.

---

## 10. Responsive Requirements

- Mobile-first. Every component must render correctly at 360px viewport width.
- KPI cards: 6-up on desktop, 3-up on tablet, 2-up on small mobile, never 1-up unless screen <320px.
- Tables transform into stacked cards on viewports <768px.
- Donut chart shrinks but never below 220px diameter; legend wraps below.
- Sticky top bar collapses to: total + expiry only on mobile.
- Tabs inside product cards become a segmented control on mobile.
- Timeline becomes vertical on mobile.
- Touch targets ≥44px. No hover-only interactions.

---

## 11. Print / PDF Mode

- Provide either a dedicated `/print` route that renders `PrintLayout`, **or** a comprehensive `@media print` stylesheet — the implementer may choose, as long as the printed result is clean.
- A "تنزيل PDF / طباعة" button is exposed in the StickyTopBar; it triggers `window.print()`.
- Printed version must:
  - Use white background, black text, gold accents only for totals.
  - Show all sections **except** the Live Budget Monitor and Production Tracker.
  - Include header on every page: Issuer / Client / Version / Date.
  - Include footer on every page: page X of Y / "Issued by Delight Factory".
  - Fit cleanly to A4.

---

## 12. SEO / Privacy Rule (CRITICAL)

This page contains live commercial pricing for a named client. It is shareable by link but **must not be discoverable** through search engines or via leaked link previews.

### Required Implementation

1. **HTML meta tags in `<head>`:**
   ```html
   <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
   <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
   ```

2. **`vercel.json` headers** (all routes):
   ```
   X-Robots-Tag: noindex, nofollow, noarchive, nosnippet
   X-Frame-Options: SAMEORIGIN
   Referrer-Policy: no-referrer
   X-Content-Type-Options: nosniff
   ```

3. **`public/robots.txt`:**
   ```
   User-agent: *
   Disallow: /
   ```

4. **OG / Twitter share preview:** must use a **generic** card with no financial data:
   - Title: "EQ Store × Delight Factory — Manufacturing Quotation"
   - Description: "Private commercial document. Not for public distribution."
   - No total, no product list, no price hints.
   - Use a dark abstract OG image (no figures).

---

## 13. Live Budget Monitor — Behavior in v1.0 (LOCKED)

- Renders **only** the Locked State component. No comparison table, no estimated totals, no impact figures, no toggle.
- The Locked component must clearly state in Arabic and English:
  - "حالة العرض: مغلق على الإصدار 1.0"
  - "جميع الأسعار مثبتة وفقًا للعرض الرسمي الصادر بتاريخ 29 أبريل 2026"
  - "Quotation v1.0 Locked — All prices shown are the official issued quotation prices."
- Must include a short paragraph explaining the future-state contract:
  - "أي تحديث مستقبلي في تكلفة الخامات سيظهر هنا كتقدير غير ملزم. لن يتغير الإجمالي الرسمي إلا بإصدار نسخة جديدة معتمدة."
- The component **must not** display any reviewed/estimated price in v1.0 — even hidden behind a toggle. The unlocked variant exists only in code, deactivated.

---

## 14. Production Tracker — Behavior in v1.0

- Renders as a **Locked Preview** with a frosted overlay.
- Overlay text (AR): "يُفعّل بعد اعتماد العرض — متابعة 8 مراحل لكل منتج: العرض، العينات، العبوات، الخامات، الإنتاج، الجودة، التجهيز، التسليم."
- Behind the overlay: a static preview of the 8-stage timeline so the visitor understands what they will get.
- After approval (status changes), the overlay is removed and statuses become live.

---

## 15. What Not To Do

- Do not present this as a store, catalog, or order form.
- Do not add any consumer commerce element (cart, ratings, reviews, "people also bought").
- Do not show Tech Edge branding above or equal in size to Delight Factory.
- Do not silently alter the quoted total when reviewed prices appear.
- Do not present any reviewed/estimated price in v1.0 — even labeled as estimate.
- Do not animate financial counters more than once per session.
- Do not hide critical commercial terms (VAT exclusion, packaging exclusion) inside collapsed accordions only — they must also appear near the hero.
- Do not use racing red, chrome gradients, or playful illustrations.
- Do not use generic SaaS templates or kit-style components without restyling.
- Do not break Arabic typography by using a non-Arabic font fallback.
- Do not allow horizontal scrolling on the page itself (only inside tables on mobile, by design).
- Do not omit `noindex, nofollow, noarchive, nosnippet`.
- Do not include client name or pricing in OG/Twitter share previews.

---

## 16. QA Checklist (Before Delivery)

### Identity & Legal
- [ ] Page clearly states "Issued by Delight Factory for Car Care Products".
- [ ] Client name "EQ Store" is visible in the hero.
- [ ] Quotation Version 1.0 is shown near the total.
- [ ] Issue date and computed expiry date (4 May 2026) are visible.
- [ ] Footer states: "Issued by Delight Factory · Digital Experience by Tech Edge".

### Financial Accuracy
- [ ] Total displayed matches `selectors.totalQuotationValue()` and equals 503,125.
- [ ] Total quantity matches 3,625 kg.
- [ ] Each product's total = quantity × price/kg (verify each row).
- [ ] Category allocation percentages sum to 100% (allow ±0.1% rounding).
- [ ] No hardcoded financial figures exist outside `quotationData.ts`.

### Commercial Disclosures
- [ ] "غير شامل ضريبة القيمة المضافة" appears in hero AND in table footer AND in commercial terms.
- [ ] "غير شامل التعبئة والتغليف" appears in hero AND in commercial terms.
- [ ] "Bulk تسليم مصنع ديلايت" appears in hero.
- [ ] "صلاحية 3 أيام عمل" appears in hero with computed expiry date.

### Pricing Integrity
- [ ] Live Budget Monitor renders Locked State in v1.0 with NO reviewed prices visible.
- [ ] No `currentReviewedPrice` value exists in `quotationData.ts` (all null).
- [ ] Quoted total never updates anywhere.

### Production Tracker
- [ ] Renders as Locked Preview with overlay.
- [ ] Preview shows the 8 stages clearly.
- [ ] Overlay copy explains activation condition.

### RTL & Arabic
- [ ] `dir="rtl"` and `lang="ar"` at root.
- [ ] All tables read right-to-left correctly.
- [ ] Arabic text renders in IBM Plex Sans Arabic.
- [ ] Numbers display in Latin digits with correct LTR isolation inside Arabic strings.
- [ ] Direction-sensitive icons are mirrored.

### Responsive
- [ ] No horizontal scrolling at 360px width.
- [ ] Sticky top bar is readable on mobile.
- [ ] Tables stack into cards on <768px.
- [ ] Touch targets ≥44px.
- [ ] Donut chart legend wraps cleanly on mobile.

### Performance
- [ ] Lighthouse Performance ≥90 on mobile.
- [ ] No layout shift on load (CLS <0.1).
- [ ] Animations run at 60fps.
- [ ] Initial JS bundle <200KB gzipped.

### Print
- [ ] Print mode renders without dashboard chrome.
- [ ] Page breaks fall between sections, not inside product cards or tables.
- [ ] Print output fits A4 with margins.
- [ ] Live Budget Monitor and Production Tracker are excluded from print.
- [ ] Header and footer repeat on every page.

### SEO / Privacy
- [ ] `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />` present.
- [ ] `vercel.json` includes `X-Robots-Tag` header.
- [ ] `public/robots.txt` blocks all crawlers.
- [ ] OG/Twitter card contains no financial figures or product list.

### Anti-Patterns
- [ ] No cart, no checkout, no consumer commerce language anywhere.
- [ ] Tech Edge appears only in footer (small, elegant).
- [ ] No racing red, chrome, or playful illustrations.
- [ ] No hardcoded financial duplicates outside data file.

### Build
- [ ] `npm run build` succeeds with no TypeScript errors and no warnings.
- [ ] `npm run preview` shows the production build correctly.
- [ ] Vercel preview deployment succeeds.

---

## 17. Deployment

- Stack: React 18 + TypeScript + Vite + Tailwind CSS.
- Hosting: Vercel (production) with preview environments per branch.
- Environment: zero backend, zero authentication, zero analytics in v1.0.
- Asset optimization: SVGs inline where possible; images served as AVIF with WebP fallback.
- The repo must be private and include this skill file at the root.
- `vercel.json` at the root must enforce security headers per Section 12.

---

## 18. Implementation Workflow

The implementing agent (Antigravity, Claude, or other) should:

1. Read this file in full.
2. Read `eq_store_live_quotation_full_brief.md` in full.
3. Build the project end-to-end in internal phases — **do not** pause for confirmation between phases.
4. Pause only if a true blocker is encountered: data ambiguity, missing requirement, or rule conflict.
5. After completion, run `npm run build`, walk through every QA checklist item in Section 16, and produce a delivery report listing:
   - Sections implemented
   - QA items passed/failed
   - Any remaining notes or recommendations for v2.0

---

*This file is the source of truth. If anything in implementation conflicts with this file, this file wins.*
