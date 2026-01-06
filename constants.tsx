
import React from 'react';

export const COLORS = {
  pastelPink: '#FFD1DC',
  deepRed: '#9B1B30',
  lavender: '#E6E6FA',
  gold: '#D4AF37',
  warmWhite: '#FFF9F9',
};

export const PROMISES = [
  "I don’t promise a perfect life,",
  "but I promise a real love,",
  "honest care,",
  "endless support,",
  "and a heart that will always choose you."
];

export const HeartIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const PetalIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C11,20 15,14 17,8M16,6.5C15,2.5 12,2 10,2C8,2 5,2.5 4,6.5C3,10.5 7.5,14.5 10,14.5C12.5,14.5 17,10.5 16,6.5Z" />
  </svg>
);

export const StarIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
  </svg>
);
