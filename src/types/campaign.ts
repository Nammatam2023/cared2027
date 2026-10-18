export interface CampaignInfo {
  doctorName: string;
  doctorTitle: string;
  clinicName: string;
  promoCode: string;
  expiryDateText: string;
  expiryDateIso: string;
  doctorProfileUrl: string;
  conditions: string[];
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface SymptomQuestion {
  id: string;
  question: string;
  subtitle: string;
  category: 'flow' | 'edema' | 'dialysis' | 'skin' | 'new_access';
  options: {
    text: string;
    score: number; // 0 = normal, 1 = mild risk, 2 = high risk/urgent
    isUrgent?: boolean;
  }[];
}

export type BannerFormat = '4:5' | '1:1' | '16:9' | '9:16';
