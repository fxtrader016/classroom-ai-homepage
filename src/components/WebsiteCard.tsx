import React from 'react';
import { Globe, X } from 'lucide-react';
import { Website } from '../types';
import { getCategoryStyles } from '../utils/categoryStyles';

interface WebsiteCardProps {
  website: Website;
}

export function WebsiteCard({ website }: WebsiteCardProps) {
  const styles = getCategoryStyles(website.category);

  return (
    <a
      href={website.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles} h-24 p-6 rounded-lg transition-transform hover:scale-105 flex items-center space-x-4`}
    >
      <div className="flex-shrink-0">
        <img
          src={website.favicon_url || `${new URL(website.url).origin}/favicon.ico`}
          alt=""
          className="w-6 h-6"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <Globe className="w-6 h-6 hidden" />
      </div>
      <span className="font-semibold truncate">{website.title}</span>
      {website.category === 'not_working' && (
        <X className="w-4 h-4 text-red-500 absolute bottom-2 right-2" />
      )}
    </a>
  );
}