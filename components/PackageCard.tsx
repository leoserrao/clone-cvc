import React from 'react';
import { TravelPackage } from '../types';
import { MessageCircle, Flame, Clock } from 'lucide-react';

interface PackageCardProps {
  pkg: TravelPackage;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Olá! Vi o pacote para *${pkg.destination}* por R$ ${pkg.basePrice} e gostaria de verificar disponibilidade.`
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.destination} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {pkg.discountPercentage && pkg.discountPercentage > 0 && (
          <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            -{pkg.discountPercentage}% OFF
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <span className="text-white text-xs font-medium bg-black/30 px-2 py-0.5 rounded backdrop-blur-sm">
            {pkg.duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Social Proof Scarcity */}
        {pkg.socialProof && (
          <div className="flex items-center gap-3 mb-2 text-[10px] font-bold">
            <span className="flex items-center text-orange-500 bg-orange-50 dark:bg-orange-900/30 px-1.5 py-0.5 rounded">
              <Flame size={12} className="mr-1" />
              {pkg.socialProof.viewers} vendo agora
            </span>
            {pkg.socialProof.remaining < 5 && (
              <span className="flex items-center text-red-500 bg-red-50 dark:bg-red-900/30 px-1.5 py-0.5 rounded">
                <Clock size={12} className="mr-1" />
                Só {pkg.socialProof.remaining} vagas
              </span>
            )}
          </div>
        )}

        <h3 className="text-lg font-bold text-cvc-blue dark:text-white mb-1 line-clamp-1">
          {pkg.destination}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          {pkg.departureLocation}
        </p>

        <div className="mt-auto">
          <div className="mb-1">
            <span className="text-xs text-gray-400 line-through mr-2">
              R$ {(pkg.basePrice * 1.2).toFixed(0)}
            </span>
            <span className="text-sm text-green-600 font-semibold">
              Preço exclusivo
            </span>
          </div>
          
          <div className="flex items-end gap-1 mb-1">
            <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">A partir de</span>
            <span className="text-2xl font-bold text-cvc-blue dark:text-cvc-yellow">
              R$ {pkg.basePrice}
            </span>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            ou {pkg.installments}x de R$ {(pkg.basePrice / pkg.installments).toFixed(0)} sem juros
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button className="bg-cvc-yellow hover:bg-yellow-400 text-cvc-blue text-sm font-bold py-2 rounded transition-colors">
              Detalhes
            </button>
            <button 
              onClick={handleWhatsAppClick}
              className="border border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 text-sm font-bold py-2 rounded transition-colors flex items-center justify-center gap-1"
            >
              <MessageCircle size={16} />
              Zap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;