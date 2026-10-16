import { BladeItem, RubberItem, BLADES_CATALOG, RUBBERS_CATALOG } from './equipmentData';

export interface QuizOption {
  key: string; // 'A' | 'B' | 'C' | 'D'
  label: string;
  sub?: string;
}

export interface QuizQuestion {
  id: string;
  questionNumber: number;
  prompt: string;
  options: QuizOption[];
}

export interface QuizTrack {
  id: 'rubber_single' | 'rubber_dual' | 'blade' | 'full_setup';
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
}

export const QUIZ_TRACKS: Record<QuizTrack['id'], QuizTrack> = {
  rubber_single: {
    id: 'rubber_single',
    title: 'Rubber Selector — Single Side',
    subtitle: '7-Question Diagnostic for Forehand or Backhand',
    questions: [
      {
        id: 'rs_q1',
        questionNumber: 1,
        prompt: 'Which side are you choosing this rubber for?',
        options: [
          { key: 'A', label: 'Forehand' },
          { key: 'B', label: 'Backhand' },
          { key: 'C', label: 'Both (Use Track 2 for Dual Setup)' },
        ],
      },
      {
        id: 'rs_q2',
        questionNumber: 2,
        prompt: 'What is your main playing style on this specific side?',
        options: [
          { key: 'A', label: 'Heavy topspin looping and spin-based attack' },
          { key: 'B', label: 'Fast drive/smash, counter-punching, and quick attacks close to the table' },
          { key: 'C', label: 'Controlled blocking, directional placement, and touch play' },
        ],
      },
      {
        id: 'rs_q3',
        questionNumber: 3,
        prompt: 'What rubber surface feel do you prefer?',
        options: [
          { key: 'A', label: 'Tacky / Sticky Chinese surface', sub: 'Maximum friction, requires active physical swing' },
          { key: 'B', label: 'Semi-tacky Hybrid', sub: 'Combines sticky spin with dynamic spring sponge' },
          { key: 'C', label: 'Non-tacky European/Japanese Tensor', sub: 'Grippy, highly elastic, high catapult effect' },
        ],
      },
      {
        id: 'rs_q4',
        questionNumber: 4,
        prompt: 'What sponge hardness feels most comfortable to you?',
        options: [
          { key: 'A', label: 'Soft (37°–42°)', sub: 'Forgiving, longer dwell time, high safety margin' },
          { key: 'B', label: 'Medium / Medium-Hard (43°–47°)', sub: 'Balanced power, precision, and arc' },
          { key: 'C', label: 'Hard to Extra-Hard (48°–55°+)', sub: 'Maximum speed ceiling and direct response' },
        ],
      },
      {
        id: 'rs_q5',
        questionNumber: 5,
        prompt: 'What loop trajectory/arc do you want from this rubber?',
        options: [
          { key: 'A', label: 'High, safe arc', sub: 'Clears the net easily with strong dip on the end line' },
          { key: 'B', label: 'Medium arc', sub: 'Balanced speed and clearance' },
          { key: 'C', label: 'Low, sharp trajectory', sub: 'Fast, direct, penetrating ball movement' },
        ],
      },
      {
        id: 'rs_q6',
        questionNumber: 6,
        prompt: 'How do you want the rubber to behave on passive shots (blocking & short touch)?',
        options: [
          { key: 'A', label: 'High catapult / bouncy', sub: 'Generates speed effortlessly without a big swing' },
          { key: 'B', label: 'Linear / predictable', sub: 'The ball goes exactly as hard as you hit it, low rebound on touch play' },
        ],
      },
      {
        id: 'rs_q7',
        questionNumber: 7,
        prompt: 'What is your price budget for this single rubber?',
        options: [
          { key: 'A', label: 'Budget (Under 2,000 ৳)' },
          { key: 'B', label: 'Mid-Range (2,000 ৳ – 4,500 ৳)' },
          { key: 'C', label: 'High-End Pro (4,800 ৳ – 9,500 ৳)' },
        ],
      },
    ],
  },

  rubber_dual: {
    id: 'rubber_dual',
    title: 'Dual Rubber Selector — Both Sides',
    subtitle: '9-Question Setup Pairing Forehand and Backhand',
    questions: [
      {
        id: 'rd_q1',
        questionNumber: 1,
        prompt: 'What is your overall playstyle strategy?',
        options: [
          { key: 'A', label: 'Dual-wing offensive looper', sub: 'Heavy topspin attacks from both sides' },
          { key: 'B', label: 'Forehand dominant looper + Backhand control/blocker' },
          { key: 'C', label: 'Close-to-table fast attack and counter-puncher' },
        ],
      },
      {
        id: 'rd_q2',
        questionNumber: 2,
        prompt: 'On your Forehand, what surface dynamic do you prefer?',
        options: [
          { key: 'A', label: 'Tacky / Sticky Chinese rubber (High friction spin)' },
          { key: 'B', label: 'Semi-tacky Hybrid rubber' },
          { key: 'C', label: 'Non-tacky European/Japanese Tensor rubber' },
        ],
      },
      {
        id: 'rd_q3',
        questionNumber: 3,
        prompt: 'What sponge hardness do you want on your Forehand rubber?',
        options: [
          { key: 'A', label: 'Medium to Medium-Hard (43°–47°)' },
          { key: 'B', label: 'Hard to Extra-Hard (48°–55°+)' },
        ],
      },
      {
        id: 'rd_q4',
        questionNumber: 4,
        prompt: 'On your Backhand, what surface dynamic do you prefer?',
        options: [
          { key: 'A', label: 'Elastic Tensor rubber with active catapult (Effortless speed/flicks)' },
          { key: 'B', label: 'Semi-tacky / Control Tensor rubber (High precision, less bouncy)' },
          { key: 'C', label: 'Linear control rubber for blocking and placement' },
        ],
      },
      {
        id: 'rd_q5',
        questionNumber: 5,
        prompt: 'What sponge hardness do you prefer on your Backhand rubber?',
        options: [
          { key: 'A', label: 'Soft to Medium-Soft (37°–42°: long dwell time, easy control)' },
          { key: 'B', label: 'Medium (43°–47°: solid blocking and punch drives)' },
        ],
      },
      {
        id: 'rd_q6',
        questionNumber: 6,
        prompt: 'How sensitive are you to incoming opponent spin on service receptions?',
        options: [
          { key: 'A', label: 'Very sensitive (I prefer rubbers that absorb spin easily)' },
          { key: 'B', label: 'Moderately sensitive (I compensate with blade angle and timing)' },
          { key: 'C', label: 'Not sensitive (I use grippy/sticky rubbers to active-counter incoming spin)' },
        ],
      },
      {
        id: 'rd_q7',
        questionNumber: 7,
        prompt: 'What shot trajectory do you prefer overall?',
        options: [
          { key: 'A', label: 'High clearance arc on forehand + medium trajectory on backhand' },
          { key: 'B', label: 'Medium-to-low sharp trajectory on both wings for direct pressure' },
        ],
      },
      {
        id: 'rd_q8',
        questionNumber: 8,
        prompt: 'What is your total budget for BOTH rubbers combined?',
        options: [
          { key: 'A', label: 'Budget (Under 3,500 ৳ for both)' },
          { key: 'B', label: 'Mid-Range (3,500 ৳ – 8,000 ৳ for both)' },
          { key: 'C', label: 'High-End Pro (8,000 ৳ – 18,500 ৳ for both)' },
        ],
      },
      {
        id: 'rd_q9',
        questionNumber: 9,
        prompt: 'What is your priority for racket feel?',
        options: [
          { key: 'A', label: 'Asymmetrical feel (Harder/tackier forehand, softer/bouncier backhand)' },
          { key: 'B', label: 'Symmetrical feel (Similar elasticity and hardness on both sides)' },
        ],
      },
    ],
  },

  blade: {
    id: 'blade',
    title: 'Perfect Blade Selector',
    subtitle: '7-Question Architectural Match for Your Playing Hand',
    questions: [
      {
        id: 'b_q1',
        questionNumber: 1,
        prompt: 'What composition structure do you want in your blade?',
        options: [
          { key: 'A', label: '5-ply All-Wood', sub: 'Maximum feel, control, high vibration feedback' },
          { key: 'B', label: '7-ply All-Wood', sub: 'Stiffer and faster than 5-ply, crisp wood feel without carbon' },
          { key: 'C', label: 'Inner-Carbon / Inner-Fiber', sub: 'Wood outer plies for soft feel, carbon inside for power' },
          { key: 'D', label: 'Outer-Carbon / Outer-Fiber', sub: 'Direct carbon under top ply; stiff, maximum speed' },
        ],
      },
      {
        id: 'b_q2',
        questionNumber: 2,
        prompt: 'What speed rating fits your current skill level?',
        options: [
          { key: 'A', label: 'ALL / ALL+', sub: 'All-round control, lower speed, best for technique development' },
          { key: 'B', label: 'OFF- / OFF', sub: 'Balanced offensive speed with great control' },
          { key: 'C', label: 'OFF+', sub: 'Maximum speed, stiff response, minimum error tolerance' },
        ],
      },
      {
        id: 'b_q3',
        questionNumber: 3,
        prompt: 'What blade stiffness and dwell time do you prefer?',
        options: [
          { key: 'A', label: 'Flexible with long dwell time', sub: 'High ball feel, deep flex for heavy spin' },
          { key: 'B', label: 'Medium stiffness', sub: 'Balanced dwell time and speed' },
          { key: 'C', label: 'Very stiff and rigid', sub: 'Direct ball impact, minimal vibration, explosive speed' },
        ],
      },
      {
        id: 'b_q4',
        questionNumber: 4,
        prompt: 'What handle shape do you prefer?',
        options: [
          { key: 'A', label: 'Flared (FL)', sub: 'Wider at base, prevents slipping (Most popular)' },
          { key: 'B', label: 'Straight (ST)', sub: 'Uniform grip, easier to flip/rotate in hand' },
          { key: 'C', label: 'Anatomic (AN)', sub: 'Curved to fit palm contour' },
        ],
      },
      {
        id: 'b_q5',
        questionNumber: 5,
        prompt: 'What total blade weight do you prefer?',
        options: [
          { key: 'A', label: 'Lightweight (75g – 82g)' },
          { key: 'B', label: 'Standard / Medium (83g – 88g)' },
          { key: 'C', label: 'Heavy (89g – 95g+)' },
        ],
      },
      {
        id: 'b_q6',
        questionNumber: 6,
        prompt: 'What distance from the table do you play most of your points?',
        options: [
          { key: 'A', label: 'Close to the table (0 to 1 meter)' },
          { key: 'B', label: 'Mid-distance (1 to 2.5 meters)' },
          { key: 'C', label: 'Far from the table (2.5+ meters)' },
        ],
      },
      {
        id: 'b_q7',
        questionNumber: 7,
        prompt: 'What is your budget for the blade?',
        options: [
          { key: 'A', label: 'Budget (1,600 ৳ – 3,500 ৳)' },
          { key: 'B', label: 'Mid-Range (4,000 ৳ – 7,500 ৳)' },
          { key: 'C', label: 'Upper Mid-Range (8,000 ৳ – 12,000 ৳)' },
          { key: 'D', label: 'Pro Level (15,000 ৳ – 20,000 ৳)' },
        ],
      },
    ],
  },

  full_setup: {
    id: 'full_setup',
    title: 'Full Setup Builder',
    subtitle: '13-Question Complete 3-Piece Architect (Blade + FH + BH)',
    questions: [
      {
        id: 'fs_q1',
        questionNumber: 1,
        prompt: 'What is your total combined budget for the complete custom racket?',
        options: [
          { key: 'A', label: 'Entry Budget (Under 5,000 ৳)' },
          { key: 'B', label: 'Mid-Range Value (5,000 ৳ – 10,000 ৳)' },
          { key: 'C', label: 'Upper Mid-Range (10,000 ৳ – 18,000 ৳)' },
          { key: 'D', label: 'High-End Pro Setup (18,000 ৳ – 35,000+ ৳)' },
        ],
      },
      {
        id: 'fs_q2',
        questionNumber: 2,
        prompt: 'What is your general playing style and strategy?',
        options: [
          { key: 'A', label: 'Defensive / All-round (Placement, chop-pushing, blocking, low errors)' },
          { key: 'B', label: 'Controlled Offensive / Looper (Spin variation, controlled build-up, steady attack)' },
          { key: 'C', label: 'Power Offensive (Aggressive 3rd-ball attack, continuous mid-distance loops)' },
          { key: 'D', label: 'Fast Attack / Direct Puncher (Close-to-table counter-attacks, quick smashes)' },
        ],
      },
      {
        id: 'fs_q3',
        questionNumber: 3,
        prompt: 'Where do you position yourself during rallies?',
        options: [
          { key: 'A', label: 'Close to the table (0 to 1 meter)' },
          { key: 'B', label: 'Mid-distance (1 to 2.5 meters)' },
          { key: 'C', label: 'Far from the table (2.5+ meters)' },
        ],
      },
      {
        id: 'fs_q4',
        questionNumber: 4,
        prompt: 'How do you generate speed on your shots?',
        options: [
          { key: 'A', label: 'Compact wrist movements / short swing (I need equipment to generate catapult speed)' },
          { key: 'B', label: 'Full-body swings / strong physical exertion (I provide power, equipment should give control)' },
          { key: 'C', label: 'Balanced mix of compact wrist strokes and full-body swings' },
        ],
      },
      {
        id: 'fs_q5',
        questionNumber: 5,
        prompt: 'What is your primary Forehand shot?',
        options: [
          { key: 'A', label: 'Heavy spin loops with Chinese-style brush stroke' },
          { key: 'B', label: 'Power loops and counter-drives' },
          { key: 'C', label: 'Flat hits, drives, and blocks' },
        ],
      },
      {
        id: 'fs_q6',
        questionNumber: 6,
        prompt: 'What surface feel do you want for your Forehand rubber?',
        options: [
          { key: 'A', label: 'Tacky / Sticky Chinese surface' },
          { key: 'B', label: 'Semi-tacky Hybrid surface' },
          { key: 'C', label: 'Elastic Non-tacky European/Japanese Tensor' },
        ],
      },
      {
        id: 'fs_q7',
        questionNumber: 7,
        prompt: 'What is your primary Backhand stroke?',
        options: [
          { key: 'A', label: 'Quick wristy flicks, banana flips, and fast punch-blocks' },
          { key: 'B', label: 'Directional blocking, controlled pushes, and placement' },
          { key: 'C', label: 'Mid-distance backhand topspin loops' },
        ],
      },
      {
        id: 'fs_q8',
        questionNumber: 8,
        prompt: 'What dynamic feel do you want for your Backhand rubber?',
        options: [
          { key: 'A', label: 'Soft/Medium elastic tensor with active catapult (Effortless backhand power)' },
          { key: 'B', label: 'Control-oriented linear rubber (Predictable, no overshooting)' },
          { key: 'C', label: 'Semi-tacky rubber for controlled spin opening' },
        ],
      },
      {
        id: 'fs_q9',
        questionNumber: 9,
        prompt: 'What blade material/construction do you prefer?',
        options: [
          { key: 'A', label: 'All-Wood (Pure feedback, high control, medium speed)' },
          { key: 'B', label: 'Inner-Carbon (Soft wood feel on light touch, carbon power on hard hits)' },
          { key: 'C', label: 'Outer-Carbon (Stiff, direct impact, maximum sweet spot and speed)' },
        ],
      },
      {
        id: 'fs_q10',
        questionNumber: 10,
        prompt: 'What blade handle shape do you prefer?',
        options: [
          { key: 'A', label: 'Flared (FL)' },
          { key: 'B', label: 'Straight (ST)' },
          { key: 'C', label: 'Anatomic (AN)' },
        ],
      },
      {
        id: 'fs_q11',
        questionNumber: 11,
        prompt: 'What total setup weight works best for your style?',
        options: [
          { key: 'A', label: 'Lightweight (Under 175g total: fast wrist movement)' },
          { key: 'B', label: 'Standard (175g – 188g total: balanced)' },
          { key: 'C', label: 'Heavy (190g+ total: maximum momentum and shot power)' },
        ],
      },
      {
        id: 'fs_q12',
        questionNumber: 12,
        prompt: 'How do you want your short touch game (serves & return) to feel?',
        options: [
          { key: 'A', label: 'Low rebound and dead response on soft touches for short drops and pushes' },
          { key: 'B', label: 'Bouncy and responsive for immediate counter-attack and flick openings' },
        ],
      },
      {
        id: 'fs_q13',
        questionNumber: 13,
        prompt: 'What is the main goal of this equipment upgrade?',
        options: [
          { key: 'A', label: 'Reduce unforced errors and increase overall consistency' },
          { key: 'B', label: 'Generate significantly higher spin on serves and opening loops' },
          { key: 'C', label: 'Increase raw shot speed and power finishing capability' },
          { key: 'D', label: 'Improve overall ball feedback and technical feel' },
        ],
      },
    ],
  },
};

