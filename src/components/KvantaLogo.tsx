import React from 'react';

export const KvantaLogo = () => {
  return (
    <svg
      width="400"
      height="100"
      viewBox="0 0 400 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
      className="w-auto h-10 transform transition-transform duration-300 group-hover:scale-[1.02]"
    >
      <defs>
        <linearGradient id="kvantaGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#345FF6" />
          <stop offset="100%" stopColor="#5a7dfc" />
        </linearGradient>
      </defs>

      {/* Simplified geometric shape */}
      <path
        d="M25 65 L15 40 L25 15 L50 15 L50 25 L65 25 L65 65 Z" 
        fill="url(#kvantaGradient)"
        className="transform transition-transform duration-300 group-hover:scale-105"
      />

      {/* "Kvanta" text - now all on the same baseline */}
      <text
        fontFamily="Nunito, sans-serif"
        fontSize="42"
        fontWeight="700"
        fill="url(#kvantaGradient)"
        className="transition-transform duration-300"
      >
        <tspan x="80" y="55">Kvanta</tspan>
      </text>

      {/* ".ai" integrated with main text */}
      <text
        fontFamily="Nunito, sans-serif"
        fontSize="32"
        fontWeight="600"
        fill="#345FF6"
        className="transition-transform duration-300"
      >
        <tspan x="230" y="55">.ai</tspan>
      </text>
    </svg>
  );
};