export interface Website {
  id: string;
  title: string;
  url: string;
  category: 'top' | 'good' | 'medium' | 'meh' | 'not_working';
  favicon_url?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export type WebsiteBasicData = Pick<Website, 'id' | 'title' | 'url' | 'category' | 'favicon_url'>;