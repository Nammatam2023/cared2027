import React from 'react';
import { Stethoscope, Award, HeartPulse, CheckCircle2, Shield, Calendar, ExternalLink } from 'lucide-react';
import { CareDLogo } from './CareDLogo';
import doctorPortraitImg from '../assets/images/dr_anucha_portrait_1792297688040.jpg';

interface DoctorProfileProps {
  doctorName: string;
  doctorProfileUrl: string;
  promoCode: string;
}

export const DoctorProfile: React.FC<DoctorProfileProps> = ({
  doctorName,
  doctorProfileUrl,
  promoCode
}) => {
  return (
    <section id="doctor-profile" className="py-16 bg-[#f8faf8] border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Doctor Portrait Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden bg-white shadow-xl border border-emerald-100 p-3">
              <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={doctorPortraitImg}
                  alt={doctorName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#143d2b]/90 backdrop-blur-xs text-white text-[11px] font-semibold py-1 px-3 rounded-full border border-emerald-500/30">
                  แพทย์ผู้เชี่ยวชาญ
                </div>
              </div>

              <div className="p-4 text-center">
                <h3 className="text-xl font-bold text-slate-900">{doctorName}</h3>
                <p className="text-xs font-semibold text-emerald-800 mt-1">
                  ศัลยแพทย์ผู้เชี่ยวชาญด้านการผ่าตัดและดูแลเส้นฟอกไต
                </p>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-2">
                  <CareDLogo size="sm" showText={true} />
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Bio and Clinical Focus */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
              <Stethoscope className="w-3.5 h-3.5 text-emerald-700" />
              <span>ความเชี่ยวชาญเฉพาะทาง</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 leading-snug">
              ดูแลเส้นฟอกไตทุกระยะ <br />
              <span className="text-emerald-700">เพราะเส้นฟอกเลือดคือ &ldquo;สายใยแห่งชีวิต&rdquo;</span>
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
              เส้นฟอกเลือด (Vascular Access) เป็นหัวใจสำคัญที่สุดของผู้ป่วยไตวายเรื้อรังที่ได้รับการบำบัดทดแทนไตด้วยการฟอกเลือด (Hemodialysis) การมีเส้นที่ทำงานสมบูรณ์ ช่วยให้ฟอกเลือดได้เต็มประสิทธิภาพ ของเสียลดลง และลดความเสี่ยงจากการติดเชื้อ
            </p>

            {/* Procedures and Clinical Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ผ่าตัดเส้นฟอกไตธรรมชาติ (AVF)</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  ต่อเส้นเลือดแดงกับเส้นเลือดดำตัวเอง ทนทานและเสี่ยงติดเชื้อต่ำที่สุด
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ผ่าตัดเส้นฟอกไตเทียม (AVG)</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  สำหรับผู้ที่มีหลอดเลือดธรรมชาติขนาดเล็กหรือเคยผ่าตัดมาแล้ว
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ขยายหลอดเลือดบอลลูน (Fistuloplasty)</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  แก้ไขเส้นตีบ ตัน หรือการไหลเวียนเลือดไม่สะดวกโดยไม่ต้องผ่าตัดใหญ่
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ใส่สายฟอกไตชั่วคราวและกึ่งถาวร (PermCath)</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  ดูแลและวางแผนเปลี่ยนผ่านสู่เส้นถาวรอย่างปลอดภัย
                </p>
              </div>
            </div>

            <div className="p-4 bg-emerald-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-emerald-200">สิทธิ์ปรึกษาฟรีด้วยโค้ด</p>
                <p className="text-lg font-mono font-bold text-amber-300">{promoCode}</p>
                <p className="text-[11px] text-emerald-200 mt-0.5">ใช้ได้ถึง 30 ตุลาคม 2570 บน Doctor AtoZ</p>
              </div>

              <a
                href={doctorProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-2.5 px-5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>นัดหมายอาจารย์อนุชา</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
