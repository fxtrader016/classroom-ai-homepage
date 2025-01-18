interface CategoryStyles {
  [key: string]: string;
}

const categoryStyles: CategoryStyles = {
  top: 'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-600',
  good: 'bg-blue-50 border-2 border-blue-400 text-blue-900 hover:bg-blue-100 hover:border-blue-500',
  medium: 'bg-yellow-50 border-2 border-yellow-400 text-yellow-900 hover:bg-yellow-100 hover:border-yellow-500',
  meh: 'bg-gray-50 border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400',
  not_working: 'bg-red-50 border-2 border-red-400 text-red-900 hover:bg-red-100 hover:border-red-500 relative'
};

export function getCategoryStyles(category: string): string {
  return categoryStyles[category] || categoryStyles.meh;
}