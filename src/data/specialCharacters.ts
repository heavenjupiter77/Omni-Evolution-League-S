import { PlayerProfile } from '../types';

export const FALLBACK_ARYAN_ZOHAN: PlayerProfile = {
  id: 'player-aryan-zohan',
  name: 'Aryan Zohan',
  nickname: 'The Dictator',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  archetype: 'Attacker',
  worldRank: 1,
  currentPerformance: 118,
  metrics: {
    fhf: 'S',
    bhl: 'A',
    ssc: 'S',
    vnp: 'A',
    fwa: 'A',
    rcx: 'B',
  },
  strengths: [
    'Dictatorial third-ball offensive command and pinpoint loop placement',
    'Unforgiving forehand inside-out counter attack with maximum spin velocity',
    'Heavy pendulum reverse service disguising underspin and dead-ball floats',
  ],
  weaknesses: [
    'Impatience when dealing with passive long-pip blockers who neutralize pace',
    'Tendency to over-commit on wide forehand pivot steps',
  ],
  bladeRubber: 'Butterfly Viscaria ALC / Dignics 09c (FH) + Tenergy 05 Hard (BH)',
  careerHighlights: 'Undisputed OEL Supreme Champion • Known across the league as The Dictator',
  performanceHistory: [
    {
      id: 'perf-az-1',
      date: '2026-09-01',
      displayDate: 'Sep 1',
      change: 0,
      percentage: 100,
      type: 'reset',
      note: 'Monthly baseline calculation',
      monthKey: '2026-09',
    },
    {
      id: 'perf-az-2',
      date: '2026-09-10',
      displayDate: 'Sep 10',
      change: 18,
      percentage: 118,
      type: 'increase',
      note: 'Dominant straight-sets tournament sweep',
      monthKey: '2026-09',
    },
  ],
};

export const FALLBACK_DIPAYAN: PlayerProfile = {
  id: 'player-dipayan',
  name: 'Dipayan',
  nickname: 'Husband of All Edges and Nets',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  archetype: 'Blocker',
  worldRank: 2,
  currentPerformance: 112,
  metrics: {
    fhf: 'B',
    bhl: 'A',
    ssc: 'A',
    vnp: 'S',
    fwa: 'B',
    rcx: 'S',
  },
  strengths: [
    'Mystical magnetic affinity for extreme table edges and dead net cords',
    'Unbreakable close-to-table backhand punch block dampening aggressive topspin',
    'Psychological supremacy derived from unreturnable net-roller finishes',
  ],
  weaknesses: [
    'Mid-distance counter-looping exchanges requiring extended stamina',
    'Vulnerable to deep heavy chop pushes aimed directly at the elbow crossover',
  ],
  bladeRubber: 'Stiga Clipper Wood / DHS Hurricane 3 Neo (FH) + Tibhar Evolution MX-P (BH)',
  careerHighlights: 'Sole Proprietor of all Edges & Nets • Most impossible table-grazing winners in OEL history',
  performanceHistory: [
    {
      id: 'perf-dp-1',
      date: '2026-09-01',
      displayDate: 'Sep 1',
      change: 0,
      percentage: 100,
      type: 'reset',
      note: 'Monthly baseline calculation',
      monthKey: '2026-09',
    },
    {
      id: 'perf-dp-2',
      date: '2026-09-12',
      displayDate: 'Sep 12',
      change: 12,
      percentage: 112,
      type: 'increase',
      note: 'Five consecutive edge-ball game points in Grand Prix semi-final',
      monthKey: '2026-09',
    },
  ],
};

export function resolveAryanZohan(players: PlayerProfile[]): PlayerProfile {
  const found = players.find(
    (p) =>
      p.name.toLowerCase().includes('aryan') ||
      p.name.toLowerCase().includes('zohan') ||
      p.nickname?.toLowerCase().includes('dictator')
  );
  return found || FALLBACK_ARYAN_ZOHAN;
}

export function resolveDipayan(players: PlayerProfile[]): PlayerProfile {
  const found = players.find(
    (p) =>
      p.name.toLowerCase().includes('dipayan') ||
      p.name.toLowerCase().includes('dipu') ||
      p.nickname?.toLowerCase().includes('dipu') ||
      p.nickname?.toLowerCase().includes('edge') ||
      p.nickname?.toLowerCase().includes('net')
  );
  return found || FALLBACK_DIPAYAN;
}
