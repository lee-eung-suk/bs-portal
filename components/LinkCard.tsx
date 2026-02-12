import React from 'react';
import { FileSpreadsheet, HardDrive, Youtube, ExternalLink } from 'lucide-react';
import { LinkItem } from '../types';

interface LinkCardProps {
  item: LinkItem;
}

export const LinkCard: React.FC<LinkCardProps> = ({ item }) => {
  const getIcon = () => {
    switch (item.iconType) {
      case 'drive':
        return <HardDrive className="h-6 w-6" />;
      case 'sheet':
        return <FileSpreadsheet className="h-6 w-6" />;
      case 'youtube':
        return <Youtube className="h-6 w-6" />;
      default:
        return <ExternalLink className="h-6 w-6" />;
    }
  };

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:ring-indigo-100"
    >
      <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${item.color}`} />
      
      <div className="flex items-start justify-between mb-4">
        <div className={`rounded-xl bg-gradient-to-br ${item.color} p-3 text-white shadow-md`}>
          {getIcon()}
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
          <ExternalLink size={16} />
        </div>
      </div>

      <div className="mt-auto">
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
          {item.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500 font-medium line-clamp-2">
          {item.description}
        </p>
      </div>
    </a>
  );
};