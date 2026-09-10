// Progress categories stored in user_progress. All ARC Raiders categories are
// prefixed with "ar-" so they never collide with rows from the previous app.
export const PROGRESS = {
  quest: 'ar-quest',
  skill: 'ar-skill',
  workshop: 'ar-workshop',
  arc: 'ar-arc',
  expedition: 'ar-expedition',
  weapon: 'ar-weapon',
  achievement: 'ar-achievement',
} as const;

export type ProgressCategory = (typeof PROGRESS)[keyof typeof PROGRESS];
