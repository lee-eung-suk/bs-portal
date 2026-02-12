import React from 'react';
import { FileSpreadsheet, HardDrive, Youtube, Home, ArrowRight } from 'lucide-react';
import { LinkItem } from '../types';

interface LinkCardProps {
  item: LinkItem;
}

export const LinkCard: React.FC<LinkCardProps> = ({ item }) => {
  const getIcon = () => {
    switch (item.iconType) {
      case 'drive':
        return <HardDrive className="h-8 w-8" />;
      case 'sheet':
        return <FileSpreadsheet className="h-8 w-8" />;
      case 'youtube':
        return <Youtube className="h-8 w-8" />;
      case 'home':
        return <Home className="h-8 w-8" />;
      default:
        return <Home className="h-8 w-8" />;
    }
  };

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${item.color} ring-1 ring-black/5`}
    >
      <div className="relative z-10">
        <div className="mb-4 inline-flex rounded-lg bg-white/60 p-3 shadow-sm backdrop-blur-sm transition-colors group-hover:bg-white">
          {getIcon()}
        </div>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-black">
          {item.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 font-medium">
          {item.description}
        </p>
      </div>
      
      <div className="mt-4 flex items-center text-sm font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        바로가기 <ArrowRight className="ml-1 h-4 w-4" />
      </div>

      {/* Decorative background circle */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/20 blur-2xl transition-all group-hover:bg-white/30" />
    </a>
  );
};