// -------------------------------------------------------------------------
// INTELLIGENT MATCHING ALGORITHMS
// -------------------------------------------------------------------------

export function evaluateSingleRubber(answers: Record<string, string>): {
  rubber: RubberItem;
  matchScore: number;
  reasons: string[];
} {
  const isForehand = answers.rs_q1 === 'A';
  const surfacePref = answers.rs_q3; // A=tacky, B=semi-tacky, C=tensor
  const hardnessPref = answers.rs_q4; // A=soft, B=medium/med-hard, C=hard
  const budgetPref = answers.rs_q7; // A=<2000, B=2000-4500, C=4800-9500

  const scored = RUBBERS_CATALOG.map((r) => {
    let score = 50;
    const reasons: string[] = [];

    // Surface
    if (surfacePref === 'A') {
      if (r.surfaceCategory === 'tacky-chinese') {
        score += 30;
        reasons.push('Matches high-friction tacky topsheet requirement.');
      }
    } else if (surfacePref === 'B') {
      if (r.surfaceCategory === 'semi-tacky') {
        score += 30;
        reasons.push('Features hybrid semi-tacky topsheet with elastic energy.');
      }
    } else if (surfacePref === 'C') {
      if (r.surfaceCategory === 'european-tensor') {
        score += 30;
        reasons.push('European/Japanese tensor sponge delivers effortless catapult velocity.');
      }
    }

    // Hardness
    if (hardnessPref === 'A') {
      if (r.hardnessCategory === 'medium-soft') score += 20;
    } else if (hardnessPref === 'B') {
      if (r.hardnessCategory === 'medium' || r.hardnessCategory === 'medium-hard') score += 20;
    } else if (hardnessPref === 'C') {
      if (r.hardnessCategory === 'hard') score += 20;
    }

    // Style
    if (answers.rs_q2 === 'A') score += r.spin * 2;
    if (answers.rs_q2 === 'B') score += r.speed * 2;
    if (answers.rs_q2 === 'C') score += r.control * 2;

    // Budget
    if (budgetPref === 'A') {
      if (r.price <= 2000) score += 30;
      else score -= 40;
    } else if (budgetPref === 'B') {
      if (r.price >= 2000 && r.price <= 4600) score += 30;
      else if (r.price < 2000) score += 10;
    } else if (budgetPref === 'C') {
      if (r.price >= 4800) score += 35;
      else score += 5;
    }

    return { rubber: r, score, reasons };
  });

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0] || { rubber: RUBBERS_CATALOG[0], score: 85, reasons: [] };

  const finalReasons = [
    `Selected for your ${isForehand ? 'Forehand' : 'Backhand'} tactical profile.`,
    best.reasons[0] || `Delivers exceptional ${best.rubber.speed > best.rubber.spin ? 'speed' : 'spin'} output.`,
    `Engineered for ${best.rubber.bestFor[0] || 'offensive precision'}.`,
  ];

  return {
    rubber: best.rubber,
    matchScore: Math.min(99, Math.round(75 + (best.score / 150) * 24)),
    reasons: finalReasons,
  };
}

