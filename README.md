# AURAELIA — Haute Cellular Skincare & 3D Luxury E-Commerce

> **"BEAUTY, REIMAGINED."**  
> *Discover the science of skincare. Experience the art of beauty.*

A world-class, ultra-modern, next-generation 3D luxury cosmetics digital flagship. Designed and engineered without generic templates, focusing exclusively on clinical cellular formulations, refractive glass vessels, botanical extracts, and interactive 3D WebGL experiences.

---

## 💎 1. Art Direction & Visual Identity

- **Aesthetic**: Futuristic luxury beauty house, Swiss cleanroom precision meets sovereign sensory sanctuary.
- **Palette**:
  - Warm Ivory (`#FAF8F5`)
  - Champagne Gold (`#D4AF37`, `#C5A059`)
  - Soft Beige (`#E7DFD5`, `#D6CABE`)
  - Deep Espresso & Obsidian Noir (`#0F0D0C`, `#1A1615`)
  - Muted Bronze (`#A68A68`, `#7D6346`)
- **Typography**:
  - Headings: Editorial serif (*Cormorant Garamond*, *Cinzel*)
  - Body & UI: Crisp contemporary sans (*Plus Jakarta Sans*)
  - Technical Data & Matrices: Monospace (*JetBrains / System Mono*)
- **STRICT VISUAL REQUIREMENT**: 
  - **Zero human models anywhere on the site**.
  - All visual storytelling highlights heavy apothecary glass, amber dropper flasks, cold-pressed golden nectars, whipped cloud-creme swirls, botanical succulents, and cryogenic instruments.

---

## ✨ 2. Key Architecture & Features

### A. Hero Experience (WOW 3D Bottle)
- Full-screen cinematic opening featuring an interactive **Three.js procedural glass serum bottle** (`LuxuryBottle3D`).
- Physically accurate refractive glass transmission (`ior: 1.52`, thickness, roughness), floating liquid core with subtle rotational swirl, 24K gold dropper cap, floating micro-droplets and ambient golden particles.
- Real-time vessel material selector:
  - **24K Solar Gold**
  - **Rose Nectar**
  - **Obsidian Noir**
  - **Pure Platinum**
- Oversized editorial typography with live CTAs and clinical stats (+48% Dermal Collagen, 99.4% Purity, 14-Day Cycle).

### B. Featured Collections
- 7 core disciplines:
  1. *Skincare* (Foundational Cellular Bio-Technology)
  2. *Cleansers* (Hydrophilic Botanical Purification)
  3. *Serums* (Concentrated Micro-Crystalline Actives)
  4. *Moisturizers* (Biomimetic Lipid Sculpting)
  5. *Sunscreen* (Cashmere Photonic Defense SPF 50+)
  6. *Face Masks* (Nocturnal Sanctuary & Cryo Wraps)
  7. *Beauty Essentials* (Cryogenic & Sculptural Instruments)
- Interactive hover cards with live formulation counters and smooth zoom transitions.

### C. Featured Products Catalog
- Tabbed filters (All, Triskin, Serums, Moisturizers, Cleansers, Sunscreen, Face Masks, Beauty Essentials).
- Realtime sorting: Curated Sovereign, Price: Low to High, Price: High to Low, Highest Clinical Rating.
- Product cards with tags (Best Seller, Award Winner, Cellular Exclusive), volume, pricing, wishlist toggle, and quick add.

### D. Interactive Product Discovery (Functional Search Engine)
- Functional, instant search with real-time matching.
- **Search "Triskin"** displays all matching Triskin formulations (Triskin Cellular Renewal Elixir, Triskin Peptide Infusion Cream, Triskin Hydra-Barrier Essence, Triskin Botanical Cleansing Elixir, Triskin Cryo-Sculpting Facial Wand, Triskin Resurfacing Botanical Pads).
- Real-time search suggestions chips, category pills, and interactive max-price range slider.

### E. 3D Product Showcase & Vessel Customizer
- Dedicated 360-degree interactive 3D laboratory viewer (`ShowcaseViewer3D`).
- OrbitControls with smooth damping and drag-to-rotate.
- Studio lighting toggle: **Studio Warm**, **Dramatic Chiaroscuro**, and **Ethereal Moonlight**.
- Live active compound table with molecular delivery percentages.

### F. Ingredients & Cellular Science
- Deep-dive into 5 pharmaceutical-grade actives:
  - **Hyaluronic Acid** (Tri-Molecular Bio-Matrix, `(C14H21NO11)n`)
  - **Vitamin C** (Lipid-Soluble THD Ascorbate, `C38H68O10`)
  - **Niacinamide** (99.4% Pure Nicotinamide, `C6H6N2O`)
  - **Aloe Vera Polysaccharides** (Acemannan Cryo-Veil)
  - **Retinaldehyde** (Micro-Encapsulated Retinal, `C20H28O`)
- Molecular formula badges, extraction origins, cellular mechanisms, and documented clinical trials.

### G. Brand Story & Haute Manifesto
- The Cellular Symphony: Philosophy of biocompatible cellular messaging vs. harsh abrasives.
- Cleanroom cryogenic extraction at -40°C in the Swiss Valais.
- 100% circular, heavy apothecary glass vessels.

### H. Best Sellers Carousel
- Horizontal smooth-scrolling carousel spotlighting acclaimed awards and customer favorites.

### I. Minimalist VIP Newsletter
- Instant interactive invitation with code generator (`AURA20` for 20% off).

### J. Shopping Bag & Wishlist Systems
- **Slide-Over Shopping Bag (`CartDrawer`)**:
  - Live progress bar toward complimentary express courier ($150 threshold).
  - Item volume selection, quantity increment/decrement, and deletion.
  - Promo code validation (`AURA20`).
  - Complimentary Sovereign wooden gift packaging toggle.
  - Simulated **Sovereign Checkout** with cryogenic cold-chain order confirmation modal.
- **Slide-Over Wishlist (`WishlistDrawer`)**:
  - Saved formulations with "Move to Bag" and "Add All to Bag" actions.
- **Global Search Modal (`GlobalSearchModal`)**:
  - Accessible via `⌘K` or top navigation search icon.

---

## 🛠️ 3. Technology Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Language**: TypeScript 5.7
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: Context API (`CartContext`, `WishlistContext`) with LocalStorage persistence

---

## 🚀 4. How to Run Locally

### Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build Production Bundle
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 📜 5. Client Presentation Checklist

- [x] Full-screen WOW Hero with 3D glass serum bottle & editorial headline "BEAUTY, REIMAGINED."
- [x] Zero human models across all imagery and assets (bottles, textures, and botanicals only)
- [x] Cinematic 3D interactive vessel customizer (Gold, Rose Gold, Obsidian Noir, Pure Platinum)
- [x] Functional search engine (searching "Triskin" brings up matching Triskin products)
- [x] Working cart drawer with quantity controls, free shipping tracker, and promo code `AURA20`
- [x] Working wishlist drawer
- [x] Detailed product modal with active compounds, clinical claims, and ingredients
- [x] Molecular ingredient science explorer with chemical formulas
- [x] Best sellers carousel & brand story editorial
- [x] Responsive layout on mobile, tablet, and desktop
- [x] Clean TypeScript build with zero errors
