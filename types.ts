export interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  iconType: 'drive' | 'sheet' | 'youtube' | 'school' | 'home';
  color: string;
}

export interface User {
  name: string;
  role: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}