export function evaluateDualRubbers(answers: Record<string, string>): {
  forehand: RubberItem;
  backhand: RubberItem;
  totalPrice: number;
  matchScore: number;
  reasons: string[];
} {
  const fhSurface = answers.rd_q2; // A=tacky, B=semi, C=tensor
  const fhHardness = answers.rd_q3; // A=medium-hard, B=hard
  const bhSurface = answers.rd_q4; // A=tensor, B=semi, C=linear control
  const bhHardness = answers.rd_q5; // A=soft/med-soft, B=medium
  const budget = answers.rd_q8; // A=<3500, B=3500-8000, C=8000-18500

  // 1. Score FH
  const scoredFh = RUBBERS_CATALOG.map((r) => {
    let score = 50;
    if (fhSurface === 'A' && r.surfaceCategory === 'tacky-chinese') score += 35;
    if (fhSurface === 'B' && r.surfaceCategory === 'semi-tacky') score += 35;
    if (fhSurface === 'C' && r.surfaceCategory === 'european-tensor') score += 35;

    if (fhHardness === 'A' && (r.hardnessCategory === 'medium' || r.hardnessCategory === 'medium-hard')) score += 20;
    if (fhHardness === 'B' && r.hardnessCategory === 'hard') score += 25;

    if (budget === 'A' && r.price <= 2000) score += 25;
    if (budget === 'C' && r.price >= 4800) score += 30;

    score += r.spin * 2;
    return { rubber: r, score };
  }).sort((a, b) => b.score - a.score);

  const bestFh = scoredFh[0]?.rubber || RUBBERS_CATALOG[0];

  // 2. Score BH
  const scoredBh = RUBBERS_CATALOG.map((r) => {
    let score = 50;
    if (bhSurface === 'A' && r.surfaceCategory === 'european-tensor') score += 35;
    if (bhSurface === 'B' && r.surfaceCategory === 'semi-tacky') score += 30;
    if (bhSurface === 'C' && r.control >= 8.8) score += 35;

    if (bhHardness === 'A' && r.hardnessCategory === 'medium-soft') score += 25;
    if (bhHardness === 'B' && r.hardnessCategory === 'medium') score += 20;

    if (budget === 'A' && r.price <= 2000) score += 25;
    if (budget === 'C' && r.price >= 4500) score += 30;

    score += r.control * 2.5;
    return { rubber: r, score };
  }).sort((a, b) => b.score - a.score);

  let bestBh = scoredBh[0]?.rubber || RUBBERS_CATALOG[1];
  if (bestBh.id === bestFh.id && scoredBh.length > 1 && answers.rd_q9 !== 'B') {
    bestBh = scoredBh[1]?.rubber || bestBh;
  }

  const totalPrice = bestFh.price + bestBh.price;

  return {
    forehand: bestFh,
    backhand: bestBh,
    totalPrice,
    matchScore: 96,
    reasons: [
      `Forehand (${bestFh.name}): Tuned for high-traction offensive acceleration.`,
      `Backhand (${bestBh.name}): Provides controlled dwell for sharp counter-flicks & active blocking.`,
      `Racket Balance: Harmonized total weight with optimal center-of-gravity feel.`,
    ],
  };
}

