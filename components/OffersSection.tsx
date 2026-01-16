import React from 'react';
import { TravelPackage } from '../types';
import PackageCard from './PackageCard';
import PriceTrendChart from './PriceTrendChart';
import { ArrowRight, Filter } from 'lucide-react';

interface OffersSectionProps {
  title: string;
  packages: TravelPackage[];
  isDarkMode: boolean;
}

const OffersSection: React.FC<OffersSectionProps> = ({ title, packages, isDarkMode }) => {
  return (
    <section className="py-12 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        <div className="flex justify-between items-end mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">As melhores oportunidades selecionadas para você</p>
          </div>
          <a href="#" className="hidden md:flex items-center text-cvc-blue dark:text-cvc-yellow font-semibold hover:underline text-sm">
            Ver todas as ofertas <ArrowRight size={16} className="ml-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column: Filters (Hidden on mobile for now, or simplified) */}
          <div className="hidden lg:block lg:col-span-1">
             <div className="bg-gray-50 dark:bg-slate-800 p-5 rounded-lg border border-gray-100 dark:border-slate-700 sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                   <Filter size={18} className="text-cvc-blue dark:text-cvc-yellow" />
                   <h4 className="font-bold text-gray-800 dark:text-white text-sm">Filtros</h4>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">Categorias</h5>
                        <div className="space-y-2">
                            {['Praia e Sol', 'Frio e Montanha', 'Família', 'All Inclusive'].map(cat => (
                                <div key={cat} className="flex items-center group cursor-pointer">
                                    <input type="checkbox" id={cat} className="rounded border-gray-300 text-cvc-blue focus:ring-cvc-blue bg-white dark:bg-slate-700 dark:border-slate-600" />
                                    <label htmlFor={cat} className="ml-2 text-sm text-gray-600 dark:text-gray-300 group-hover:text-cvc-blue dark:group-hover:text-cvc-yellow transition-colors cursor-pointer">{cat}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-slate-700 pt-4">
                        <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">Preço</h5>
                        <input type="range" className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cvc-blue" />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Min</span>
                            <span>Max</span>
                        </div>
                    </div>
                </div>
             </div>
          </div>

          {/* Right Column: Grid & Charts */}
          <div className="col-span-1 lg:col-span-3">
             {/* Comparador de Preços Multidatas - Now placed above the grid */}
             <div className="mb-8">
               <PriceTrendChart isDarkMode={isDarkMode} />
             </div>

             {packages.length === 0 ? (
               <div className="text-center py-20 bg-gray-50 dark:bg-slate-800 rounded-lg border-2 border-dashed border-gray-200 dark:border-slate-700">
                 <p className="text-gray-500 dark:text-gray-400">Nenhum pacote encontrado para esta busca.</p>
               </div>
             ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {packages.map((pkg) => (
                   <PackageCard key={pkg.id} pkg={pkg} />
                 ))}
               </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;