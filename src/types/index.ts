export type MessageType = 'text' | 'image';
export type Classification = 'Malignant' | 'Benign' | 'Normal' | null;

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  type: MessageType;
  content: string;
  timestamp: Date;
  image?: string;
  classification?: Classification;
  confidence?: number;
  modelUsed?: string;
}

export interface Model {
  id: string;
  name: string;
  description: string;
}