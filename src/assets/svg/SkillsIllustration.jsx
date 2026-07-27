import React from 'react';

export const SkillsIllustration = () => {
  return (
    <svg
      className="skills-illustration-svg"
      viewBox="0 0 700 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4FACFE" />
          <stop offset="100%" stopColor="#00F2FE" />
        </linearGradient>
        <linearGradient id="dbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#865CFF" />
          <stop offset="100%" stopColor="#55198B" />
        </linearGradient>
      </defs>

      {/* Cloud Infrastructure Base */}
      <path
        d="M 220 220 A 40 40 0 0 1 300 200 A 60 60 0 0 1 420 200 A 40 40 0 0 1 480 230 A 30 30 0 0 1 480 280 H 220 A 30 30 0 0 1 220 220 Z"
        fill="url(#cloudGrad)"
        opacity="0.9"
      />
      <text x="350" y="245" fill="#FFFFFF" fontSize="18" textAnchor="middle" fontWeight="bold">Cloud & Web Services</text>

      {/* Central Database Stack */}
      <g transform="translate(180, 290)">
        <rect x="0" y="0" width="120" height="35" rx="8" fill="url(#dbGrad)" />
        <ellipse cx="60" cy="8" rx="60" ry="8" fill="#A072FF" />
        <line x1="20" y1="20" x2="40" y2="20" stroke="#FFF" strokeWidth="4" strokeLinecap="round" />
        <circle cx="95" cy="20" r="4" fill="#27C93F" />

        <rect x="0" y="45" width="120" height="35" rx="8" fill="url(#dbGrad)" />
        <ellipse cx="60" cy="53" rx="60" ry="8" fill="#A072FF" />
        <line x1="20" y1="65" x2="40" y2="65" stroke="#FFF" strokeWidth="4" strokeLinecap="round" />
        <circle cx="95" cy="65" r="4" fill="#27C93F" />

        <rect x="0" y="90" width="120" height="35" rx="8" fill="url(#dbGrad)" />
        <ellipse cx="60" cy="98" rx="60" ry="8" fill="#A072FF" />
        <line x1="20" y1="110" x2="40" y2="110" stroke="#FFF" strokeWidth="4" strokeLinecap="round" />
        <circle cx="95" cy="110" r="4" fill="#27C93F" />
      </g>

      {/* Web Window Graphic */}
      <rect x="360" y="280" width="220" height="150" rx="10" fill="#1E2132" stroke="#3A3F58" strokeWidth="3" />
      <rect x="360" y="280" width="220" height="24" rx="10" fill="#2A2D3D" />
      <circle cx="375" cy="292" r="4" fill="#FF5F56" />
      <circle cx="388" cy="292" r="4" fill="#FFBD2E" />
      <circle cx="401" cy="292" r="4" fill="#27C93F" />
      
      <rect x="380" y="320" width="80" height="40" rx="6" fill="#865CFF" opacity="0.8" />
      <rect x="470" y="320" width="90" height="10" rx="5" fill="#4FACFE" />
      <rect x="470" y="338" width="70" height="10" rx="5" fill="#6C63FF" />
      <rect x="380" y="375" width="180" height="10" rx="5" fill="#27C93F" />
      <rect x="380" y="395" width="130" height="10" rx="5" fill="#FFBD2E" />

      {/* Connecting Network Lines */}
      <path d="M 350 250 L 240 290" stroke="#4FACFE" strokeWidth="3" strokeDasharray="6 6" />
      <path d="M 350 250 L 470 280" stroke="#865CFF" strokeWidth="3" strokeDasharray="6 6" />
      <path d="M 300 340 L 360 350" stroke="#00F2FE" strokeWidth="3" strokeDasharray="6 6" />
    </svg>
  );
};
