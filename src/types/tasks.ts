
export interface Partner {
  id: string;
  name: string;
  logo?: string;
  type: 'offerwall' | 'direct';
}

export interface Offerwall extends Partner {
  type: 'offerwall';
  apiKey?: string;
  postbackUrl?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'app_install' | 'survey' | 'video_ad' | 'game' | 'affiliate';
  partner: Partner;
  trackingUrl: string;
  rewardInr: number;
  coinValue: number;
  timeRequired: string;
  instructions: string[];
  category: string;
  status?: 'available' | 'completed' | 'in_progress';
  minLevel?: number;
  imageUrl?: string;
  offerwall?: string;
  offerwallTaskId?: string;
  conversionRate?: number;
}

export interface TasksResponse {
  tasks: Task[];
  hasMore: boolean;
}

export interface TasksByCategory {
  [key: string]: Task[];
}

export interface OfferwallProvider {
  id: string;
  name: string;
  logo: string;
  description: string;
  active: boolean;
  backgroundColor: string;
  textColor: string;
}
