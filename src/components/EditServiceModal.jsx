import { useState, useEffect } from 'react';
import { X, Globe, Save, Loader2 } from 'lucide-react';

export function EditServiceModal({ service, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    icon: ''
  });
  const [isLoadingFavicon, setIsLoadingFavicon] = useState(false);
  const [faviconError, setFaviconError] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || '',
        url: service.url || '',
        icon: service.icon || ''
      });
    }
  }, [service]);

  // Function to get favicon from various sources
  const getFaviconUrl = (url) => {
    try {
      const domain = new URL(url).hostname;
      // Try multiple favicon services as fallback
      return [
        `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        `https://icon.horse/icon/${domain}`,
        `https://favicon.im/${domain}?larger=true`,
        `https://icons.duckduckgo.com/ip3/${domain}.ico`
      ];
    } catch {
      return [];
    }
  };

  // Auto-fetch favicon when URL changes
  const handleUrlChange = async (e) => {
    const newUrl = e.target.value;
    setFormData(prev => ({ ...prev, url: newUrl }));
    setFaviconError(false);

    // Only auto-fetch if icon field is empty or is already a favicon URL
    if (newUrl && newUrl.startsWith('http') && (!formData.icon || formData.icon.startsWith('http'))) {
      setIsLoadingFavicon(true);
      const faviconUrls = getFaviconUrl(newUrl);
      
      if (faviconUrls.length > 0) {
        // Use the first service (Google) as default
        setFormData(prev => ({ ...prev, icon: faviconUrls[0] }));
      }
      setIsLoadingFavicon(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.url) {
      // If icon is empty, use favicon URL
      let finalIcon = formData.icon;
      if (!finalIcon && formData.url && formData.url.startsWith('http')) {
        const faviconUrls = getFaviconUrl(formData.url);
        if (faviconUrls.length > 0) {
          finalIcon = faviconUrls[0];
        } else {
          finalIcon = '🌐'; // Default emoji if favicon not available
        }
      }
      
      onSave({
        ...service,
        ...formData,
        icon: finalIcon
      });
      onClose();
    }
  };

  const handleIconError = () => {
    setFaviconError(true);
    // Fall back to emoji if favicon fails
    if (!formData.icon || formData.icon.startsWith('http')) {
      setFormData(prev => ({ ...prev, icon: '🌐' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 glass-dark rounded-2xl p-6 shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            서비스 편집
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              서비스 이름
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 bg-white/5 border border-gray-700 rounded-lg 
                       focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50
                       text-white placeholder-gray-600 transition-all"
              placeholder="예: ChatGPT"
              required
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              URL
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={handleUrlChange}
              className="w-full px-4 py-2 bg-white/5 border border-gray-700 rounded-lg 
                       focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50
                       text-white placeholder-gray-600 transition-all"
              placeholder="https://example.com"
              required
            />
            {formData.url && (
              <p className="mt-1 text-xs text-gray-500">
                파비콘이 자동으로 감지됩니다
              </p>
            )}
          </div>

          {/* Icon Preview and Input */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              아이콘
            </label>
            <div className="flex items-center gap-3">
              {/* Icon Preview */}
              <div className="w-12 h-12 rounded-lg bg-white/5 border border-gray-700 
                            flex items-center justify-center overflow-hidden">
                {isLoadingFavicon ? (
                  <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
                ) : formData.icon ? (
                  formData.icon.startsWith('http') ? (
                    <img 
                      src={formData.icon} 
                      alt="" 
                      className="w-8 h-8 object-contain"
                      onError={handleIconError}
                    />
                  ) : (
                    <span className="text-2xl">{formData.icon}</span>
                  )
                ) : (
                  <Globe className="w-6 h-6 text-gray-500" />
                )}
              </div>
              
              {/* Icon Input */}
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                className="flex-1 px-4 py-2 bg-white/5 border border-gray-700 rounded-lg 
                         focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50
                         text-white placeholder-gray-600 transition-all"
                placeholder="비워두면 자동으로 파비콘 사용"
              />
            </div>
            {faviconError && (
              <p className="mt-1 text-xs text-yellow-500">
                파비콘을 불러올 수 없어 기본 아이콘을 사용합니다
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 
                       border border-gray-700 rounded-lg
                       text-gray-400 font-medium transition-all"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 
                       rounded-lg text-white font-medium transition-all
                       flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}