/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Share2, QrCode } from 'lucide-react';
import { CareDLogo } from './components/CareDLogo';
import doctorPortraitImg from './assets/images/dr_anucha_portrait_1792297688040.jpg';
import seniorPatientImg from './assets/images/senior_patient_telemed_1792297702637.jpg';

export default function App() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [headlineFont, setHeadlineFont] = useState<'noto' | 'prompt' | 'kanit'>('noto');

  const telemedUrl = 'https://m2.doctoratoz.co/doctor-profile/DTH1553341028240';
  const promoCode = 'cared2027';
  const qrSvgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    telemedUrl
  )}&color=16-83-60&bgcolor=255-255-255&margin=2&format=svg`;

  const facebookCaption = `ปรึกษาอาจารย์อนุชา สำหรับคนไข้ฟอกไต ฟรี ผ่าน Telemedicine

เงื่อนไข : 
- คนไข้ต้องการทำเส้นฟอกไตใหม่ 
- คนไข้มีปัญหาเส้นเก่า ตีบ ตัน ดับ ปวด บวม แตก 
- คนไข้ต้องการประเมินคุยทำเส้นก่อนตัดสินใจ 

ข้อ1. code: cared2027
หมดอายุ 30/10/2027 (30 ตุลาคม 2570)
ใช้กับแพทย์ อนุชา เท่านั้น

