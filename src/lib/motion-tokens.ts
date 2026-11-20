export const motionTokens = {
  duration: {
    instant: 0.08,
    fast: 0.18,
    normal: 0.35,
    slow: 0.6,
  },
  distance: {
    sm: 8,
    md: 16,
    lg: 28,
  },
  scale: {
    press: 0.97,
    hover: 1.02,
  },
  stagger: 0.08,
  easing: {
    smooth: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
};

export const springs = {
  gentle: { type: "spring" as const, stiffness: 120, damping: 18 },
  snappy: { type: "spring" as const, stiffness: 300, damping: 28 },
};
