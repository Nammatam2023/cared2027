import React from 'react';
import { CareDLogo } from './CareDLogo';
import { ShieldCheck, ExternalLink, AlertTriangle } from 'lucide-react';

interface FooterProps {
  doctorName: string;
  promoCode: string;
  bookingUrl: string;
}

export const Footer: React.FC<FooterProps> = ({ doctorName, promoCode, bookingUrl }) => {
  return (
    <footer className="bg-[#103425] text-white pt-12 pb-24 border-t border-emerald-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-emerald-800/80">
          <div className="md:col-span-5">
            <CareDLogo theme="light" size="lg" />
            <p className="text-xs text-emerald-200 mt-3 leading-relaxed">
              Care D Clinic ร่วมกับ {doctorName} มุ่งมั่นส่งเสริมการดูแลรักษาหลอดเลือดฟอกเลือดสำหรับผู้ป่วยไตวายเรื้อรัง ให้เข้าถึงคำปรึกษาทางวิชาชีพแพทย์ที่ได้มาตรฐาน รวดเร็ว และไม่มีค่าใช้จ่าย
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-amber-300">
              <span className="font-mono bg-emerald-950/80 px-2 py-0.5 rounded border border-amber-400/30">
                โค้ดส่วนลด: {promoCode}
              </span>
              <span>ใช้ได้ถึง 30 ตุลาคม 2570</span>
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3">
              เงื่อนไขการใช้สิทธิ์
            </h4>
            <ul className="text-xs text-emerald-100 space-y-2">
              <li>• เฉพาะการนัดหมายปรึกษากับ {doctorName} เท่านั้น</li>
              <li>• สำหรับคนไข้ต้องการทำเส้นใหม่ หรือเส้นเดิมมีปัญหา ตีบ ตัน ปวด บวม</li>
              <li>• ให้คำปรึกษาผ่านระบบ Telemedicine (Doctor AtoZ)</li>
              <li>• สิทธิ์หมดอายุวันที่ 30 ตุลาคม 2570</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3">
              ระบบนัดหมายออนไลน์
            </h4>
            <p className="text-xs text-emerald-200 mb-3">
              ระบบบริหารจัดการโดย Doctor AtoZ แพลตฟอร์มการแพทย์ทางไกลมาตรฐานสากล
            </p>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-semibold"
            >
              <span>เปิดหน้าโปรไฟล์ นพ.อนุชา</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Medical emergency notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-emerald-300">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              กรณีเส้นฟอกไตมีเลือดออกพุ่ง แตก หรือมีอาการวิกฤต กรุณาเดินทางไปยังห้องฉุกเฉินโรงพยาบาลใกล้บ้านทันที
            </span>
          </div>

          <p className="text-emerald-400 shrink-0">
            © {new Date().getFullYear()} Care D Clinic. สงวนลิขสิทธิ์
          </p>
        </div>
      </div>
    </footer>
  );
};
