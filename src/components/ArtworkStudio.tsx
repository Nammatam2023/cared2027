import React, { useState, useRef, useEffect } from 'react';
import {
  Download,
  Copy,
  Check,
  Share2,
  Sparkles,
  Layout,
  Smartphone,
  Monitor,
  Square,
  ExternalLink,
  QrCode,
  HeartHandshake
} from 'lucide-react';
import { FACEBOOK_POST_TEMPLATES } from '../data/campaignData';
import { CareDLogo } from './CareDLogo';
import confetti from 'canvas-confetti';
import doctorPortraitImg from '../assets/images/dr_anucha_portrait_1792297688040.jpg';
import seniorPatientImg from '../assets/images/senior_patient_telemed_1792297702637.jpg';

interface ArtworkStudioProps {
  doctorName: string;
  promoCode: string;
  expiryDate: string;
  bookingUrl: string;
}

type AspectRatioType = '4:5' | '1:1' | '16:9' | '9:16';

export const ArtworkStudio: React.FC<ArtworkStudioProps> = ({
  doctorName,
  promoCode,
  expiryDate,
  bookingUrl
}) => {
  const [selectedRatio, setSelectedRatio] = useState<AspectRatioType>('4:5');
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [headlineVariation, setHeadlineVariation] = useState<'standard' | 'urgent' | 'prevention'>('standard');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentTemplate = FACEBOOK_POST_TEMPLATES[selectedTemplateIndex];

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(currentTemplate.text);
    setCopiedCaption(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 }
    });
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  const handleShareFacebook = () => {
    const shareUrl = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank', 'width=600,height=500');
  };

  const handleShareLine = () => {
    const text = encodeURIComponent(currentTemplate.text);
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(bookingUrl)}&text=${text}`, '_blank');
  };

  // Canvas drawing function for high resolution export
  const drawArtworkToCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 1080;
    let height = 1350; // default 4:5

    if (selectedRatio === '1:1') {
      width = 1080;
      height = 1080;
    } else if (selectedRatio === '16:9') {
      width = 1200;
      height = 675;
    } else if (selectedRatio === '9:16') {
      width = 1080;
      height = 1920;
    }

    canvas.width = width;
    canvas.height = height;

    // Background Gradient (Deep Clinical Emerald)
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, '#103928');
    bgGradient.addColorStop(0.5, '#16533c');
    bgGradient.addColorStop(1, '#0c2d20');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle header accent curve
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.beginPath();
    ctx.arc(width * 0.8, -100, 450, 0, Math.PI * 2);
    ctx.fill();

    // Top Brand Bar
    ctx.fillStyle = '#c88d3e';
    ctx.fillRect(0, 0, width, 12);

    // Brand Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Bai Jamjuree", "Prompt", sans-serif';
    ctx.fillText('Care D Clinic', 60, 80);

    ctx.fillStyle = '#d1fae5';
    ctx.font = '18px "Bai Jamjuree", "Prompt", sans-serif';
    ctx.fillText('TELEMEDICINE HEALTH CAMPAIGN', 60, 110);

    // Code Tag on top right
    ctx.fillStyle = 'rgba(200, 141, 62, 0.2)';
    ctx.strokeStyle = '#c88d3e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(width - 320, 50, 260, 60, 30);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`CODE: ${promoCode}`, width - 190, 88);
    ctx.textAlign = 'left';

    // Main Titles
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px "Prompt", "Bai Jamjuree", sans-serif';
    ctx.fillText('ปรึกษาฟรี ผ่าน Telemedicine', 60, 200);

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 52px "Prompt", "Bai Jamjuree", sans-serif';
    ctx.fillText('เรื่องเส้นฟอกไต กับ อาจารย์ นพ.อนุชา', 60, 265);

    // Conditions Card Container
    const cardY = selectedRatio === '16:9' ? 320 : 340;
    const cardH = selectedRatio === '16:9' ? 200 : 250;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(60, cardY, width - 120, cardH, 24);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 26px "Prompt", sans-serif';
    ctx.fillText('สำหรับคนไข้ฟอกไต และผู้เตรียมทำเส้น:', 90, cardY + 50);

    ctx.fillStyle = '#f8fafc';
    ctx.font = '24px "Sarabun", "Bai Jamjuree", sans-serif';
    ctx.fillText('✓ ต้องการทำเส้นฟอกไตใหม่ (วางแผนผ่าตัดเส้น AVF / AVG)', 90, cardY + 95);
    ctx.fillText('✓ เส้นเดิมมีปัญหา ตีบ ตัน ดับ ปวด บวม หรือเสี่ยงแตก', 90, cardY + 140);
    ctx.fillText('✓ ต้องการประเมิน พูดคุยปรึกษาแนวทางก่อนตัดสินใจผ่าตัด', 90, cardY + 185);

    // Promo Code Highlight Box
    const promoY = cardY + cardH + 40;
    ctx.fillStyle = '#0a2317';
    ctx.beginPath();
    ctx.roundRect(60, promoY, width - 120, 160, 20);
    ctx.fill();

    ctx.strokeStyle = '#c88d3e';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#6ee7b7';
    ctx.font = '20px "Prompt", sans-serif';
    ctx.fillText('รหัสส่วนลดปรึกษาฟรี 100% (ลดค่าบริการเหลือ 0 บาท)', 90, promoY + 45);

    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 48px monospace';
    ctx.fillText(promoCode, 90, promoY + 110);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '20px "Prompt", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`หมดอายุ: ${expiryDate}`, width - 90, promoY + 80);
    ctx.fillText('ใช้กับแพทย์ นพ.อนุชา เท่านั้น', width - 90, promoY + 115);
    ctx.textAlign = 'left';

    // Bottom Footer / Call to action
    const bottomY = height - 120;
    ctx.fillStyle = '#c88d3e';
    ctx.beginPath();
    ctx.roundRect(60, bottomY, width - 120, 80, 16);
    ctx.fill();

    ctx.fillStyle = '#0f291e';
    ctx.font = 'bold 26px "Prompt", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('นัดหมายผ่าน Doctor AtoZ หรือสแกน QR Code เพื่อรับสิทธิ์ทันที', width / 2, bottomY + 50);
    ctx.textAlign = 'left';
  };

  useEffect(() => {
    drawArtworkToCanvas();
  }, [selectedRatio, headlineVariation]);

  const handleDownloadArtwork = () => {
    setIsExporting(true);
    drawArtworkToCanvas();
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) {
        setIsExporting(false);
        return;
      }
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `CareD_Telemed_DoctorAnucha_${selectedRatio.replace(':', '_')}.png`;
      a.click();
      setIsExporting(false);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 }
      });
    }, 200);
  };

  return (
    <section id="artwork-studio" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>สำหรับคลินิก เจ้าหน้าที่ ญาติคนไข้ และโซเชียลมีเดีย</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            เครื่องมือสร้างสื่อดิจิทัล & โพสต์ Facebook ประชาสัมพันธ์
          </h2>
          <p className="text-sm text-slate-600">
            สร้างและดาวน์โหลดภาพโปสเตอร์ความละเอียดสูงพร้อมแคปชั่นที่จัดเตรียมไว้ให้ 1 คลิก เพื่อโพสต์ลง Facebook หรือส่งต่อทาง LINE ได้ทันที
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Artwork Preview & Format Controls */}
          <div className="lg:col-span-7 bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Layout className="w-4 h-4 text-emerald-700" />
                <span>เลือกสัดส่วนภาพสำหรับโซเชียลมีเดีย:</span>
              </span>

              {/* Aspect Ratio Buttons */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setSelectedRatio('4:5')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all flex items-center gap-1 ${
                    selectedRatio === '4:5'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Facebook Vertical Mobile Feed (1080x1350)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>4:5 FB ฟีด</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRatio('1:1')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all flex items-center gap-1 ${
                    selectedRatio === '1:1'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Square Post 1:1"
                >
                  <Square className="w-3.5 h-3.5" />
                  <span>1:1 สี่เหลี่ยม</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRatio('16:9')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all flex items-center gap-1 ${
                    selectedRatio === '16:9'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Landscape Banner 16:9"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>16:9 แบนเนอร์</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRatio('9:16')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all flex items-center gap-1 ${
                    selectedRatio === '9:16'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Story / Reels 9:16"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>9:16 สตอรี่</span>
                </button>
              </div>
            </div>

            {/* Live Interactive Artwork Preview Card */}
            <div className="relative mx-auto max-w-md bg-gradient-to-b from-[#143d2b] to-[#0c281d] rounded-2xl p-5 text-white shadow-xl border border-emerald-800/80 overflow-hidden">
              {/* Header Logo */}
              <div className="flex items-center justify-between pb-3 border-b border-emerald-700/60 mb-3">
                <CareDLogo theme="light" size="sm" />
                <span className="text-[11px] font-mono text-amber-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-amber-400/30">
                  CODE: {promoCode}
                </span>
              </div>

              {/* Main Artwork Title */}
              <div className="mb-3">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  ปรึกษาฟรี <span className="text-emerald-400">ผ่าน Telemedicine</span>
                </h3>
                <p className="text-sm font-semibold text-emerald-200">
                  เรื่องเส้นฟอกไต กับ อาจารย์ นพ.อนุชา
                </p>
              </div>

              {/* Imagery Banner */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="rounded-xl overflow-hidden aspect-4/3 bg-slate-800 relative">
                  <img
                    src={doctorPortraitImg}
                    alt="อ.นพ.อนุชา"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 p-1.5 text-[10px] text-white font-medium">
                    อาจารย์ นพ.อนุชา
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden aspect-4/3 bg-slate-800 relative">
                  <img
                    src={seniorPatientImg}
                    alt="คนไข้ฟอกไต"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 p-1.5 text-[10px] text-amber-300 font-medium">
                    วิดีโอคอลจากบ้าน
                  </div>
                </div>
              </div>

              {/* Target Conditions Badge */}
              <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-800/60 mb-3 text-xs">
                <p className="font-bold text-amber-300 mb-1">สำหรับคนไข้ฟอกไต 3 กลุ่ม:</p>
                <p className="text-[11px] text-emerald-100">• ต้องการทำเส้นใหม่ (AVF / AVG)</p>
                <p className="text-[11px] text-emerald-100">• เส้นมีปัญหา ตีบ ตัน ดับ ปวด บวม แตก</p>
                <p className="text-[11px] text-emerald-100">• ต้องการประเมินคุยก่อนตัดสินใจทำเส้น</p>
              </div>

              {/* Promo Code & Validity */}
              <div className="bg-[#0b2419] p-3 rounded-xl border border-amber-400/40 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-emerald-300 block">ใช้โค้ดส่วนลด 100% ฟรี:</span>
                  <span className="text-lg font-mono font-black text-amber-300">{promoCode}</span>
                </div>
                <div className="text-right text-[10px] text-emerald-200">
                  <p>หมดอายุ: 30/10/2027</p>
                  <p className="text-amber-300">เฉพาะกับ อ.อนุชา</p>
                </div>
              </div>

              {/* Bottom booking CTA */}
              <div className="mt-3 text-center pt-2 border-t border-emerald-800/60">
                <p className="text-[11px] text-amber-300 font-semibold flex items-center justify-center gap-1">
                  <span>นัดหมายผ่าน Doctor AtoZ ทันที</span>
                  <ExternalLink className="w-3 h-3" />
                </p>
              </div>
            </div>

            {/* Hidden canvas for high resolution PNG export */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Download Button */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleDownloadArtwork}
                disabled={isExporting}
                className="w-full sm:flex-1 py-3 px-4 bg-[#16533c] hover:bg-[#124431] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4 text-emerald-300" />
                <span>{isExporting ? 'กำลังเตรียมไฟล์ภาพ...' : `ดาวน์โหลดภาพโปสเตอร์ (${selectedRatio} PNG)`}</span>
              </button>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleShareFacebook}
                  className="flex-1 sm:flex-none py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  title="แชร์ลง Facebook"
                >
                  <Share2 className="w-4 h-4" />
                  <span>แชร์ FB</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareLine}
                  className="flex-1 sm:flex-none py-3 px-4 bg-[#06c755] hover:bg-[#05b34c] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  title="แชร์ไปยัง LINE"
                >
                  <span>แชร์ LINE</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Ready-to-Post Facebook Captions */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span>แคปชั่นพร้อมโพสต์ Facebook</span>
                </h3>

                {/* Caption switcher */}
                <div className="flex gap-1 text-[11px]">
                  {FACEBOOK_POST_TEMPLATES.map((tmpl, idx) => (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => setSelectedTemplateIndex(idx)}
                      className={`px-2 py-1 rounded-md transition-colors ${
                        selectedTemplateIndex === idx
                          ? 'bg-emerald-100 text-emerald-900 font-bold'
                          : 'text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      แบบ {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs font-semibold text-emerald-900 mb-2">
                {currentTemplate.title}
              </p>

              {/* Caption Display Box */}
              <div className="relative">
                <textarea
                  readOnly
                  value={currentTemplate.text}
                  rows={13}
                  className="w-full text-xs font-sans text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 resize-none focus:outline-hidden font-normal leading-relaxed"
                />
              </div>
            </div>

            {/* Copy Caption CTA */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleCopyCaption}
                className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
              >
                {copiedCaption ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950" />
                    <span>คัดลอกข้อความแคปชั่นเรียบร้อยแล้ว!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>คัดลอกข้อความแคปชั่น Facebook</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-500 text-center">
                *คัดลอกแล้วนำไปแปะโพสต์บนเพจคลินิก Facebook ส่วนตัว หรือส่งให้ญาติผู้ป่วยได้เลย
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
