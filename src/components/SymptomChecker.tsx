import React, { useState } from 'react';
import { SYMPTOM_QUESTIONS } from '../data/campaignData';
import { AlertTriangle, CheckCircle, HelpCircle, Activity, Calendar, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SymptomCheckerProps {
  doctorName: string;
  bookingUrl: string;
  promoCode: string;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({ doctorName, bookingUrl, promoCode }) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (questionId: string, score: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: score
    }));
  };

  const isCompleted = SYMPTOM_QUESTIONS.every(q => answers[q.id] !== undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCompleted) return;
    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  // Evaluate results
  const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
  const hasUrgent = Object.entries(answers).some(([qId, score]) => {
    const q = SYMPTOM_QUESTIONS.find(item => item.id === qId);
    return q?.options.some(opt => opt.score === score && opt.isUrgent);
  });

  return (
    <section id="symptom-checker" className="py-16 bg-[#f4f8f5]/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>แบบประเมินสุขภาพเส้นฟอกไตออนไลน์</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            ตรวจเช็คสัญญาณเตือนเส้นฟอกไตเบื้องต้น
          </h2>
          <p className="text-sm text-slate-600">
            ใช้เวลาเพียง 30 วินาที เพื่อเช็คว่าเส้นฟอกไตของคุณมีภาวะตีบ ตัน หรือเสี่ยงดับหรือไม่ เพื่อให้คุณหมอช่วยประเมินได้ทันท่วงที
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100">
            <div className="space-y-6">
              {SYMPTOM_QUESTIONS.map((q, idx) => {
                const selectedScore = answers[q.id];
                return (
                  <div key={q.id} className="pb-6 border-b border-slate-100 last:border-b-0 last:pb-0">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                      {q.question}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">{q.subtitle}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedScore === opt.score;
                        return (
                          <button
                            type="button"
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, opt.score)}
                            className={`text-left p-3 rounded-xl border text-xs transition-all ${
                              isSelected
                                ? 'bg-emerald-50/90 border-emerald-600 text-emerald-950 font-medium ring-2 ring-emerald-500/20'
                                : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <span
                                className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                                  isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                                }`}
                              >
                                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </span>
                              <span>{opt.text}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                ตอบแล้ว {Object.keys(answers).length} / {SYMPTOM_QUESTIONS.length} ข้อ
              </span>

              <button
                type="submit"
                disabled={!isCompleted}
                className={`py-3 px-8 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  isCompleted
                    ? 'bg-[#16533c] hover:bg-[#124431] text-white shadow-md active:scale-95 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>ดูผลการประเมินและคำแนะนำ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          /* Results Card */
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-emerald-100 animate-in fade-in">
            {hasUrgent || totalScore >= 4 ? (
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-bold text-amber-950">
                      พบสัญญาณเตือนความเสี่ยงของเส้นฟอกไต!
                    </h3>
                    <p className="text-xs text-amber-800 leading-relaxed mt-1">
                      ท่านมีอาการที่บ่งชี้ว่าเส้นฟอกไตอาจเกิดการตีบตัน การไหลเวียนของเลือดลดลง หรือมีความเสี่ยงต่อภาวะแทรกซ้อน เช่น เสียงฟู่แผ่วลง อาการบวม หรือความดันฟอกไตสูงขึ้น ควรรีบปรึกษาแพทย์ผู้เชี่ยวชาญก่อนที่เส้นจะหยุดทำงานอย่างถาวร
                    </p>
                  </div>
                </div>
              </div>
            ) : totalScore > 0 ? (
              <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 mb-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-bold text-sky-950">
                      เส้นฟอกไตอยู่ในเกณฑ์ที่ควรเฝ้าระวังหรือวางแผนล่วงหน้า
                    </h3>
                    <p className="text-xs text-sky-800 leading-relaxed mt-1">
                      พบความเปลี่ยนแปลงเล็กน้อยหรืออยู่ในช่วงเตรียมวางแผนทำเส้นใหม่ การปรึกษาแพทย์ผู้เชี่ยวชาญตั้งแต่เนิ่นๆ จะช่วยยืดอายุการใช้งานของเส้นฟอกเลือด และเลือกจุดผ่าตัดที่ให้ผลการรักษาดีที่สุด
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-bold text-emerald-950">
                      เส้นฟอกไตของคุณทำงานได้ปกติดี
                    </h3>
                    <p className="text-xs text-emerald-800 leading-relaxed mt-1">
                      ไม่พบสัญญาณเตือนรุนแรง ควรรักษาความสะอาด สัมผัสเช็คเสียงฟู่ทุกวัน หากในอนาคตมีความกังวลหรือต้องการคำปรึกษา สามารถใช้โค้ด <strong>{promoCode}</strong> นัดหมายอาจารย์อนุชาได้ตลอดถึงปี 2570
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6">
              <h4 className="text-xs font-bold text-slate-900 mb-2">สรุปสิ่งที่คุณควรทำต่อไป:</h4>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                <li>อย่าบีบ นวด หรือวัดความดันโลหิตที่แขนข้างที่มีเส้นฟอกไตเด็ดขาด</li>
                <li>เช็คการเต้นของเส้นฟอกไตด้วยมืออย่างน้อยวันละ 2 ครั้ง (เช้า-เย็น)</li>
                <li>นำผลการประเมินนี้ หรือรอยแผล/อาการบวม พูดคุยปรึกษา อ.นพ.อนุชา ได้ฟรีทันที</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ทำแบบประเมินใหม่อีกครั้ง</span>
              </button>

              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3 px-6 bg-[#16533c] hover:bg-[#124431] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-emerald-300" />
                <span>ใช้โค้ด {promoCode} นัดหมายปรึกษา {doctorName} ฟรี</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
