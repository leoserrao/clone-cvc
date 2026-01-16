import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Sparkles, Loader2 } from 'lucide-react';
import { getAiTravelSuggestions } from '../services/geminiService';
import { TravelPackage } from '../types';

interface HeroProps {
  onSearchResults: (results: TravelPackage[]) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearchResults }) => {
  const [activeTab, setActiveTab] = useState<'standard' | 'ai'>('standard');
  const [aiQuery, setAiQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAiSearch = async () => {
    if (!aiQuery.trim()) return;
    setIsLoading(true);
    try {
      const results = await getAiTravelSuggestions(aiQuery);
      onSearchResults(results);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative bg-cvc-blue pb-20 lg:pb-32 pt-10">
      {/* Background with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://picsum.photos/id/16/1920/600" 
          alt="Travel Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cvc-blue/90 to-cvc-blue/40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Sua viagem começa aqui</h1>
          <p className="text-lg md:text-xl opacity-90">Os melhores pacotes com a confiança que você já conhece.</p>
        </div>

        {/* Search Widget Container */}
        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden transition-colors duration-300">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => setActiveTab('standard')}
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === 'standard' ? 'bg-white dark:bg-slate-800 text-cvc-blue dark:text-cvc-yellow border-b-4 border-cvc-yellow' : 'bg-gray-100 dark:bg-slate-900 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
            >
              Busca Padrão
            </button>
            <button 
              onClick={() => setActiveTab('ai')}
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-colors ${activeTab === 'ai' ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 border-b-4 border-purple-500' : 'bg-gray-100 dark:bg-slate-900 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
            >
              <Sparkles size={16} />
              Busca por Vibe (IA)
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'standard' ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Origem</label>
                  <div className="flex items-center border rounded-lg p-3 hover:border-cvc-blue dark:border-gray-600 dark:bg-slate-700">
                    <MapPin size={18} className="text-gray-400 mr-2" />
                    <input type="text" placeholder="De onde?" className="w-full outline-none text-sm dark:bg-transparent dark:text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Destino</label>
                  <div className="flex items-center border rounded-lg p-3 hover:border-cvc-blue dark:border-gray-600 dark:bg-slate-700">
                    <MapPin size={18} className="text-gray-400 mr-2" />
                    <input type="text" placeholder="Para onde?" className="w-full outline-none text-sm dark:bg-transparent dark:text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Data</label>
                  <div className="flex items-center border rounded-lg p-3 hover:border-cvc-blue dark:border-gray-600 dark:bg-slate-700">
                    <Calendar size={18} className="text-gray-400 mr-2" />
                    <input type="text" placeholder="Ida e Volta" className="w-full outline-none text-sm dark:bg-transparent dark:text-white" />
                  </div>
                </div>
                <div className="flex items-end">
                  <button className="w-full bg-cvc-yellow hover:bg-yellow-400 text-cvc-blue font-bold py-3.5 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2">
                    <Search size={20} />
                    Buscar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 w-full">
                  <label className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase mb-1 block">Descreva sua viagem dos sonhos</label>
                  <div className="relative">
                    <textarea 
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      placeholder="Ex: Quero viajar para um lugar de praia tranquilo no nordeste, gastando até 3 mil reais em março..." 
                      className="w-full border-2 border-purple-100 dark:border-purple-900 rounded-lg p-4 outline-none focus:border-purple-500 text-sm h-24 resize-none dark:bg-slate-700 dark:text-white"
                    />
                    <Sparkles className="absolute right-3 bottom-3 text-purple-400 opacity-50" size={20} />
                  </div>
                </div>
                <div className="w-full md:w-48">
                   <button 
                    onClick={handleAiSearch}
                    disabled={isLoading}
                    className="w-full h-24 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold rounded-lg transition-all shadow-md flex flex-col items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Sparkles size={24} />}
                    <span>{isLoading ? 'Pensando...' : 'Descobrir'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;