import React, { useState } from 'react';
import { CareDLogo } from './CareDLogo';
import { Calendar, PhoneCall, Copy, Check, Menu, X, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NavbarProps {
  promoCode: string;
  bookingUrl: string;
  onOpenBookingModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ promoCode, bookingUrl, onOpenBookingModal }) => {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.1 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top Banner Ribbon */}
      <div className="bg-[#143d2b] text-white py-1.5 px-4 text-xs font-medium">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center bg-[#c88d3e] text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide">
              CAMPAIGN
            </span>
            <span className="hidden sm:inline">สิทธิพิเศษสำหรับคนไข้ฟอกไต ปรึกษา อ.นพ.อนุชา ฟรีผ่าน Telemedicine</span>
            <span className="sm:hidden">ปรึกษาเรื่องเส้นฟอกไต ฟรี!</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-200 text-[11px]">ใช้โค้ด:</span>
              <button
                onClick={handleCopyCode}
                className="bg-emerald-900/80 hover:bg-emerald-800 text-amber-300 font-mono font-bold px-2 py-0.5 rounded border border-amber-400/40 flex items-center gap-1 transition-all active:scale-95"
                title="คลิกเพื่อคัดลอกโค้ดส่วนลด"
              >
                <span>{promoCode}</span>
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-80" />}
              </button>
            </div>
            <span className="text-[11px] text-emerald-300 hidden md:inline">ถึง 30 ต.ค. 2570</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#campaign-hero" className="flex items-center hover:opacity-95 transition-opacity">
          <CareDLogo size="md" />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
          <a href="#campaign-hero" className="hover:text-emerald-800 transition-colors">
            หน้าแคมเปญ
          </a>
          <a href="#symptom-checker" className="hover:text-emerald-800 transition-colors">
            เช็คอาการเส้นฟอกไต
          </a>
          <a href="#how-to-book" className="hover:text-emerald-800 transition-colors">
            ขั้นตอนนัดหมาย
          </a>
          <a href="#artwork-studio" className="hover:text-emerald-800 transition-colors flex items-center gap-1 text-emerald-900">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>สร้างสื่อ & แคปชั่น FB</span>
          </a>
          <a href="#doctor-profile" className="hover:text-emerald-800 transition-colors">
            เกี่ยวกับ อ.หมออนุชา
          </a>
          <a href="#faqs" className="hover:text-emerald-800 transition-colors">
            คำถามพบบ่อย
          </a>
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#16533c] hover:bg-[#124431] text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <Calendar className="w-4 h-4 text-emerald-300" />
            <span>นัดหมายอาจารย์อนุชา</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#16533c] text-white text-xs font-semibold py-2 px-3 rounded-lg flex items-center gap-1.5"
          >
            <span>นัดหมอทันที</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="เมนูนำทาง"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2.5 shadow-lg">
          <a
            href="#campaign-hero"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-emerald-800"
          >
            หน้าแคมเปญ
          </a>
          <a
            href="#symptom-checker"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-emerald-800"
          >
            เช็คอาการเส้นฟอกไตเบื้องต้น
          </a>
          <a
            href="#how-to-book"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-emerald-800"
          >
            3 ขั้นตอนนัดหมาย Telemedicine
          </a>
          <a
            href="#artwork-studio"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-emerald-800 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>สร้างสื่อดิจิทัล & แคปชั่นโพสต์ Facebook</span>
          </a>
          <a
            href="#doctor-profile"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-emerald-800"
          >
            ข้อมูลแพทย์ อาจารย์อนุชา
          </a>
          <a
            href="#faqs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-emerald-800"
          >
            คำถามที่พบบ่อย (FAQs)
          </a>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={handleCopyCode}
              className="w-full py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 font-mono font-bold text-xs flex items-center justify-center gap-2"
            >
              <span>คัดลอกโค้ด: {promoCode}</span>
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
