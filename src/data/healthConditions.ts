export interface HealthCondition {
  id: string;
  name: string;
  keywords: string[];
  category: 'Inflammatory' | 'Barrier & Hydration' | 'Pigmentary' | 'Aging & Texture' | 'Sensitivity';
  symptoms: string[];
  explanation: string;
  recommendedActiveIngredients: string[];
  productIds: string[];
}

export const HEALTH_CONDITIONS: HealthCondition[] = [
  {
    id: 'acne-breakouts',
    name: 'Acne Vulgaris & Clogged Pores',
    keywords: ['acne', 'pimple', 'pimples', 'breakout', 'breakouts', 'blackhead', 'whitehead', 'cystic', 'clogged', 'pores', 'sebum', 'oily'],
    category: 'Inflammatory',
    symptoms: ['Inflammatory blemishes', 'Excess sebum production', 'Clogged follicles', 'Red tenderness'],
    explanation: 'Acne occurs when excess sebum and dead corneocytes trap bacteria in follicles. Clinical treatment requires gentle enzymatic cleansing, sebum regulation via Niacinamide, and non-comedogenic hydration.',
    recommendedActiveIngredients: ['Niacinamide (Vitamin B3)', 'Amino Acids', 'PHA Gluconolactone', 'Centella Asiatica'],
    productIds: ['lumiere-gentle-gel-cleanser', 'lumiere-lavender-calming-toner', 'lumiere-hydra-glow-serum', 'triskin-resurfacing-glycolic-pad'],
  },
  {
    id: 'eczema-dermatitis',
    name: 'Eczema & Atopic Dermatitis',
    keywords: ['eczema', 'dermatitis', 'atopic', 'itchy', 'itching', 'dry patches', 'flaking', 'flaky', 'cracked skin', 'chapped'],
    category: 'Barrier & Hydration',
    symptoms: ['Intense itching', 'Severe moisture loss', 'Cracked lipid barrier', 'Rough scaly plaques'],
    explanation: 'Atopic dermatitis stems from a genetic or acquired deficit in stratum corneum ceramides. Restoring lipid intercellular cement with bio-identical ceramides and plant squalane calms neuro-sensory itch.',
    recommendedActiveIngredients: ['Multi-Ceramide Matrix (NP, AP, EOP)', 'Plant Squalane', 'Centella Asiatica', 'Colloidal Lipids'],
    productIds: ['lumiere-cloud-moisturizer', 'triskin-peptide-infusion-cream', 'bio-nectar-aloe-calming-mist', 'aurora-botanical-infusion-oil'],
  },
  {
    id: 'rosacea-redness',
    name: 'Rosacea & Persistent Erythema',
    keywords: ['rosacea', 'redness', 'erythema', 'flushing', 'broken capillaries', 'vascular', 'spider veins', 'blushing', 'burning'],
    category: 'Sensitivity',
    symptoms: ['Persistent central facial redness', 'Visible dilated micro-capillaries', 'Stinging and burning upon product application'],
    explanation: 'Rosacea involves hyper-reactive dermal vasculature and neurogenic inflammation. Calming cold-chain botanicals, 100% mineral non-nano zinc, and Madecassoside reduce thermal skin sensation.',
    recommendedActiveIngredients: ['Pure Non-Nano Zinc Oxide', 'Madecassoside', 'Organic Lavender Hydrosol', 'Bisabolol'],
    productIds: ['lumiere-mineral-invisible-sunscreen', 'bio-nectar-aloe-calming-mist', 'lumiere-lavender-calming-toner', 'lumiere-cloud-moisturizer'],
  },
  {
    id: 'hyperpigmentation-melasma',
    name: 'Melasma & Hyperpigmentation',
    keywords: ['melasma', 'pigmentation', 'dark spots', 'sun spots', 'age spots', 'post acne marks', 'discoloration', 'uneven skin tone', 'freckles'],
    category: 'Pigmentary',
    symptoms: ['Brown/gray pigment patches', 'Sun-induced melanin clusters', 'Post-inflammatory hyperpigmentation (PIH)'],
    explanation: 'Melasma results from hyperactive melanocytes triggered by UV, visible blue light, and hormonal fluctuations. Lipid-soluble Vitamin C (THD Ascorbate) and 100% physical mineral SPF block melanogenesis.',
    recommendedActiveIngredients: ['THD Ascorbate (Lipid Vitamin C)', 'Niacinamide 5%', 'Broad-Spectrum Mineral Zinc SPF 50+', 'Galactomyces Ferment'],
    productIds: ['lumiere-mineral-invisible-sunscreen', 'lumiere-gold-radiance-serum', 'lumiere-hydra-glow-serum', 'triskin-resurfacing-glycolic-pad'],
  },
  {
    id: 'severe-dryness-barrier',
    name: 'Compromised Skin Barrier & Severe Xerosis',
    keywords: ['dry', 'dryness', 'xerosis', 'dehydrated', 'tightness', 'peeling', 'stinging', 'parched', 'barrier damage', 'rough'],
    category: 'Barrier & Hydration',
    symptoms: ['Skin feels tight after washing', 'Visible peeling and rough texture', 'Micro-stinging with standard water or creams'],
    explanation: 'When the stratum corneum lipid matrix is compromised, trans-epidermal water loss (TEWL) accelerates rapidly. Multi-depth hyaluronic acid inflates cells while ceramide complexes seal the surface.',
    recommendedActiveIngredients: ['Tri-Molecular Hyaluronic Acid', 'Bio-Identical Ceramides', 'Squalane', 'Ectoin Stress Molecule'],
    productIds: ['lumiere-hydra-glow-serum', 'lumiere-cloud-moisturizer', 'triskin-hydra-barrier-essence', 'lumina-hydra-barrier-gel-mask'],
  },
  {
    id: 'fine-lines-wrinkles',
    name: 'Fine Lines, Loss of Firmness & Wrinkles',
    keywords: ['wrinkles', 'wrinkle', 'fine lines', 'aging', 'anti-aging', 'sagging', 'loose skin', 'loss of firmness', 'crow feet', 'laugh lines'],
    category: 'Aging & Texture',
    symptoms: ['Loss of dermal elasticity', 'Expression wrinkles on forehead/eyes', 'Slackened jawline definition'],
    explanation: 'Natural aging and UV exposure deplete collagen and elastin fibers. Signal peptides (GHK-Cu & Peptide-38) alongside time-released encapsulated Retinal reactivate fibroblasts for dense, firm tissue.',
    recommendedActiveIngredients: ['Encapsulated Retinaldehyde', 'Signal Peptide-38', 'Copper Tripeptide-1', 'Colloidal Gold Bio-Vectors'],
    productIds: ['lumiere-overnight-repair-cream', 'triskin-cellular-renewal-elixir', 'triskin-peptide-infusion-cream', 'triskin-cryo-contour-wand'],
  },
  {
    id: 'puffy-eyes-dark-circles',
    name: 'Periorbital Puffiness & Dark Under-Eye Shadows',
    keywords: ['dark circles', 'puffy eyes', 'eye bags', 'under eye', 'puffiness', 'eye fatigue', 'droopy eyes', 'swollen eyes'],
    category: 'Sensitivity',
    symptoms: ['Morning fluid retention under eyelids', 'Venous pooling dark shadows', 'Fine crêpey orbital skin'],
    explanation: 'The periorbital zone has the thinnest skin on the body with sluggish lymphatic flow. Cryogenic vasoconstriction combined with topical caffeine and tetrapeptides eliminates fluid retention in minutes.',
    recommendedActiveIngredients: ['Green Coffee Caffeine', 'Cryo-Thermal Stainless Steel', 'Acetyl Tetrapeptide-5', 'Hyaluronic Acid'],
    productIds: ['lumiere-eye-lift-peptide-gel', 'triskin-cryo-contour-wand', 'lumiere-hydra-glow-serum'],
  },
  {
    id: 'psoriasis-flaking',
    name: 'Psoriasis & Scaly Plaques',
    keywords: ['psoriasis', 'scales', 'scaly', 'thick skin', 'plaque', 'silvery scales', 'hyperkeratosis'],
    category: 'Inflammatory',
    symptoms: ['Elevated scaly red plaques', 'Rapid epidermal cell turnover', 'Thickened dry stratum corneum'],
    explanation: 'Psoriasis triggers excessive epidermal cell production. Gentle lipid-replenishing botanical nectars rich in Omega-7 and cold-pressed squalane soften plaques and soothe itching without harsh corticosteroids.',
    recommendedActiveIngredients: ['Wild Seabuckthorn CO2 (Omega-7)', 'Cold-Pressed Squalane', 'Pure Aloe Polysaccharides', 'Ceramides'],
    productIds: ['aurora-botanical-infusion-oil', 'lumiere-cloud-moisturizer', 'bio-nectar-aloe-calming-mist'],
  },
  {
    id: 'sun-damage-burn',
    name: 'Sunburn & UV Photo-Stress',
    keywords: ['sunburn', 'sun damage', 'tan', 'tanning', 'uv damage', 'heat rash', 'hot skin', 'sun exposure', 'photo damage'],
    category: 'Sensitivity',
    symptoms: ['Erythema and skin warmth from solar exposure', 'Dehydration and cellular DNA stress', 'Accelerated freckling'],
    explanation: 'Excessive ultraviolet radiation breaks down cellular DNA and causes thermal injury. Immediate application of cold acemannan aloe hydrosols and subsequent mineral barrier defense accelerates recovery.',
    recommendedActiveIngredients: ['Cold-Pressed Organic Aloe', 'Non-Nano Zinc SPF 50+', 'Ectoin Extremo-Protector', 'Centella Asiatica'],
    productIds: ['bio-nectar-aloe-calming-mist', 'lumiere-mineral-invisible-sunscreen', 'lumina-hydra-barrier-gel-mask', 'lumiere-hydra-glow-serum'],
  },
  {
    id: 'dullness-fatigue',
    name: 'Skin Fatigue & Lack of Radiance (Dull Skin)',
    keywords: ['dull', 'dullness', 'tired skin', 'lack of glow', 'ashen', 'smoker skin', 'flat tone', 'glow'],
    category: 'Barrier & Hydration',
    symptoms: ['Lack of natural light reflection', 'Ashen or yellowish undertone', 'Rough, uneven surface reflecting light poorly'],
    explanation: 'Dullness occurs when dead cells accumulate on the surface and micro-circulation slows down. Gentle PHA/glycolic resurfacing combined with photonic 24K gold and Vitamin C restores an instant healthy candlelit glow.',
    recommendedActiveIngredients: ['THD Ascorbate (Vitamin C)', 'Galactomyces Bio-Ferment', 'Glycolic & Lactic Acids', '24K Colloidal Gold'],
    productIds: ['lumiere-gold-radiance-serum', 'lumiere-hydra-glow-serum', 'triskin-resurfacing-glycolic-pad', 'triskin-hydra-barrier-essence'],
  },
];
