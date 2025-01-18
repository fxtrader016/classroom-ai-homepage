import React from 'react';
import { Website } from '../types';
import { WebsiteCard } from './WebsiteCard';

interface WebsiteGridProps {
  websites: Website[];
}

const categoryOrder = ['top', 'good', 'medium', 'meh', 'not_working'];

export function WebsiteGrid({ websites }: WebsiteGridProps) {
  const sortedWebsites = websites.sort((a, b) => {
    return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
  });

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {sortedWebsites.map((website) => (
          <WebsiteCard key={website.id} website={website} />
        ))}
      </div>
    </div>
  );
}