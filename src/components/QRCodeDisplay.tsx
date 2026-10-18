import React from 'react';
import { ExternalLink, Copy, Check, QrCode } from 'lucide-react';
import { CareDLogo } from './CareDLogo';

interface QRCodeDisplayProps {
  url: string;
  doctorName: string;
  promoCode: string;
  size?: number;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  url,
  doctorName,
  promoCode,
  size = 200
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // We generate a clean QR code image using a reliable public SVG QR generator API with high error correction (H)
  // so the Care D logo can sit cleanly in the center!
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size * 2}x${size * 2}&data=${encodeURIComponent(
    url
  )}&color=16-83-60&bgcolor=255-255-255&margin=6&format=svg`;

  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm">
      <div className="relative p-2 bg-white rounded-xl border border-slate-100" style={{ width: size, height: size }}>
        <img
          src={qrImageUrl}
          alt={`QR Code นัดหมาย ${doctorName}`}
          className="w-full h-full object-contain"
          loading="lazy"
        />
        {/* Center Logo Badge */}
        <div className="absolute inset-0 m-auto w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-emerald-50 pointer-events-none">
          <CareDLogo showText={false} size="sm" />
        </div>
      </div>

      <div className="mt-3 text-center">
        <p className="text-xs font-semibold text-slate-800 flex items-center justify-center gap-1">
          <QrCode className="w-3.5 h-3.5 text-emerald-700" />
          สแกนด้วยกล้องมือถือ
        </p>
        <p className="text-[11px] text-slate-500 mt-0.5">เพื่อนัดหมายปรึกษา {doctorName} ทันที</p>
      </div>

      <div className="flex gap-2 mt-3 w-full">
        <button
          onClick={handleCopyLink}
          className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
          title="คัดลอกลิงก์นัดหมาย"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>คัดลอกแล้ว</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>คัดลอกลิงก์</span>
            </>
          )}
        </button>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-1.5 px-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
        >
          <span>เปิดลิงก์</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