ข้อ2. ลิงก์ Telemed อาจารย์อนุชา กดเพื่อทำการนัดหมาย โทรปรึกษากับอาจารย์ได้เลย:
👉 ${telemedUrl}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(facebookCaption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(telemedUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=500');
  };

  const headlineFontClass =
    headlineFont === 'prompt' ? 'font-prompt' : headlineFont === 'noto' ? 'font-noto' : 'font-kanit';

  return (
    <div className="min-h-screen bg-[#eef3f0] py-4 sm:py-8 px-2 sm:px-4 flex flex-col items-center justify-center font-sans selection:bg-[#16533c] selection:text-white">
      {/* Top Quick Utility Bar (For sharing on Facebook or copying link/caption) */}
      <div className="w-full max-w-3xl mb-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
        <div className="flex items-center gap-1.5 text-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-semibold text-[#16533c]">Care D Clinic</span>
          <span className="text-slate-400">·</span>
          {/* Quick font toggle */}
          <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200">
            <span className="text-[11px] text-slate-500">ฟอนต์:</span>
            <button
              onClick={() => setHeadlineFont('noto')}
              className={`px-1.5 py-0.5 text-[11px] rounded transition-colors ${
                headlineFont === 'noto'
                  ? 'bg-[#16533c] text-white font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Noto Sans (อ่านง่าย)
            </button>
            <button
              onClick={() => setHeadlineFont('prompt')}
              className={`px-1.5 py-0.5 text-[11px] rounded transition-colors ${
                headlineFont === 'prompt'
                  ? 'bg-[#16533c] text-white font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Prompt
            </button>
            <button
              onClick={() => setHeadlineFont('kanit')}
              className={`px-1.5 py-0.5 text-[11px] rounded transition-colors ${
                headlineFont === 'kanit'
                  ? 'bg-[#16533c] text-white font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kanit
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCaption}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-lg border border-slate-300 shadow-2xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            title="คัดลอกข้อความสำหรับนำไปโพสต์ Facebook"
          >
            {copiedCaption ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">คัดลอกแคปชั่นแล้ว</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>คัดลอกข้อความโพสต์ FB</span>
              </>
            )}
          </button>

          <button
            onClick={handleShareFacebook}
            className="px-3 py-1.5 bg-[#1877f2] hover:bg-[#166fe5] text-white font-medium rounded-lg shadow-2xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>แชร์ลง Facebook</span>
          </button>
        </div>
      </div>

      {/* Main Single Page Poster Artwork Container (Exact Layout from Image) */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-950/10">
        
        {/* Top Visual Section: Doctor, Patient, and Headlines */}
        <div className="relative bg-[#f8faf7] p-5 sm:p-8 overflow-hidden">
          {/* Subtle warm clinic background */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left: Doctor Anucha Presentation */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[280px] aspect-3/4 rounded-2xl overflow-hidden shadow-md border-2 border-white bg-slate-100">
                <img
                  src={doctorPortraitImg}
                  alt="อาจารย์แพทย์อนุชา Care D Clinic"
                  className="w-full h-full object-cover object-top"
                />
                {/* Lab Coat Pocket Emblem Simulation */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs border border-emerald-100">
                  <div className="flex items-center gap-1">
                    <CareDLogo showText={false} size="sm" />
                    <div className="text-[10px] leading-tight font-bold text-[#16533c]">
                      <span>care·D clinic</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-noto mt-2 text-sm font-bold text-[#16533c] text-center">
                อาจารย์ นพ. อนุชา
              </p>
            </div>

            {/* Right: Headlines + Patient Telemed Image */}
            <div className="md:col-span-7 flex flex-col justify-between h-full space-y-4">
              <div>
                {/* Logo and Brand */}
                <div className="flex items-center gap-2 mb-2">
                  <CareDLogo size="md" />
                </div>

                {/* Big Green Headlines with High Legibility */}
                <h1 className={`${headlineFontClass} text-5xl sm:text-6xl font-black text-[#16533c] tracking-normal leading-[1.18] mb-1.5`}>
                  ปรึกษาฟรี
                </h1>
                <h2 className={`${headlineFontClass} text-2xl sm:text-3xl font-extrabold text-[#16533c] tracking-normal mb-2`}>
                  ผ่าน Telemedicine
                </h2>
                
                {/* Dividing Line */}
                <div className="w-full h-0.5 bg-[#16533c]/30 my-2" />

                <h3 className={`${headlineFontClass} text-2xl sm:text-3xl font-bold text-[#16533c] tracking-normal`}>
                  เรื่องเส้นฟอกไต
                </h3>
              </div>

              {/* Patient Photo Consultation Visual */}
              <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <img
                  src={seniorPatientImg}
                  alt="คนไข้ฟอกไต ปรึกษาผ่าน Telemedicine"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                  <p className="text-xs text-white font-medium">
                    โทรปรึกษากับอาจารย์ได้เลย ผ่านระบบ Telemedicine
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Middle Solid Green Banner: Target Patient Conditions */}
        <div className="bg-[#16533c] text-white p-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            
            {/* Left Label with Dynamic Movement, Glowing Shimmer, and Pulsing Badge */}
            <div className="sm:col-span-5 text-center sm:text-left flex flex-col items-center sm:items-start">
              <div className="relative inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#0c2a1e] border-2 border-amber-300/80 shadow-lg animate-badge-glow">
                {/* Pulsing indicator dot */}
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-300 shadow-xs"></span>
                </span>
                
                <h4 className="font-noto text-2xl sm:text-3xl font-black tracking-tight animate-text-shimmer select-none leading-tight">
                  สำหรับ<br />คนไข้ฟอกไต
                </h4>
              </div>

              {/* Pulsing golden sub-label to grab attention */}
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-amber-300 font-semibold tracking-wide">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>สิทธิพิเศษครอบคลุม 3 กลุ่มอาการ</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block sm:col-span-1 h-16 w-[1px] bg-white/30 mx-auto" />

            {/* Right Conditions (Exact 3 Conditions) */}
            <div className="sm:col-span-6 space-y-1.5 text-sm sm:text-base font-normal font-noto">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 shadow-xs" />
                <span>ต้องการทำเส้นใหม่</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 shadow-xs" />
                <span className="font-medium text-amber-100">เส้นเดิมมีปัญหา ตีบ ตัน ดับ ปวด บวม แตก</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 shadow-xs" />
                <span>ปรึกษาก่อนตัดสินใจทำเส้น</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section: Logo, Promo Code, Action Button, and QR Code */}
        <div className="bg-white p-5 sm:p-6 border-t border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            
            {/* Care D Clinic Logo */}
            <div className="sm:col-span-3 flex justify-center sm:justify-start">
              <CareDLogo size="md" />
            </div>

            {/* Code cared2027 Section */}
            <div className="sm:col-span-4 border-y sm:border-y-0 sm:border-x border-slate-200 py-3 sm:py-0 px-0 sm:px-4 text-center sm:text-left">
              <span className="text-xs text-slate-500 font-medium block">
                ใช้โค้ด
              </span>
              <div className="flex items-center justify-center sm:justify-start gap-2 my-0.5">
                <span className="text-2xl sm:text-3xl font-mono font-black text-[#16533c] tracking-tight">
                  {promoCode}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#16533c] transition-colors border border-emerald-200"
                  title="คัดลอกโค้ด"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                ถึง 30 ตุลาคม 2570 (2027)
              </p>
            </div>

            {/* Link Telemed Button + QR Code Section */}
            <div className="sm:col-span-5 flex items-center justify-between gap-3">
              <div className="flex-1 text-center sm:text-left">
                <a
                  href={telemedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-noto w-full inline-flex items-center justify-center gap-1.5 bg-[#16533c] hover:bg-[#124431] text-white font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm shadow-sm hover:shadow transition-all group"
                >
                  <span>นัดหมายผ่านลิงก์ที่แนบ</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">&gt;</span>
                </a>
                <p className="text-[11px] text-slate-500 mt-1">
                  หรือสแกน QR CODE นี้เท่านั้น
                </p>
              </div>

              {/* QR Code */}
              <a
                href={telemedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 w-20 h-20 p-1 rounded-xl border border-slate-200 hover:border-[#16533c] transition-colors bg-white shadow-2xs group"
                title="กดเพื่อเปิดหน้าโปรไฟล์ นพ.อนุชา"
              >
                <img
                  src={qrSvgUrl}
                  alt="QR Code สำหรับนัดหมายอาจารย์อนุชา"
                  className="w-full h-full object-contain"
                />
              </a>
            </div>

          </div>

          {/* Footer Direct Link and Restriction */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-xs">
            <a
              href={telemedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#16533c] hover:underline font-mono text-[11px] sm:text-xs flex items-center gap-1 truncate max-w-full"
            >
              <span>{telemedUrl}</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>

            <span className="text-slate-600 font-semibold text-[11px] sm:text-xs">
              Telemedicine เฉพาะกับอาจารย์หมออนุชาเท่านั้น
            </span>
          </div>
        </div>

      </div>

      {/* Direct One-Click Call to Action Floating Bar for Mobile / Browser */}
      <div className="w-full max-w-3xl mt-4 bg-white/90 backdrop-blur-xs rounded-xl p-3 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">รหัสส่วนลดปรึกษาฟรี:</span>
          <span className="font-mono font-bold text-[#16533c] text-sm bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {promoCode}
          </span>
          <button
            onClick={handleCopyCode}
            className="text-emerald-700 hover:text-emerald-900 font-medium underline cursor-pointer"
          >
            {copiedCode ? 'คัดลอกแล้ว' : 'คัดลอก'}
          </button>
        </div>

        <a
          href={telemedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto py-2 px-5 bg-[#16533c] hover:bg-[#124431] text-white font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all"
        >
          <span>กดเพื่อทำการนัดหมาย โทรปรึกษากับอาจารย์ได้เลย</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
