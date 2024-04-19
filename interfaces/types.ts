export type User = 'patient' | 'doctor';

export interface Message {
    id: string;
    sender: 'patient' | 'doctor';
    text?: string;
    imageUrl?: string;
    timestamp: string;
  }