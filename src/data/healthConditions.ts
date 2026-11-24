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
    explanation: 'Acne occurs when excess sebum and dead skin cells clog follicles. Grace Beauty Store recommends Heartleaf TECA calming ampoules, Azelaic Acid, and gentle non-stripping AHA/BHA pore pads.',
    recommendedActiveIngredients: ['Houttuynia Cordata (Heartleaf)', 'TECA Centella', '10% Azelaic Acid', '10% Niacinamide + Zinc', 'BHA & AHA'],
    productIds: ['abib-heartleaf-teca-capsule-serum', 'anua-azelaic-acid-10-serum', 'the-ordinary-niacinamide-10-zinc-1', 'medicube-zero-pore-pad-2'],
  },
  {
    id: 'eczema-dermatitis',
    name: 'Eczema & Atopic Dermatitis',
    keywords: ['eczema', 'dermatitis', 'atopic', 'itchy', 'itching', 'dry patches', 'flaking', 'flaky', 'cracked skin', 'chapped'],
    category: 'Barrier & Hydration',
    symptoms: ['Intense itching', 'Severe moisture loss', 'Cracked lipid barrier', 'Rough scaly plaques'],
    explanation: 'Atopic dermatitis stems from compromised stratum corneum lipids. Snail mucin glycoproteins and gentle sub-acidic heartleaf toners replenish moisture without stinging.',
    recommendedActiveIngredients: ['92% Snail Secretion Filtrate', 'Heartleaf 77%', 'Biomimetic Micelles', 'Hyaluronic Acid'],
    productIds: ['cosrx-snail-92-all-in-one-cream', 'cosrx-advanced-snail-96-mucin-essence', 'anua-heartleaf-77-toner', 'bioderma-sensibio-h2o-micellar'],
  },
  {
    id: 'rosacea-redness',
    name: 'Rosacea & Persistent Erythema',
    keywords: ['rosacea', 'redness', 'erythema', 'flushing', 'broken capillaries', 'vascular', 'spider veins', 'blushing', 'burning'],
    category: 'Sensitivity',
    symptoms: ['Persistent facial flushing', 'Visible dilated micro-capillaries', 'Stinging and heat sensation upon skincare application'],
    explanation: 'Rosacea involves hyper-reactive dermal vasculature and neurogenic inflammation. Pure 10% Azelaic Acid, soothing Heartleaf, and non-nano Rice probiotics shield delicate micro-capillaries.',
    recommendedActiveIngredients: ['10% Azelaic Acid', 'Heartleaf (Houttuynia Cordata)', 'TECA Centella Extract', 'Rice Ferments SPF 50+'],
    productIds: ['anua-azelaic-acid-10-serum', 'abib-heartleaf-teca-capsule-serum', 'anua-heartleaf-77-toner', 'beauty-of-joseon-relief-sun'],
  },
  {
    id: 'hyperpigmentation-melasma',
    name: 'Melasma & Hyperpigmentation',
    keywords: ['melasma', 'pigmentation', 'dark spots', 'sun spots', 'age spots', 'post acne marks', 'discoloration', 'uneven skin tone', 'freckles'],
    category: 'Pigmentary',
    symptoms: ['Brown/gray pigment patches', 'Sun-induced melanin clusters', 'Post-inflammatory hyperpigmentation (PIH)'],
    explanation: 'Melasma results from hyperactive melanocytes triggered by UV radiation. High-purity 98% Glutathione encapsulated in exosome carriers combined with daily SPF 50+ provides clinically proven 161.88% pigment fading.',
    recommendedActiveIngredients: ['98% Pure Glutathione Nanocarriers', 'Niacinamide 5%', 'Vitamin C (Ascorbic Acid)', 'Rice Probiotics SPF 50+'],
    productIds: ['abib-glutathiosome-dark-spot-pad', 'abib-glutathiosome-dark-spot-serum', 'abib-flawless-glow-routine', 'beauty-of-joseon-relief-sun'],
  },
  {
    id: 'severe-dryness-barrier',
    name: 'Compromised Skin Barrier & Severe Xerosis',
    keywords: ['dry', 'dryness', 'xerosis', 'dehydrated', 'tightness', 'peeling', 'stinging', 'parched', 'barrier damage', 'rough'],
    category: 'Barrier & Hydration',
    symptoms: ['Skin feels tight after washing', 'Visible peeling and rough texture', 'Micro-stinging with standard water or creams'],
    explanation: 'When the lipid matrix is compromised, trans-epidermal water loss (TEWL) accelerates rapidly. Snail Secretion Filtrate and sub-acidic hydrating toners rebuild the protective moisture mantle.',
    recommendedActiveIngredients: ['96.3% Snail Secretion Filtrate', 'Panthenol (Pro-Vitamin B5)', 'Berry Fruit Complex', 'Sodium Hyaluronate'],
    productIds: ['cosrx-advanced-snail-96-mucin-essence', 'cosrx-snail-92-all-in-one-cream', 'anua-heartleaf-77-toner', 'laneige-lip-sleeping-mask-berry'],
  },
  {
    id: 'fine-lines-wrinkles',
    name: 'Fine Lines, Loss of Firmness & Wrinkles',
    keywords: ['wrinkles', 'wrinkle', 'fine lines', 'aging', 'anti-aging', 'sagging', 'loose skin', 'loss of firmness', 'crow feet', 'laugh lines'],
    category: 'Aging & Texture',
    symptoms: ['Loss of dermal elasticity', 'Expression wrinkles on forehead/eyes', 'Dull uneven skin texture'],
    explanation: 'Natural aging and UV exposure deplete collagen and moisture. Glutathione antioxidants, adenosine, and rich mucin repair complexes reactivate epidermal bounce and glass skin glow.',
    recommendedActiveIngredients: ['Glutathione Exosomes', 'Adenosine', 'Snail Glycoproteins', 'Multi-Vitamins'],
    productIds: ['abib-flawless-glow-routine', 'cosrx-advanced-snail-96-mucin-essence', 'cosrx-snail-92-all-in-one-cream', 'abib-glutathiosome-dark-spot-serum'],
  },
  {
    id: 'puffy-eyes-dark-circles',
    name: 'Periorbital Puffiness & Dark Under-Eye Shadows',
    keywords: ['dark circles', 'puffy eyes', 'eye bags', 'under eye', 'puffiness', 'eye fatigue', 'droopy eyes', 'swollen eyes'],
    category: 'Sensitivity',
    symptoms: ['Morning fluid retention under eyelids', 'Venous pooling dark shadows', 'Fine crêpey orbital and perioral skin'],
    explanation: 'The periorbital zone has ultra-thin skin susceptible to pigmentation and fatigue. High-potency Glutathiosome brightening drops and overnight antioxidant fruit complexes restore firm radiance.',
    recommendedActiveIngredients: ['Glutathiosome™ Vita Drop', 'Berry Fruit Complex', 'Ascorbic Acid', 'Adenosine'],
    productIds: ['abib-glutathiosome-dark-spot-serum', 'laneige-lip-sleeping-mask-berry', 'abib-glutathiosome-dark-spot-pad'],
  },
  {
    id: 'psoriasis-flaking',
    name: 'Psoriasis & Scaly Plaques',
    keywords: ['psoriasis', 'scales', 'scaly', 'thick skin', 'plaque', 'silvery scales', 'hyperkeratosis'],
    category: 'Inflammatory',
    symptoms: ['Elevated scaly red plaques', 'Rapid epidermal cell turnover', 'Thickened dry stratum corneum'],
    explanation: 'Psoriasis triggers excessive epidermal cell production. Gentle dermatological cleansing and rich snail mucin creams soothe localized flaking without aggressive irritants.',
    recommendedActiveIngredients: ['Snail Secretion Filtrate 92%', 'Heartleaf 77%', 'Biomimetic Micelles', 'Panthenol'],
    productIds: ['cosrx-snail-92-all-in-one-cream', 'anua-heartleaf-77-toner', 'bioderma-sensibio-h2o-micellar'],
  },
  {
    id: 'sun-damage-burn',
    name: 'Sunburn & UV Photo-Stress',
    keywords: ['sunburn', 'sun damage', 'tan', 'tanning', 'uv damage', 'heat rash', 'hot skin', 'sun exposure', 'photo damage'],
    category: 'Sensitivity',
    symptoms: ['Erythema and skin warmth from solar exposure', 'Dehydration and cellular DNA stress', 'Accelerated freckling'],
    explanation: 'Excessive ultraviolet radiation breaks down cellular DNA and causes acute thermal injury. Immediate application of cold heartleaf toner followed by SPF 50+ Rice sunscreen and Glutathiosome dark spot pads restores the complexion.',
    recommendedActiveIngredients: ['Heartleaf Extract 77%', 'SPF 50+ PA++++ Rice Sunscreen', '98% Glutathione Nanocarriers', 'Snail Mucin'],
    productIds: ['beauty-of-joseon-relief-sun', 'anua-heartleaf-77-toner', 'abib-glutathiosome-dark-spot-pad', 'cosrx-advanced-snail-96-mucin-essence'],
  },
];
