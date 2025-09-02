import React from 'react';
import { cn } from '../utils/cn';
import { ExternalLink, Edit2, Trash2 } from 'lucide-react';

export const ServiceCard = ({ 
  service, 
  onClick, 
  editMode, 
  onEdit, 
  onDelete,
  showCategory,
  className 
}) => {
  // 아이콘이 없으면 파비콘 URL 자동 생성
  const getIconUrl = () => {
    if (service.icon) return service.icon;
    
    if (service.url && service.url.startsWith('http')) {
      try {
        const domain = new URL(service.url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
      } catch {
        return '🌐';
      }
    }
    return '🌐';
  };
  
  const iconUrl = getIconUrl();
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative",
        "rounded-xl overflow-hidden",
        "transition-all duration-200",
        editMode ? "cursor-move" : "cursor-pointer",
        className
      )}
    >
      {/* Card */}
      <div className={cn(
        "relative h-full",
        "bg-white dark:bg-gray-900",
        "border border-gray-200 dark:border-gray-800",
        "hover:border-gray-300 dark:hover:border-gray-700",
        "hover:shadow-lg dark:hover:shadow-2xl",
        "transition-all duration-200"
      )}>

        {/* Content */}
        <div className="relative p-4 flex flex-col items-center justify-center space-y-3 h-full min-h-[140px]">
          {/* Icon */}
          <div className="text-4xl">
            {iconUrl && iconUrl.startsWith('http') ? (
              <img 
                src={iconUrl} 
                alt={service.name}
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
            ) : (
              <span style={{ display: iconUrl && iconUrl.startsWith('http') ? 'none' : 'block' }}>
                {iconUrl || '🌐'}
              </span>
            )}
          </div>

          {/* Service Name */}
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
              {service.name}
            </h3>
            {showCategory && (
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                {showCategory}
              </p>
            )}
            {service.description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                {service.description}
              </p>
            )}
          </div>

          {/* Hover Indicator */}
          {!editMode && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800">
                <ExternalLink className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
          )}

          {/* Edit Mode Actions */}
          {editMode && (
            <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="p-1.5 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Edit2 size={12} className="text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="p-1.5 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 size={12} className="text-gray-600 dark:text-gray-400 hover:text-red-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};