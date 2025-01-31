import React from 'react';
import { Website } from '../types';
import { WebsiteCard } from './WebsiteCard';

interface WebsiteGridProps {
  websites: Website[];
}

const categoryOrder = ['top', 'good', 'medium', 'meh', 'not_working'];

export function WebsiteGrid({ websites }: WebsiteGridProps) {
  const sortedWebsites = websites.sort((a, b) => {
    // First sort by category
    const categoryDiff = categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
    if (categoryDiff !== 0) return categoryDiff;
    // Then by display_order if it exists
    if ('display_order' in a && 'display_order' in b) {
      return (a.display_order || 0) - (b.display_order || 0);
    }
    return 0;
  });

  return (
    <div className="p-6">
      <div className="grid grid-cols-6 gap-4">
        {sortedWebsites.map((website) => (
          <WebsiteCard key={website.id} website={website} />
        ))}
      </div>
    </div>
  );
}