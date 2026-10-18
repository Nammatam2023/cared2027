import React from 'react';
import { MousePointerClick, Tag, Video, Calendar, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CareDLogo } from './CareDLogo';

interface BookingGuideProps {
  promoCode: string;
  bookingUrl: string;
}

export const BookingGuide: React.FC<BookingGuideProps> = ({ promoCode, bookingUrl }) => {
  return (
    <section id="how-to-book" className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            ขั้นตอนการใช้สิทธิ์
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-2">
            3 ขั้นตอนง่ายๆ ในการนัดหมายปรึกษาฟรี
          </h2>
          <p className="text-sm text-slate-600">
            ระบบ Doctor AtoZ ปลอดภัย ได้มาตรฐานการแพทย์ทางไกล ทำได้ทั้งบนสมาร์ทโฟนและคอมพิวเตอร์
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="relative bg-slate-50/70 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-300 shadow-2xs hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
              1
            </div>
            <div className="flex items-center gap-2 mb-2">
              <MousePointerClick className="w-4 h-4 text-emerald-700" />
              <h3 className="font-bold text-base text-slate-900">กดลิงก์ Doctor AtoZ</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              คลิกปุ่มนัดหมายเพื่อเปิดหน้าโปรไฟล์ของ <strong>อาจารย์ นพ.อนุชา</strong> บนระบบ Doctor AtoZ และเลือกวันเวลาที่สะดวกพูดคุย
            </p>
            <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span className="truncate">doctoratoz.co/doctor-profile/...</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative bg-amber-50/50 hover:bg-white rounded-2xl p-6 border border-amber-200/80 hover:border-amber-400 shadow-2xs hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
              2
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-amber-700" />
              <h3 className="font-bold text-base text-slate-900">ใส่โค้ด {promoCode}</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              ในขั้นตอนชำระเงิน ให้กรอกรหัสส่วนลด <strong>{promoCode}</strong> ยอดชำระจะเปลี่ยนเป็น <strong>0 บาท (ฟรี)</strong> ทันที
            </p>
            <div className="p-2.5 bg-white rounded-xl border border-amber-200 font-mono text-[11px] text-amber-900 flex items-center justify-between">
              <span>Promo Code: <strong className="text-amber-800">{promoCode}</strong></span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">ลด 100%</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative bg-emerald-50/40 hover:bg-white rounded-2xl p-6 border border-emerald-200/80 hover:border-emerald-400 shadow-2xs hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
              3
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Video className="w-4 h-4 text-emerald-700" />
              <h3 className="font-bold text-base text-slate-900">คุยวิดีโอคอลกับคุณหมอ</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              เมื่อถึงเวลานัด เปิดลิงก์วิดีโอคอลผ่านมือถือได้ทันที พูดคุยซักประวัติ ประเมินรอยแผล รอยบวม หรือวางแผนการผ่าตัดได้อย่างสบายใจ
            </p>
            <div className="p-2.5 bg-white rounded-xl border border-emerald-200 text-[11px] text-emerald-800 flex items-center justify-between">
              <span>ปลอดภัย เป็นส่วนตัว ไม่ต้องเดินทาง</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            </div>
          </div>
        </div>

        {/* Action Link */}
        <div className="mt-10 text-center">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#16533c] hover:bg-[#124431] text-white font-bold py-3.5 px-8 rounded-xl shadow-md hover:shadow-lg transition-all text-sm group"
          >
            <span>ไปที่หน้า Doctor AtoZ เพื่อนัดหมายเลย</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-xs text-slate-500 mt-2">
            *สิทธิ์ใช้ได้เฉพาะการนัดหมายกับ นพ.อนุชา เท่านั้น (หมดอายุ 30 ต.ค. 2570)
          </p>
        </div>
      </div>
    </section>
  );
};
