import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TabBar } from './components/TabBar';
import { ServiceCard } from './components/ServiceCard';
import { EditServiceModal } from './components/EditServiceModal';
import { cn } from './utils/cn';
import './App.css';

// Helper function to get favicon URL
const getFaviconUrl = (url) => {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return '🌐';
  }
};

// Default AI services data with automatic favicon URLs
const defaultData = {
  categories: [
    {
      id: 1,
      name: 'AI 에이전트',
      services: [
        { id: 1, name: 'ChatGPT', url: 'https://chat.openai.com', icon: getFaviconUrl('https://chat.openai.com') },
        { id: 2, name: 'Perplexity', url: 'https://www.perplexity.ai', icon: getFaviconUrl('https://www.perplexity.ai') },
        { id: 3, name: 'Gemini', url: 'https://gemini.google.com', icon: getFaviconUrl('https://gemini.google.com') },
        { id: 4, name: 'Genspark', url: 'https://genspark.ai', icon: getFaviconUrl('https://genspark.ai') },
        { id: 5, name: 'Flowith', url: 'https://flowith.io', icon: getFaviconUrl('https://flowith.io') },
        { id: 6, name: 'Claude', url: 'https://claude.ai', icon: getFaviconUrl('https://claude.ai') },
        { id: 7, name: 'Manus', url: 'https://manus.ai', icon: getFaviconUrl('https://manus.ai') },
      ]
    },
    {
      id: 2,
      name: '이미지',
      services: [
        { id: 8, name: 'Midjourney', url: 'https://midjourney.com', icon: getFaviconUrl('https://midjourney.com') },
        { id: 9, name: 'Nano Banana', url: 'https://nano-banana.com', icon: getFaviconUrl('https://nano-banana.com') },
        { id: 10, name: 'Flux', url: 'https://flux.ai', icon: getFaviconUrl('https://flux.ai') },
        { id: 11, name: 'Sora', url: 'https://openai.com/sora', icon: getFaviconUrl('https://openai.com/sora') },
        { id: 12, name: 'Whisk', url: 'https://whisk.com', icon: getFaviconUrl('https://whisk.com') },
        { id: 13, name: 'Dreamina', url: 'https://dreamina.ai', icon: getFaviconUrl('https://dreamina.ai') },
        { id: 14, name: 'Qwen', url: 'https://qwen.ai', icon: getFaviconUrl('https://qwen.ai') },
      ]
    },
    {
      id: 3,
      name: '비디오',
      services: [
        { id: 15, name: 'VEO 3', url: 'https://veo3.ai', icon: getFaviconUrl('https://veo3.ai') },
        { id: 16, name: 'Midjourney', url: 'https://midjourney.com', icon: getFaviconUrl('https://midjourney.com') },
        { id: 17, name: 'Hailuo', url: 'https://hailuo.ai', icon: getFaviconUrl('https://hailuo.ai') },
        { id: 18, name: 'Higgsfiled', url: 'https://higgsfiled.ai', icon: getFaviconUrl('https://higgsfiled.ai') },
        { id: 19, name: 'Kling', url: 'https://kling.ai', icon: getFaviconUrl('https://kling.ai') },
        { id: 20, name: 'Runway', url: 'https://runway.com', icon: getFaviconUrl('https://runway.com') },
        { id: 21, name: 'Pika Labs', url: 'https://pika.art', icon: getFaviconUrl('https://pika.art') },
        { id: 22, name: 'Luma AI', url: 'https://lumalabs.ai', icon: getFaviconUrl('https://lumalabs.ai') },
        { id: 23, name: 'Topaz', url: 'https://topazlabs.com', icon: getFaviconUrl('https://topazlabs.com') },
        { id: 24, name: 'Freepik', url: 'https://freepik.com', icon: getFaviconUrl('https://freepik.com') },
      ]
    },
    {
      id: 4,
      name: '음성/립싱크',
      services: [
        { id: 25, name: 'Elevenlabs', url: 'https://elevenlabs.io', icon: getFaviconUrl('https://elevenlabs.io') },
        { id: 26, name: 'Perso', url: 'https://perso.ai', icon: getFaviconUrl('https://perso.ai') },
        { id: 27, name: 'Supertone', url: 'https://supertone.ai', icon: getFaviconUrl('https://supertone.ai') },
        { id: 28, name: 'Typecast', url: 'https://typecast.ai', icon: getFaviconUrl('https://typecast.ai') },
        { id: 29, name: 'Heygen', url: 'https://heygen.com', icon: getFaviconUrl('https://heygen.com') },
        { id: 30, name: 'Hedra', url: 'https://hedra.ai', icon: getFaviconUrl('https://hedra.ai') },
      ]
    },
    {
      id: 5,
      name: '바이브코딩',
      services: [
        { id: 31, name: 'Github', url: 'https://github.com', icon: getFaviconUrl('https://github.com') },
        { id: 32, name: 'Google AI Studio', url: 'https://aistudio.google.com', icon: getFaviconUrl('https://aistudio.google.com') },
        { id: 33, name: 'Claude', url: 'https://claude.ai', icon: getFaviconUrl('https://claude.ai') },
        { id: 34, name: 'Cursor', url: 'https://cursor.sh', icon: getFaviconUrl('https://cursor.sh') },
        { id: 35, name: 'Lovable', url: 'https://lovable.dev', icon: getFaviconUrl('https://lovable.dev') },
        { id: 36, name: 'Replit AI', url: 'https://replit.com', icon: getFaviconUrl('https://replit.com') },
        { id: 37, name: 'Base44', url: 'https://base44.com', icon: getFaviconUrl('https://base44.com') },
        { id: 38, name: 'Bolt', url: 'https://bolt.new', icon: getFaviconUrl('https://bolt.new') },
      ]
    },
    {
      id: 6,
      name: '음악',
      services: [
        { id: 39, name: 'Suno AI', url: 'https://suno.ai', icon: getFaviconUrl('https://suno.ai') },
        { id: 40, name: 'Udio', url: 'https://udio.com', icon: getFaviconUrl('https://udio.com') },
        { id: 41, name: 'AIVA', url: 'https://aiva.ai', icon: getFaviconUrl('https://aiva.ai') },
      ]
    },
    {
      id: 7,
      name: '편집/자막',
      services: [
        { id: 42, name: 'opus', url: 'https://opus.pro', icon: getFaviconUrl('https://opus.pro') },
        { id: 43, name: 'Cutback', url: 'https://cutback.ai', icon: getFaviconUrl('https://cutback.ai') },
        { id: 44, name: 'Capcut', url: 'https://capcut.com', icon: getFaviconUrl('https://capcut.com') },
      ]
    },
    {
      id: 8,
      name: '비즈니스',
      services: [
        { id: 45, name: 'Gamma', url: 'https://gamma.app', icon: getFaviconUrl('https://gamma.app') },
        { id: 46, name: 'Notebook LM', url: 'https://notebooklm.google.com', icon: getFaviconUrl('https://notebooklm.google.com') },
      ]
    }
  ]
};

