import React, { useState } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, YAxis, CartesianGrid } from 'recharts';
import { PRICE_HISTORY_MOCK } from '../constants';
import { Info } from 'lucide-react';

interface PriceTrendChartProps {
  isDarkMode: boolean;
  onDateSelect?: (date: string) => void;
}

const PriceTrendChart: React.FC<PriceTrendChartProps> = ({ isDarkMode, onDateSelect }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Dynamic Colors based on theme
  const axisColor = isDarkMode ? '#94a3b8' : '#64748b'; // slate-400 : slate-500
  const gridColor = isDarkMode ? '#334155' : '#e2e8f0'; // slate-700 : slate-200
  const tooltipBg = isDarkMode ? '#1e293b' : '#ffffff'; // slate-800 : white
  const tooltipText = isDarkMode ? '#f1f5f9' : '#0f172a'; // slate-100 : slate-900

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            Comparador de Preços Multidatas
            <div className="group relative cursor-help">
                <Info size={16} className="text-gray-400" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Compare preços em datas próximas
                </div>
            </div>
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Flexibilidade na data pode gerar economia.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-lg border border-green-100 dark:border-green-900/50">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
           <span className="text-sm font-bold text-green-700 dark:text-green-400">
              Economize até 20% viajando na Terça
           </span>
        </div>
      </div>
      
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={PRICE_HISTORY_MOCK} 
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            onMouseMove={(state) => {
              if (state.isTooltipActive) {
                setHoveredIndex(state.activeTooltipIndex ?? null);
              } else {
                setHoveredIndex(null);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: axisColor, fontWeight: 500 }} 
              dy={10}
            />
            <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: axisColor }}
                tickFormatter={(value) => `R$${value}`}
            />
            <Tooltip 
              cursor={{ fill: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
              contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  backgroundColor: tooltipBg,
                  color: tooltipText,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
              }}
              formatter={(value: number) => [`R$ ${value}`, 'Preço']}
              labelStyle={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}
            />
            <Bar dataKey="price" radius={[6, 6, 0, 0]} barSize={40} onClick={(data) => onDateSelect && onDateSelect(data.day)}>
              {PRICE_HISTORY_MOCK.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.bestDeal ? '#10B981' : (isDarkMode ? '#475569' : '#CBD5E1')} 
                  className={`transition-all duration-300 cursor-pointer hover:opacity-80`}
                  stroke={hoveredIndex === index ? (isDarkMode ? '#fff' : '#000') : 'none'}
                  strokeWidth={2}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceTrendChart;