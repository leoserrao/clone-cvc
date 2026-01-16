import React from 'react';
import { MOCK_CARS } from '../constants';
import { Users, Briefcase, Settings } from 'lucide-react';

const CarRentalSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Aluguel de Carros</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_CARS.map(car => (
            <div key={car.id} className="bg-white dark:bg-slate-700 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-slate-600 flex flex-col md:flex-row h-auto md:h-40">
              <div className="w-full md:w-1/3 h-40 md:h-full relative">
                 <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
                 <span className="absolute top-2 left-2 bg-cvc-yellow text-cvc-blue text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                   {car.category}
                 </span>
              </div>
              <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white text-lg">{car.model}</h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-300">
                    <span className="flex items-center gap-1"><Users size={14} /> {car.capacity}</span>
                    <span className="flex items-center gap-1"><Briefcase size={14} /> {car.luggage}</span>
                    <span className="flex items-center gap-1"><Settings size={14} /> {car.transmission}</span>
                  </div>
                </div>
                <div className="flex justify-between items-end mt-3">
                  <div>
                    <span className="text-xs text-gray-400 block">Diária a partir de</span>
                    <span className="text-xl font-bold text-cvc-blue dark:text-cvc-yellow">R$ {car.dailyRate.toFixed(2)}</span>
                  </div>
                  <button className="text-cvc-blue dark:text-white border border-cvc-blue dark:border-white hover:bg-cvc-blue hover:text-white dark:hover:bg-white dark:hover:text-cvc-blue text-xs font-bold px-4 py-2 rounded transition-colors">
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Upsell Card */}
          <div className="bg-gradient-to-br from-cvc-blue to-blue-800 rounded-lg p-6 flex flex-col justify-center items-start text-white shadow-lg">
            <h3 className="text-xl font-bold mb-2">Clube CVC</h3>
            <p className="text-sm opacity-90 mb-4">Acumule pontos em cada aluguel e troque por viagens incríveis.</p>
            <button className="bg-white text-cvc-blue px-4 py-2 rounded font-bold text-sm hover:bg-gray-100">
              Saiba mais
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarRentalSection;