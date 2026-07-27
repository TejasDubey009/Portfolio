import React from 'react';

export const CodingIllustration = () => {
  return (
    <svg
      className="hero-illustration-svg"
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#55198B" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#865CFF" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E2132" />
          <stop offset="100%" stopColor="#11131E" />
        </linearGradient>
        <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#865CFF" />
          <stop offset="100%" stopColor="#55198B" />
        </linearGradient>
        <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F2FE" />
          <stop offset="100%" stopColor="#4FACFE" />
        </linearGradient>
      </defs>

      {/* Background ambient glow circle */}
      <circle cx="400" cy="300" r="260" fill="url(#bgGrad)" />

      {/* Desk Base */}
      <path d="M 150 480 H 650 V 495 H 150 Z" fill="#2d3748" rx="4" />
      <rect x="220" y="495" width="20" height="70" fill="#1a202c" rx="2" />
      <rect x="560" y="495" width="20" height="70" fill="#1a202c" rx="2" />

      {/* Dual Monitor Setup */}
      {/* Main Monitor */}
      <rect x="250" y="160" width="300" height="200" rx="12" fill="url(#screenGrad)" stroke="#3a3f58" strokeWidth="4" />
      <rect x="385" y="360" width="30" height="70" fill="#4a5568" />
      <path d="M 340 430 H 460 V 440 H 340 Z" fill="#2d3748" rx="4" />
      
      {/* Monitor Screen Header & Code */}
      <rect x="250" y="160" width="300" height="24" rx="12" fill="#252836" />
      <circle cx="270" cy="172" r="4" fill="#FF5F56" />
      <circle cx="285" cy="172" r="4" fill="#FFBD2E" />
      <circle cx="300" cy="172" r="4" fill="#27C93F" />

      {/* Animated Code Lines */}
      <rect x="270" y="200" width="80" height="8" rx="4" fill="#865CFF" />
      <rect x="360" y="200" width="120" height="8" rx="4" fill="#4FACFE" />
      
      <rect x="290" y="220" width="140" height="8" rx="4" fill="#00F2FE" />
      <rect x="440" y="220" width="60" height="8" rx="4" fill="#FFBD2E" />

      <rect x="290" y="240" width="100" height="8" rx="4" fill="#E34F26" />
      <rect x="400" y="240" width="110" height="8" rx="4" fill="#A0A5BA" />

      <rect x="310" y="260" width="160" height="8" rx="4" fill="#61DAFB" />

      <rect x="270" y="285" width="90" height="8" rx="4" fill="#27C93F" />
      <rect x="370" y="285" width="130" height="8" rx="4" fill="#865CFF" />

      {/* Floating Elements (React, Code, Cloud) */}
      <g className="floating-badge-1">
        <rect x="130" y="140" width="90" height="60" rx="10" fill="#1E2132" stroke="#61DAFB" strokeWidth="2" />
        <text x="175" y="176" fill="#61DAFB" fontSize="24" textAnchor="middle" fontWeight="bold">⚛ React</text>
      </g>

      <g className="floating-badge-2">
        <rect x="580" y="180" width="100" height="60" rx="10" fill="#1E2132" stroke="#339933" strokeWidth="2" />
        <text x="630" y="216" fill="#339933" fontSize="20" textAnchor="middle" fontWeight="bold">Node.js</text>
      </g>

      <g className="floating-badge-3">
        <circle cx="160" cy="330" r="35" fill="url(#purpleGrad)" />
        <text x="160" y="338" fill="#FFF" fontSize="22" textAnchor="middle" fontWeight="bold">&lt;/&gt;</text>
      </g>

      {/* Developer Character Sitting at Desk */}
      <circle cx="400" cy="400" r="30" fill="#FFC9A4" /> {/* Head */}
      <path d="M 370 390 C 370 350 430 350 430 390 Z" fill="#3A2518" /> {/* Hair */}
      <rect x="390" y="425" width="20" height="15" fill="#FFC9A4" /> {/* Neck */}
      <path d="M 350 440 H 450 V 480 H 350 Z" fill="url(#purpleGrad)" rx="10" /> {/* Hoodie Body */}
      <path d="M 350 450 L 320 480 H 340 L 365 460 Z" fill="#6C63FF" /> {/* Left Arm */}
      <path d="M 450 450 L 480 480 H 460 L 435 460 Z" fill="#6C63FF" /> {/* Right Arm */}

      {/* Coffee Mug on Desk */}
      <rect x="590" y="450" width="24" height="30" rx="4" fill="#FF5F56" />
      <path d="M 614 458 C 622 458 622 472 614 472" stroke="#FF5F56" strokeWidth="3" fill="none" />
      <path d="M 598 442 Q 602 435 598 428" stroke="#A0A5BA" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M 606 444 Q 610 437 606 430" stroke="#A0A5BA" strokeWidth="2" fill="none" opacity="0.6" />

      {/* Laptop Keyboard */}
      <polygon points="340,480 460,480 480,490 320,490" fill="#4a5568" />
    </svg>
  );
};
