// Shared motion tokens for React Motion (motion/react)

export const springPresets = {
  gentle: {
    type: 'spring' as const,
    stiffness: 120,
    damping: 20,
    mass: 1,
  },
  snappy: {
    type: 'spring' as const,
    stiffness: 260,
    damping: 26,
  },
  envelopeUnfold: {
    type: 'spring' as const,
    stiffness: 70,
    damping: 18,
    mass: 1.2,
  },
  letterSlide: {
    type: 'spring' as const,
    stiffness: 85,
    damping: 16,
    mass: 0.9,
  },
};

export const fadeTransition = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1] as const,
};
