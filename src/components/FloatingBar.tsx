import React, { useState } from 'react';
import { Calendar, Copy, Check, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FloatingBarProps {
  promoCode: string;
  bookingUrl: string;
  doctorName: string;
}

export const FloatingBar: React.FC<FloatingBarProps> = ({
  promoCode,
  bookingUrl,
  doctorName
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.9 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-200/80 p-3 shadow-lg transition-transform">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Code Box */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <p className="text-[10px] text-slate-500 font-medium">โค้ดปรึกษาฟรี (ลด 100%):</p>
            <p className="text-xs font-mono font-bold text-emerald-900">{promoCode}</p>
          </div>

          <button
            type="button"
            onClick={handleCopyCode}
            className="py-2 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl text-amber-900 font-mono font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs"
            title="คลิกเพื่อคัดลอกโค้ด"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-[11px]">คัดลอกแล้ว!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px] font-mono">{promoCode}</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Book Now Button */}
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 sm:flex-none py-2.5 px-5 bg-[#16533c] hover:bg-[#124431] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <Calendar className="w-4 h-4 text-emerald-300" />
          <span>นัดหมายอาจารย์อนุชา ทันที</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>
      </div>
    </div>
  );
};
