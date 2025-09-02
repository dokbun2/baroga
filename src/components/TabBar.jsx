import React, { useState, useRef } from 'react';
import { cn } from '../utils/cn';
import { Plus, Edit2, X, GripVertical } from 'lucide-react';

export const TabBar = ({ 
  categories, 
  activeTab, 
  onTabChange, 
  editMode, 
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  onReorderCategories,
  className 
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const draggedItem = useRef(null);
  const scrollContainerRef = useRef(null);

  const handleDragStart = (e, index) => {
    draggedItem.current = index;
    setDraggedIndex(index);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    
    // Create a drag image
    const dragImage = e.currentTarget.cloneNode(true);
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, e.currentTarget.offsetWidth / 2, e.currentTarget.offsetHeight / 2);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedItem.current === null) return;
    
    setDragOverIndex(index);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
    setIsDragging(false);
    draggedItem.current = null;
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    e.stopPropagation();
    const dragIndex = draggedItem.current;
    
    if (dragIndex === null || dragIndex === dropIndex) {
      handleDragEnd();
      return;
    }

    const newCategories = [...categories];
    const draggedCategory = newCategories[dragIndex];
    
    // Remove the dragged item
    newCategories.splice(dragIndex, 1);
    
    // Insert at new position
    newCategories.splice(dropIndex, 0, draggedCategory);
    
    // Update categories through parent
    if (onReorderCategories) {
      onReorderCategories(newCategories);
    }
    
    // Update active tab if needed
    if (activeTab === dragIndex) {
      onTabChange(dropIndex);
    } else if (dragIndex < activeTab && dropIndex >= activeTab) {
      onTabChange(activeTab - 1);
    } else if (dragIndex > activeTab && dropIndex <= activeTab) {
      onTabChange(activeTab + 1);
    }
    
    handleDragEnd();
  };

  return (
    <div className={cn(
      'sticky top-14 z-40 w-full',
      'bg-white/90 dark:bg-gray-900/90',
      'backdrop-blur-lg border-b border-gray-200 dark:border-gray-800',
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={scrollContainerRef}
          className={cn(
            "flex items-center gap-2 py-3",
            editMode ? "flex-wrap" : "overflow-x-auto scrollbar-hide"
          )}
          style={{ 
            scrollBehavior: isDragging ? 'auto' : 'smooth',
            overflowX: editMode ? 'visible' : 'auto'
          }}
        >
          {/* Category Tabs */}
          {categories.map((category, index) => (
            <div
              key={category.id}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              className={cn(
                "relative",
                dragOverIndex === index && draggedIndex !== index && "transition-transform translate-x-2"
              )}
            >
              <button
                onClick={() => !isDragging && onTabChange(index)}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                draggable={editMode}
                className={cn(
                  "relative group whitespace-nowrap px-4 py-2 text-sm font-medium",
                  "rounded-lg transition-all duration-200",
                  "flex items-center select-none",
                  activeTab === index
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
                  draggedIndex === index && "opacity-30 scale-95",
                  dragOverIndex === index && draggedIndex !== index && "bg-gray-200 dark:bg-gray-700",
                  editMode && "cursor-move"
                )}
              >
                {/* Drag Handle */}
                {editMode && (
                  <GripVertical 
                    size={14} 
                    className={cn(
                      "mr-1.5 flex-shrink-0",
                      activeTab === index 
                        ? "text-gray-300 dark:text-gray-700" 
                        : "text-gray-400 dark:text-gray-500"
                    )}
                  />
                )}
                
                <span className="flex items-center gap-2 pointer-events-none">
                  {category.name}
                  <span className={cn(
                    "px-1.5 py-0.5 text-xs rounded-md",
                    activeTab === index
                      ? "bg-white/20 dark:bg-gray-900/20"
                      : "bg-gray-200 dark:bg-gray-700"
                  )}>
                    {category.services.length}
                  </span>
                </span>

                {/* Edit Mode Actions */}
                {editMode && !isDragging && (
                  <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditCategory(category.id);
                      }}
                      className="p-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Edit2 size={12} className="text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCategory(category.id);
                      }}
                      className="p-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <X size={12} className="text-gray-600 dark:text-gray-400 hover:text-red-600" />
                    </button>
                  </div>
                )}
              </button>
            </div>
          ))}

          {/* Add Category Button */}
          <button
            onClick={onAddCategory}
            className={cn(
              "group whitespace-nowrap px-4 py-2 text-sm font-medium",
              "rounded-lg transition-all duration-200",
              "border border-dashed border-gray-300 dark:border-gray-700",
              "text-gray-500 dark:text-gray-400",
              "hover:border-gray-400 dark:hover:border-gray-600",
              "hover:bg-gray-50 dark:hover:bg-gray-800",
              "flex-shrink-0"
            )}
          >
            <span className="flex items-center gap-2">
              <Plus size={16} />
              카테고리 추가
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};