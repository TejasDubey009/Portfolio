import React from 'react';

export const ContactIllustration = () => {
  return (
    <svg
      className="contact-illustration-svg"
      viewBox="0 0 600 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="mailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#865CFF" />
          <stop offset="100%" stopColor="#55198B" />
        </linearGradient>
      </defs>

      {/* Background glow */}
      <circle cx="300" cy="250" r="180" fill="#865CFF" opacity="0.1" />

      {/* Main Mail Envelope */}
      <rect x="150" y="150" width="300" height="200" rx="16" fill="url(#mailGrad)" />
      
      {/* Flap Down */}
      <path d="M 150 150 L 300 270 L 450 150" stroke="#FFFFFF" strokeWidth="4" fill="#6C63FF" opacity="0.9" />
      
      {/* Inner paper sheet sliding out */}
      <rect x="180" y="100" width="240" height="140" rx="8" fill="#FFFFFF" />
      <rect x="200" y="120" width="100" height="10" rx="5" fill="#865CFF" />
      <rect x="200" y="140" width="160" height="8" rx="4" fill="#A0A5BA" />
      <rect x="200" y="156" width="140" height="8" rx="4" fill="#A0A5BA" />
      <rect x="200" y="172" width="180" height="8" rx="4" fill="#4FACFE" />

      {/* Location Pin */}
      <g transform="translate(420, 90)">
        <path d="M 25 0 C 11.2 0 0 11.2 0 25 C 0 43.7 25 70 25 70 C 25 70 50 43.7 50 25 C 50 11.2 38.8 0 25 0 Z" fill="#FF5F56" />
        <circle cx="25" cy="25" r="10" fill="#FFFFFF" />
      </g>

      {/* Chat Bubbles */}
      <g transform="translate(80, 100)">
        <rect x="0" y="0" width="90" height="45" rx="12" fill="#00F2FE" />
        <text x="45" y="28" fill="#1E2132" fontSize="18" textAnchor="middle" fontWeight="bold">Hello! 👋</text>
      </g>

      <g transform="translate(380, 320)">
        <rect x="0" y="0" width="120" height="45" rx="12" fill="#27C93F" />
        <text x="60" y="28" fill="#FFFFFF" fontSize="16" textAnchor="middle" fontWeight="bold">Let's talk! 🚀</text>
      </g>
    </svg>
  );
};