export function evaluateBlade(answers: Record<string, string>): {
  blade: BladeItem;
  matchScore: number;
  reasons: string[];
} {
  const comp = answers.b_q1; // A=5-ply wood, B=7-ply wood, C=inner carbon, D=outer carbon
  const speed = answers.b_q2; // A=ALL, B=OFF-/OFF, C=OFF+
  const budget = answers.b_q7; // A=1600-3500, B=4000-7500, C=8000-12000, D=15000-20000

  const scored = BLADES_CATALOG.map((b) => {
    let score = 50;

    // Composition
    if (comp === 'A' && b.pliesCategory === 'all-wood-5') score += 40;
    if (comp === 'B' && b.pliesCategory === 'all-wood-7') score += 40;
    if (comp === 'C' && b.compositeType === 'inner-carbon') score += 40;
    if (comp === 'D' && (b.compositeType === 'outer-carbon' || b.compositeType === 'alc' || b.compositeType === 'tamca')) score += 40;

    // Speed class
    if (speed === 'A' && (b.bladeType.includes('ALL') || b.bladeType.includes('ALL+'))) score += 30;
    if (speed === 'B' && (b.bladeType.includes('OFF-') || b.bladeType === 'OFF')) score += 30;
    if (speed === 'C' && b.bladeType.includes('OFF+')) score += 30;

    // Distance
    if (answers.b_q6 === 'A') score += b.controlRating * 2;
    if (answers.b_q6 === 'B' || answers.b_q6 === 'C') score += b.speedRating * 2;

    // Budget
    if (budget === 'A') {
      if (b.price <= 3500) score += 35;
      else score -= 40;
    } else if (budget === 'B') {
      if (b.price >= 3500 && b.price <= 7500) score += 35;
    } else if (budget === 'C') {
      if (b.price >= 8000 && b.price <= 12000) score += 35;
    } else if (budget === 'D') {
      if (b.price >= 15000) score += 40;
    }

    return { blade: b, score };
  }).sort((a, b) => b.score - a.score);

  const best = scored[0]?.blade || BLADES_CATALOG[0];

  return {
    blade: best,
    matchScore: 97,
    reasons: [
      `Structural match: ${best.plies} offers ideal dwell and ball feedback.`,
      `Class tuning: ${best.bladeType} provides optimal rebound velocity for your range.`,
      `Touch response: ${best.touch} feel provides confidence in aggressive rallies.`,
    ],
  };
}

