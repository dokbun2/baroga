import React, { useState } from 'react';
import { cn } from '../utils/cn';
import { Menu, X, Sun, Moon, Edit2, Layers } from 'lucide-react';

export const Navbar = ({ 
  logo = 'BBALI',
  onThemeToggle,
  theme = 'dark',
  editMode,
  onEditToggle,
  onLogoClick,
  className
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className={cn(
        'w-full backdrop-blur-xl transition-all duration-200',
        'sticky top-0 z-50',
        'bg-white/70 dark:bg-gray-900/70',
        'border-b border-gray-200 dark:border-gray-800',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (onLogoClick) {
                  onLogoClick();
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex-shrink-0 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Layers className="h-5 w-5 text-gray-900 dark:text-white" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {logo}
              </h1>
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-300 dark:border-gray-700"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon size={18} />
              ) : (
                <Sun size={18} />
              )}
            </button>
            
            {/* Edit Mode Toggle */}
            <button
              onClick={onEditToggle}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all border",
                editMode 
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-700"
              )}
            >
              <Edit2 size={16} className="inline mr-1.5" />
              편집
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? (
                <X className="block h-5 w-5" />
              ) : (
                <Menu className="block h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="px-4 py-3 space-y-2">
            <button
              onClick={onThemeToggle}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              {theme === 'light' ? '다크 모드' : '라이트 모드'}
            </button>
            <button
              onClick={onEditToggle}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-lg",
                editMode 
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              <Edit2 size={18} />
              편집 모드
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};