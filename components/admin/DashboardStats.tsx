import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Booking } from '../../types';

interface DashboardStatsProps {
  bookings: Booking[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ bookings }) => {
  // Mock aggregation
  const totalRevenue = bookings.reduce((acc, curr) => acc + curr.amount, 0);
  const totalSales = bookings.length;
  const pending = bookings.filter(b => b.status === 'pending').length;

  const chartData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Fev', revenue: 3000 },
    { name: 'Mar', revenue: 2000 },
    { name: 'Abr', revenue: 2780 },
    { name: 'Mai', revenue: 1890 },
    { name: 'Jun', revenue: 2390 },
    { name: 'Jul', revenue: 3490 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Visão Geral</h1>
         <div className="text-sm text-gray-500 dark:text-gray-400">Última atualização: Hoje, 14:30</div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Receita Total</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                R$ {totalRevenue.toLocaleString()}
              </h3>
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm text-green-500">
            <ArrowUpRight size={16} />
            <span>+12.5%</span>
            <span className="text-gray-400 ml-1">vs mês anterior</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Reservas</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {totalSales}
              </h3>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
              <ShoppingBag size={20} />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm text-blue-500">
            <ArrowUpRight size={16} />
            <span>+5.2%</span>
            <span className="text-gray-400 ml-1">vs mês anterior</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Pendentes</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {pending}
              </h3>
            </div>
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm text-orange-500">
            <span>Requer atenção</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Clientes Ativos</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                1,204
              </h3>
            </div>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600">
              <Users size={20} />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm text-green-500">
             <ArrowUpRight size={16} />
             <span>+3.1%</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Receita Mensal</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#003399" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#003399" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} tickFormatter={(value) => `R$${value}`} />
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E5E7EB" />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#003399" fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Status de Reservas</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                  { name: 'Confirmadas', value: bookings.filter(b => b.status === 'confirmed').length, color: '#10B981' },
                  { name: 'Pendentes', value: bookings.filter(b => b.status === 'pending').length, color: '#F59E0B' },
                  { name: 'Canceladas', value: bookings.filter(b => b.status === 'cancelled').length, color: '#EF4444' },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={50}>
                  {
                    [0,1,2].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#10B981', '#F59E0B', '#EF4444'][index]} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;