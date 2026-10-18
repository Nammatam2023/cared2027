import React from 'react';

interface LogoProps {
  className?: string;
  theme?: 'dark' | 'light' | 'emerald';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CareDLogo: React.FC<LogoProps> = ({
  className = '',
  theme = 'emerald',
  showText = true,
  size = 'md'
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-base', subText: 'text-[9px]' },
    md: { icon: 38, text: 'text-xl', subText: 'text-[11px]' },
    lg: { icon: 50, text: 'text-2xl', subText: 'text-[13px]' },
    xl: { icon: 68, text: 'text-4xl', subText: 'text-base' }
  };

  const currentSize = sizeMap[size];

  const textColor =
    theme === 'light' ? 'text-white' : theme === 'dark' ? 'text-slate-900' : 'text-[#16533c]';
  const subTextColor =
    theme === 'light' ? 'text-emerald-100' : theme === 'dark' ? 'text-slate-600' : 'text-[#16533c]/80';

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Care D Symbol: Two interlaced stylized loops representing Kidney & Caring Hands */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <circle cx="50" cy="50" r="48" fill={theme === 'light' ? 'rgba(255,255,255,0.15)' : '#eef6f1'} />
        {/* Top-Right Loop (Gold / Warm Amber) */}
        <path
          d="M50 28C63.25 28 74 37.85 74 50C74 56.4 71.1 62.1 66.5 66C63.2 60.5 60.5 52.8 60.5 44C60.5 35.2 55.8 28 50 28Z"
          fill="#c88d3e"
        />
        {/* Bottom-Left Loop (Deep Forest Emerald) */}
        <path
          d="M50 72C36.75 72 26 62.15 26 50C26 43.6 28.9 37.9 33.5 34C36.8 39.5 39.5 47.2 39.5 56C39.5 64.8 44.2 72 50 72Z"
          fill="#16533c"
        />
        {/* Central connecting core */}
        <circle cx="50" cy="50" r="8" fill="#c88d3e" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-tight">
          <div className={`font-bold tracking-tight ${textColor} ${currentSize.text} flex items-center`}>
            <span>care</span>
            <span className="text-[#c88d3e] mx-0.5 font-black">·</span>
            <span className="text-[#c88d3e]">D</span>
          </div>
          <span className={`uppercase tracking-[0.25em] font-medium ${subTextColor} ${currentSize.subText}`}>
            clinic
          </span>
        </div>
      )}
    </div>
  );
};
