import React, { useState } from 'react';
import {
  Calendar,
  PhoneCall,
  Video,
  Copy,
  Check,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  QrCode,
  Sparkles,
  ChevronRight,
  HeartPulse,
  Share2
} from 'lucide-react';
import { CareDLogo } from './CareDLogo';
import { QRCodeDisplay } from './QRCodeDisplay';
import { CampaignInfo } from '../types/campaign';
import confetti from 'canvas-confetti';
import doctorPortraitImg from '../assets/images/dr_anucha_portrait_1792297688040.jpg';
import seniorPatientImg from '../assets/images/senior_patient_telemed_1792297702637.jpg';

interface HeroCampaignProps {
  campaign: CampaignInfo;
  onOpenAssessment: () => void;
  onOpenArtworkStudio: () => void;
}

export const HeroCampaign: React.FC<HeroCampaignProps> = ({
  campaign,
  onOpenAssessment,
  onOpenArtworkStudio
}) => {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(campaign.promoCode);
    setCopied(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.4 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
  };

  const handleShareLine = () => {
    const text = encodeURIComponent(
      `ปรึกษาฟรีผ่าน Telemedicine เรื่องเส้นฟอกไต กับ อาจารย์ นพ.อนุชา (Care D Clinic) ใช้โค้ด: ${campaign.promoCode} จองคิว: ${campaign.doctorProfileUrl}`
    );
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}&text=${text}`, '_blank');
  };

  return (
    <section id="campaign-hero" className="relative pt-6 pb-16 overflow-hidden">
      {/* Background Subtle Gradient & Accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#eaf3ee]/60 via-[#f8faf8] to-white pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Campaign Announcement Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200/80 rounded-full text-xs text-emerald-900 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>โครงการบริการสุขภาพ Telemedicine เพื่อผู้ป่วยโรคไตเรื้อรัง</span>
            <span className="text-emerald-400">·</span>
            <span className="font-semibold text-emerald-800">Care D Clinic</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenArtworkStudio}
              className="text-xs font-medium text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 bg-white border border-emerald-200 px-3 py-1.5 rounded-lg shadow-2xs hover:shadow-xs transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>ดาวน์โหลดโปสเตอร์ / แคปชั่น FB</span>
            </button>
            <button
              onClick={handleShareFacebook}
              className="text-xs font-medium text-blue-700 hover:text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
              title="แชร์ไปยัง Facebook"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">แชร์ FB</span>
            </button>
          </div>
        </div>

        {/* Main Artwork Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Artwork Presentation (Doctor & Senior Patient) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative bg-gradient-to-br from-[#16533c] to-[#0f3a2a] p-4 rounded-3xl shadow-xl border border-emerald-900/30 text-white overflow-hidden">
              {/* Care D Clinic Header in poster */}
              <div className="flex items-center justify-between pb-3 border-b border-emerald-700/60 mb-3">
                <CareDLogo theme="light" size="sm" />
                <span className="text-[11px] font-mono tracking-wider text-amber-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  CODE: {campaign.promoCode}
                </span>
              </div>

              {/* Photo Collage matching the official poster */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                {/* Doctor Portrait */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-800 aspect-3/4 shadow-md group">
                  <img
                    src={doctorPortraitImg}
                    alt="อาจารย์ นพ.อนุชา"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-transparent p-2.5">
                    <p className="text-xs font-bold text-white">อาจารย์ นพ.อนุชา</p>
                    <p className="text-[10px] text-emerald-300">แพทย์ผู้เชี่ยวชาญเส้นฟอกไต</p>
                  </div>
                </div>

                {/* Senior Patient using Telemed */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-800 aspect-3/4 shadow-md group">
                  <img
                    src={seniorPatientImg}
                    alt="คนไข้ฟอกไตปรึกษาจากที่บ้าน"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-transparent p-2.5">
                    <p className="text-xs font-bold text-white">ปรึกษาจากที่บ้าน</p>
                    <p className="text-[10px] text-amber-300">สะดวก ปลอดภัย ไม่ต้องเดินทาง</p>
                  </div>
                </div>
              </div>

              {/* Condition Highlights inside card */}
              <div className="bg-emerald-950/80 rounded-2xl p-3 border border-emerald-800/60">
                <p className="text-xs font-bold text-amber-300 mb-1.5 flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5 text-amber-400" />
                  สำหรับคนไข้ฟอกไต และผู้เตรียมทำเส้น:
                </p>
                <ul className="text-[11px] text-emerald-100 space-y-1">
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>ต้องการทำเส้นใหม่ หรือวางแผนผ่าตัดเส้นฟอกไต</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>เส้นเดิมมีปัญหา ตีบ ตัน ดับ ปวด บวม หรือเสี่ยงแตก</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>ต้องการประเมิน คุยทำเส้นก่อนตัดสินใจผ่าตัด</span>
                  </li>
                </ul>
              </div>

              {/* Quick bottom note in poster card */}
              <div className="mt-3 pt-3 border-t border-emerald-800/60 flex items-center justify-between text-[11px] text-emerald-200">
                <span>Telemedicine เฉพาะกับ อ.หมออนุชา เท่านั้น</span>
                <button
                  onClick={() => setShowQrModal(true)}
                  className="text-amber-300 hover:text-amber-200 underline font-medium flex items-center gap-1"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>ดู QR Code</span>
                </button>
              </div>
            </div>

            {/* Quick action buttons under poster */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onOpenAssessment}
                className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-4 h-4 text-emerald-700" />
                <span>ประเมินอาการเส้น 30 วิ</span>
              </button>

              <button
                onClick={() => setShowQrModal(true)}
                className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4 text-emerald-700" />
                <span>สแกน QR Code นัดหมอ</span>
              </button>
            </div>
          </div>

          {/* Right Column: Campaign Headline, Benefits, and One-Click Interactive Booking */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Doctor & Clinic Titles */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-emerald-800 tracking-wide uppercase">
                  Care D Clinic Telemedicine Campaign
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-xs font-medium text-slate-500">สำหรับคนไข้ฟอกไตทั่วประเทศ</span>
              </div>

              {/* Main Punchy Thai Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#143d2b] leading-[1.2] tracking-tight mb-4">
                ปรึกษาอาจารย์อนุชา <br className="hidden sm:inline" />
                <span className="text-emerald-700">เรื่องเส้นฟอกไต ฟรี!</span> <br />
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">
                  ผ่านระบบ Telemedicine
                </span>
              </h1>

              {/* Sub-description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 font-normal">
                ให้คุณและครอบครัวได้ปรึกษาปัญหาสุขภาพหลอดเลือดสำหรับฟอกเลือดกับ{' '}
                <strong className="text-slate-900 font-semibold">อาจารย์ นพ.อนุชา</strong> โดยตรง
                หมดกังวลเรื่องการเดินทาง นัดหมายง่าย คุยชัดเจนจากบ้าน พร้อมวางแผนการรักษาที่ตรงจุดและปลอดภัยที่สุด
              </p>

              {/* The 3 Target Patient Conditions Box */}
              <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm mb-6">
                <h3 className="text-sm font-bold text-emerald-950 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span>เงื่อนไขผู้รับสิทธิ์ปรึกษาฟรี (ครอบคลุม 3 กลุ่มหลัก)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#f3f8f5] p-3.5 rounded-xl border border-emerald-100">
                    <div className="w-6 h-6 rounded-lg bg-emerald-800 text-white text-xs font-bold flex items-center justify-center mb-2">
                      1
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mb-1">ต้องการทำเส้นใหม่</h4>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      วางแผนผ่าตัดเส้นฟอกเลือด AVF / AVG หรือเตรียมความพร้อมก่อนเริ่มฟอกเลือด
                    </p>
                  </div>

                  <div className="bg-[#fef9f2] p-3.5 rounded-xl border border-amber-200/70">
                    <div className="w-6 h-6 rounded-lg bg-amber-600 text-white text-xs font-bold flex items-center justify-center mb-2">
                      2
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mb-1">เส้นเดิมมีปัญหา</h4>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      อาการตีบ ตัน เสียงฟู่หาย (เส้นดับ) ปวด บวม แขนตึง หรือผิวบางเสี่ยงแตก
                    </p>
                  </div>

                  <div className="bg-[#f0f9ff] p-3.5 rounded-xl border border-sky-100">
                    <div className="w-6 h-6 rounded-lg bg-sky-700 text-white text-xs font-bold flex items-center justify-center mb-2">
                      3
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mb-1">ปรึกษาก่อนตัดสินใจ</h4>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      ต้องการประเมินตรวจซ้ำ ขอความเห็นที่ 2 (Second Opinion) ก่อนลงมีดผ่าตัด
                    </p>
                  </div>
                </div>
              </div>

              {/* Promo Code & Instant Booking Interactive Box */}
              <div className="bg-gradient-to-r from-[#143d2b] to-[#16533c] rounded-2xl p-6 text-white shadow-lg mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-700/70">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-200">
                      รหัสส่วนลดปรึกษาฟรี 100%
                    </span>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-3xl sm:text-4xl font-mono font-black tracking-wider text-amber-300">
                        {campaign.promoCode}
                      </span>
                      <button
                        onClick={handleCopyCode}
                        className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-[#143d2b] text-xs font-bold py-2 px-3.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-900" />
                            <span>คัดลอกโค้ดแล้ว!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>กดคัดลอกโค้ด</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-xs text-emerald-200">ระยะเวลาแคมเปญ</p>
                    <p className="text-sm font-semibold text-white mt-0.5">หมดอายุ {campaign.expiryDateText}</p>
                    <p className="text-[11px] text-amber-300/90 mt-0.5">ใช้กับแพทย์ อนุชา เท่านั้น</p>
                  </div>
                </div>

                {/* Big Booking Action */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={campaign.doctorProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-center py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group text-base"
                  >
                    <Calendar className="w-5 h-5 text-emerald-950 group-hover:scale-110 transition-transform" />
                    <span>กดที่นี่ เพื่อทำการนัดหมายกับอาจารย์อนุชา</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setShowQrModal(true)}
                    className="bg-emerald-900/90 hover:bg-emerald-800 text-white font-medium py-3.5 px-4 rounded-xl border border-emerald-700/60 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <QrCode className="w-5 h-5 text-amber-300" />
                    <span className="hidden sm:inline">สแกน QR</span>
                    <span className="sm:hidden">แสดง QR Code นัดหมาย</span>
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-emerald-200">
                  <span className="truncate">ลิงก์: {campaign.doctorProfileUrl}</span>
                  <span className="shrink-0 text-amber-300 ml-2">ลด 100% ฟรี</span>
                </div>
              </div>
            </div>

            {/* Trust points */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-200 text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-xs font-medium">แพทย์เฉพาะทางโดยตรง</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-xs font-medium">คุยผ่านวิดีโอคอลคมชัด</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-xs font-medium">ประเมินเส้นอย่างละเอียด</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-xs font-medium">ฟรี 100% ไม่มีค่าบริการ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-emerald-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <CareDLogo showText={false} size="sm" />
                <h3 className="font-bold text-slate-900 text-sm">QR Code นัดหมาย อ.หมออนุชา</h3>
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <QRCodeDisplay
              url={campaign.doctorProfileUrl}
              doctorName={campaign.doctorName}
              promoCode={campaign.promoCode}
              size={220}
            />

            <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 text-center">
              <p className="font-semibold">อย่าลืมใส่โค้ด: {campaign.promoCode}</p>
              <p className="text-[11px] text-amber-800 mt-0.5">ในขั้นตอนจองคิว เพื่อรับสิทธิ์ปรึกษาฟรี</p>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
