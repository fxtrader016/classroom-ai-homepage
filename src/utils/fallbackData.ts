import { WebsiteBasicData } from '../types';

export const fallbackWebsites: WebsiteBasicData[] = [
  {
    id: '1',
    title: 'ChatGPT',
    url: 'https://chat.openai.com',
    category: 'top',
    favicon_url: 'https://chat.openai.com/favicon.ico'
  },
  {
    id: '2',
    title: 'Claude',
    url: 'https://claude.ai',
    category: 'top',
    favicon_url: 'https://claude.ai/favicon.ico'
  },
  {
    id: '3',
    title: 'Google Bard',
    url: 'https://bard.google.com',
    category: 'good',
    favicon_url: 'https://www.google.com/favicon.ico'
  },
  {
    id: '4',
    title: 'Midjourney',
    url: 'https://www.midjourney.com',
    category: 'not_working',
    favicon_url: 'https://www.midjourney.com/favicon.ico'
  }
  // Add more fallback websites as needed
];