export function evaluateFullSetup(answers: Record<string, string>): {
  blade: BladeItem;
  forehand: RubberItem;
  backhand: RubberItem;
  totalPrice: number;
  matchScore: number;
  synergyNotes: string[];
} {
  const budget = answers.fs_q1; // A=<5000, B=5000-10000, C=10000-18000, D=18000-35000+
  const bladeMat = answers.fs_q9; // A=All-wood, B=Inner-carbon, C=Outer-carbon
  const fhSurface = answers.fs_q6; // A=Tacky, B=Semi-tacky, C=Tensor
  const bhFeel = answers.fs_q8; // A=Soft tensor, B=linear control, C=semi-tacky

  // 1. Blade pick
  const scoredBlades = BLADES_CATALOG.map((b) => {
    let score = 50;
    if (bladeMat === 'A' && (b.pliesCategory === 'all-wood-5' || b.pliesCategory === 'all-wood-7')) score += 40;
    if (bladeMat === 'B' && b.compositeType === 'inner-carbon') score += 45;
    if (bladeMat === 'C' && (b.compositeType === 'outer-carbon' || b.compositeType === 'alc' || b.compositeType === 'tamca')) score += 45;

    if (budget === 'A') {
      if (b.price <= 2600) score += 40;
      else score -= 50;
    } else if (budget === 'B') {
      if (b.price >= 2500 && b.price <= 5500) score += 40;
    } else if (budget === 'C') {
      if (b.price >= 5500 && b.price <= 12000) score += 40;
    } else if (budget === 'D') {
      if (b.price >= 12000) score += 45;
    }

    if (answers.fs_q2 === 'C' || answers.fs_q2 === 'D') score += b.speedRating * 2;
    if (answers.fs_q2 === 'A' || answers.fs_q2 === 'B') score += b.controlRating * 2;

    return { blade: b, score };
  }).sort((a, b) => b.score - a.score);

  const bestBlade = scoredBlades[0]?.blade || BLADES_CATALOG[0];

  // 2. Forehand rubber pick
  const scoredFh = RUBBERS_CATALOG.map((r) => {
    let score = 50;
    if (fhSurface === 'A' && r.surfaceCategory === 'tacky-chinese') score += 40;
    if (fhSurface === 'B' && r.surfaceCategory === 'semi-tacky') score += 40;
    if (fhSurface === 'C' && r.surfaceCategory === 'european-tensor') score += 40;

    if (budget === 'A' && r.price <= 1300) score += 30;
    if (budget === 'D' && r.price >= 6500) score += 35;

    score += r.spin * 2;
    return { rubber: r, score };
  }).sort((a, b) => b.score - a.score);

  const bestFh = scoredFh[0]?.rubber || RUBBERS_CATALOG[0];

  // 3. Backhand rubber pick
  const scoredBh = RUBBERS_CATALOG.map((r) => {
    let score = 50;
    if (bhFeel === 'A' && r.surfaceCategory === 'european-tensor' && r.hardnessCategory === 'medium-soft') score += 40;
    if (bhFeel === 'B' && r.control >= 8.8) score += 40;
    if (bhFeel === 'C' && r.surfaceCategory === 'semi-tacky') score += 40;

    if (budget === 'A' && r.price <= 1300) score += 30;
    if (budget === 'D' && r.price >= 5000) score += 35;

    score += r.control * 2.5;
    return { rubber: r, score };
  }).sort((a, b) => b.score - a.score);

  let bestBh = scoredBh[0]?.rubber || RUBBERS_CATALOG[1];
  if (bestBh.id === bestFh.id && scoredBh.length > 1) {
    bestBh = scoredBh[1]?.rubber || bestBh;
  }

  const totalPrice = bestBlade.price + bestFh.price + bestBh.price;

  return {
    blade: bestBlade,
    forehand: bestFh,
    backhand: bestBh,
    totalPrice,
    matchScore: 98,
    synergyNotes: [
      `Foundation Synergy: ${bestBlade.name} provides clean kinetic energy transfer into ${bestFh.name} on topspin loops.`,
      `Backhand Stability: ${bestBh.name} nullifies incoming rotation while accelerating off-the-bounce flicks.`,
      `Complete Weight Distribution: Estimated ~180g–186g, ideal for swift wrist recovery and heavy smash finishes.`,
      `Total Complete Cost: ${totalPrice.toLocaleString()}৳ (Within selected budget profile).`,
    ],
  };
}