function App() {
  const [theme, setTheme] = useState('dark');
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedService, setDraggedService] = useState(null);
  const [draggedOverService, setDraggedOverService] = useState(null);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }

    // Load data from localStorage or use default
    const savedData = localStorage.getItem('aiToolsData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setCategories(parsed.categories || defaultData.categories);
    } else {
      setCategories(defaultData.categories);
      localStorage.setItem('aiToolsData', JSON.stringify(defaultData));
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('Theme toggling:', theme, '->', newTheme);
    setTheme(newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', newTheme);
  };

  const handleServiceClick = (service) => {
    if (!editMode) {
      window.open(service.url, '_blank');
    }
  };

  const addService = (categoryId) => {
    setEditingCategoryId(categoryId);
    setIsAddingService(true);
    setEditingService({ id: Date.now(), name: '', url: '', icon: '' });
  };

  const handleAddService = (newService) => {
    if (editingCategoryId) {
      const newCategories = categories.map(cat => {
        if (cat.id === editingCategoryId) {
          return {
            ...cat,
            services: [...cat.services, newService]
          };
        }
        return cat;
      });
      setCategories(newCategories);
      localStorage.setItem('aiToolsData', JSON.stringify({ categories: newCategories }));
      setIsAddingService(false);
      setEditingService(null);
      setEditingCategoryId(null);
    }
  };

  const deleteService = (categoryId, serviceId) => {
    if (confirm('이 서비스를 삭제하시겠습니까?')) {
      const newCategories = categories.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            services: cat.services.filter(s => s.id !== serviceId)
          };
        }
        return cat;
      });
      setCategories(newCategories);
      localStorage.setItem('aiToolsData', JSON.stringify({ categories: newCategories }));
    }
  };

  const editService = (categoryId, serviceId) => {
    const category = categories.find(c => c.id === categoryId);
    const service = category.services.find(s => s.id === serviceId);
    setEditingService(service);
    setEditingCategoryId(categoryId);
  };

  const handleSaveService = (updatedService) => {
    if (editingCategoryId) {
      const newCategories = categories.map(cat => {
        if (cat.id === editingCategoryId) {
          return {
            ...cat,
            services: cat.services.map(s => {
              if (s.id === updatedService.id) {
                return updatedService;
              }
              return s;
            })
          };
        }
        return cat;
      });
      setCategories(newCategories);
      localStorage.setItem('aiToolsData', JSON.stringify({ categories: newCategories }));
      setEditingService(null);
      setEditingCategoryId(null);
    }
  };

  const addCategory = () => {
    const name = prompt('카테고리 이름을 입력하세요:');
    if (name) {
      const newCategory = {
        id: Date.now(),
        name,
        services: []
      };
      const newCategories = [...categories, newCategory];
      setCategories(newCategories);
      localStorage.setItem('aiToolsData', JSON.stringify({ categories: newCategories }));
    }
  };

  const deleteCategory = (categoryId) => {
    if (confirm('이 카테고리를 삭제하시겠습니까?')) {
      const newCategories = categories.filter(c => c.id !== categoryId);
      setCategories(newCategories);
      localStorage.setItem('aiToolsData', JSON.stringify({ categories: newCategories }));
      if (activeTab >= newCategories.length) {
        setActiveTab(Math.max(0, newCategories.length - 1));
      }
    }
  };

  const editCategory = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    const newName = prompt('카테고리 이름을 수정하세요:', category.name);
    
    if (newName) {
      const newCategories = categories.map(cat => {
        if (cat.id === categoryId) {
          return { ...cat, name: newName };
        }
        return cat;
      });
      setCategories(newCategories);
      localStorage.setItem('aiToolsData', JSON.stringify({ categories: newCategories }));
    }
  };

  const reorderCategories = (newCategories) => {
    setCategories(newCategories);
    localStorage.setItem('aiToolsData', JSON.stringify({ categories: newCategories }));
  };

  // Handle drag start
  const handleDragStart = (e, service, categoryId) => {
    setDraggedService({ service, categoryId });
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle drag enter
  const handleDragEnter = (e, service, categoryId) => {
    e.preventDefault();
    setDraggedOverService({ service, categoryId });
  };

  // Handle drop
  const handleDrop = (e, targetService, targetCategoryId) => {
    e.preventDefault();
    
    if (!draggedService || !targetService) return;
    
    const sourceCategoryId = draggedService.categoryId;
    const sourceService = draggedService.service;
    
    // If dropping on the same service, do nothing
    if (sourceService.id === targetService.id && sourceCategoryId === targetCategoryId) {
      setDraggedService(null);
      setDraggedOverService(null);
      return;
    }
    
    const newCategories = [...categories];
    
    // Find source and target categories
    const sourceCategory = newCategories.find(cat => cat.id === sourceCategoryId);
    const targetCategory = newCategories.find(cat => cat.id === targetCategoryId);
    
    if (!sourceCategory || !targetCategory) return;
    
    // Remove service from source category
    const sourceIndex = sourceCategory.services.findIndex(s => s.id === sourceService.id);
    if (sourceIndex === -1) return;
    
    sourceCategory.services.splice(sourceIndex, 1);
    
    // Add service to target category at the correct position
    const targetIndex = targetCategory.services.findIndex(s => s.id === targetService.id);
    
    if (sourceCategoryId === targetCategoryId) {
      // Reordering within the same category
      const adjustedTargetIndex = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
      targetCategory.services.splice(adjustedTargetIndex + 1, 0, sourceService);
    } else {
      // Moving to a different category
      targetCategory.services.splice(targetIndex + 1, 0, sourceService);
    }
    
    setCategories(newCategories);
    localStorage.setItem('aiToolsData', JSON.stringify({ categories: newCategories }));
    
    setDraggedService(null);
    setDraggedOverService(null);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedService(null);
    setDraggedOverService(null);
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    // If searching, switch to 'All' view by creating a virtual category
    if (term) {
      setActiveTab(-1); // Special index for search results
    } else {
      setActiveTab(0); // Reset to first category
    }
  };

  // Filter services based on search term
  const getFilteredServices = () => {
    if (!searchTerm) {
      return currentCategory ? currentCategory.services : [];
    }

    // Search across all categories
    const allServices = [];
    categories.forEach(category => {
      const filteredServices = category.services.filter(service => 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      allServices.push(...filteredServices.map(service => ({
        ...service,
        categoryName: category.name
      })));
    });
    return allServices;
  };

  const totalServices = categories.reduce((sum, cat) => sum + cat.services.length, 0);
  const currentCategory = activeTab >= 0 ? categories[activeTab] : null;
  const displayServices = searchTerm ? getFilteredServices() : (currentCategory ? currentCategory.services : []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Navbar */}
      <Navbar 
        logo="BAROGA"
        theme={theme}
        onThemeToggle={toggleTheme}
        editMode={editMode}
        onEditToggle={() => setEditMode(!editMode)}
      />

      {/* Hero Section */}
      <Hero 
        totalServices={totalServices}
        totalCategories={categories.length}
        onSearch={handleSearch}
      />

      {/* Category Tabs */}
      {!searchTerm && (
        <TabBar 
          categories={categories}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          editMode={editMode}
          onAddCategory={addCategory}
          onEditCategory={editCategory}
          onDeleteCategory={deleteCategory}
          onReorderCategories={reorderCategories}
        />
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(currentCategory || searchTerm) && (
          <div className="space-y-8">
            {/* Search Results Info */}
            {searchTerm && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  '{searchTerm}' 검색 결과: <span className="font-semibold">{displayServices.length}개</span> 서비스
                </p>
              </div>
            )}

            {/* Services Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
              {displayServices.map((service) => (
                <div
                  key={service.id}
                  draggable={editMode && !searchTerm}
                  onDragStart={(e) => handleDragStart(e, service, currentCategory?.id)}
                  onDragOver={handleDragOver}
                  onDragEnter={(e) => handleDragEnter(e, service, currentCategory?.id)}
                  onDrop={(e) => handleDrop(e, service, currentCategory?.id)}
                  onDragEnd={handleDragEnd}
                  className={cn(
                    editMode && !searchTerm && "cursor-move",
                    draggedOverService?.service.id === service.id && "opacity-50"
                  )}
                >
                  <ServiceCard
                    service={service}
                    onClick={() => handleServiceClick(service)}
                    editMode={editMode && !searchTerm}
                    onEdit={() => editService(currentCategory?.id, service.id)}
                    onDelete={() => deleteService(currentCategory?.id, service.id)}
                    showCategory={searchTerm && service.categoryName}
                  />
                </div>
              ))}
              
              {/* Add Service Card - only show when not searching */}
              {!searchTerm && currentCategory && (
                <div
                  onClick={() => addService(currentCategory.id)}
                className={cn(
                  "group relative rounded-xl overflow-hidden",
                  "transition-all duration-200 cursor-pointer",
                  "border border-dashed border-gray-300 dark:border-gray-700",
                  "hover:border-gray-400 dark:hover:border-gray-600",
                  "hover:bg-gray-50 dark:hover:bg-gray-900/50"
                )}
              >
                <div className="p-6 flex flex-col items-center justify-center space-y-3 h-full min-h-[140px]">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                    <Plus size={20} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    서비스 추가
                  </span>
                </div>
              </div>
              )}
            </div>

            {/* Footer Stats */}
            <div className="mt-16 py-8 border-t border-gray-200 dark:border-gray-800">
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  총 <span className="text-gray-900 dark:text-white font-semibold">{totalServices}개</span>의 AI 서비스 •
                  <span className="text-gray-900 dark:text-white font-semibold"> {categories.length}개</span> 카테고리
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  지속적으로 업데이트되고 있습니다
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Edit Service Modal */}
      <EditServiceModal 
        service={editingService}
        isOpen={!!editingService}
        onClose={() => {
          setEditingService(null);
          setEditingCategoryId(null);
          setIsAddingService(false);
        }}
        onSave={isAddingService ? handleAddService : handleSaveService}
      />
    </div>
  );
}

export default App;