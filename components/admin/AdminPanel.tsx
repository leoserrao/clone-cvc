import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import DashboardStats from './DashboardStats';
import { MOCK_PACKAGES, MOCK_BOOKINGS } from '../../constants';
import { TravelPackage, Booking } from '../../types';
// Fixed: Added Settings to imports
import { Edit, Trash2, Plus, Search, CheckCircle, XCircle, AlertCircle, Settings } from 'lucide-react';

interface AdminPanelProps {
  onExit: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onExit }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [packages, setPackages] = useState<TravelPackage[]>(MOCK_PACKAGES);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [searchTerm, setSearchTerm] = useState('');

  // --- Package Management Logic ---
  const handleDeletePackage = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este pacote?')) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  // --- Render Functions ---

  const renderPackages = () => (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
         <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Gerenciar Pacotes</h2>
         <button className="bg-cvc-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-800 transition-colors">
            <Plus size={18} /> Novo Pacote
         </button>
       </div>

       <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-gray-50 dark:bg-slate-700/50 text-gray-500 dark:text-gray-300 text-xs uppercase font-semibold">
                 <tr>
                   <th className="px-6 py-4">Pacote</th>
                   <th className="px-6 py-4">Preço Base</th>
                   <th className="px-6 py-4">Origem</th>
                   <th className="px-6 py-4 text-right">Ações</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                 {packages.map(pkg => (
                   <tr key={pkg.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                     <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                         <img src={pkg.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                         <div>
                           <div className="font-bold text-gray-800 dark:text-white">{pkg.destination}</div>
                           <div className="text-xs text-gray-500">{pkg.duration}</div>
                         </div>
                       </div>
                     </td>
                     <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">
                       R$ {pkg.basePrice.toLocaleString()}
                     </td>
                     <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                       {pkg.departureLocation}
                     </td>
                     <td className="px-6 py-4 text-right">
                       <div className="flex justify-end gap-2">
                         <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:hover:bg-blue-900/20">
                           <Edit size={18} />
                         </button>
                         <button 
                            onClick={() => handleDeletePackage(pkg.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:hover:bg-red-900/20"
                         >
                           <Trash2 size={18} />
                         </button>
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
            </table>
          </div>
       </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
         <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Reservas Recentes</h2>
         <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar reserva..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-cvc-blue outline-none"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
         </div>
       </div>

       <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-gray-50 dark:bg-slate-700/50 text-gray-500 dark:text-gray-300 text-xs uppercase font-semibold">
                 <tr>
                   <th className="px-6 py-4">ID</th>
                   <th className="px-6 py-4">Cliente</th>
                   <th className="px-6 py-4">Pacote</th>
                   <th className="px-6 py-4">Data</th>
                   <th className="px-6 py-4">Status</th>
                   <th className="px-6 py-4">Valor</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                 {bookings
                    .filter(b => 
                        b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        b.id.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(booking => (
                   <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                     <td className="px-6 py-4 font-mono text-xs text-gray-500">
                       {booking.id}
                     </td>
                     <td className="px-6 py-4">
                       <div className="font-medium text-gray-800 dark:text-white">{booking.customerName}</div>
                       <div className="text-xs text-gray-500">{booking.customerEmail}</div>
                     </td>
                     <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                       {booking.packageName}
                     </td>
                     <td className="px-6 py-4 text-sm text-gray-500">
                       {new Date(booking.date).toLocaleDateString('pt-BR')}
                     </td>
                     <td className="px-6 py-4">
                       <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border
                         ${booking.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900' : ''}
                         ${booking.status === 'pending' ? 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-900' : ''}
                         ${booking.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900' : ''}
                       `}>
                          {booking.status === 'confirmed' && <CheckCircle size={12} />}
                          {booking.status === 'pending' && <AlertCircle size={12} />}
                          {booking.status === 'cancelled' && <XCircle size={12} />}
                          {booking.status === 'confirmed' ? 'Confirmado' : booking.status === 'pending' ? 'Pendente' : 'Cancelado'}
                       </span>
                     </td>
                     <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">
                       R$ {booking.amount.toLocaleString()}
                     </td>
                   </tr>
                 ))}
               </tbody>
            </table>
          </div>
       </div>
    </div>
  );

  return (
    <AdminLayout activeView={activeView} setActiveView={setActiveView} onExitAdmin={onExit}>
      {activeView === 'dashboard' && <DashboardStats bookings={bookings} />}
      {activeView === 'packages' && renderPackages()}
      {activeView === 'bookings' && renderBookings()}
      {/* Placeholder for other views */}
      {['users', 'settings'].includes(activeView) && (
          <div className="flex flex-col items-center justify-center h-96 text-gray-400">
             <Settings size={48} className="mb-4 opacity-50" />
             <p>Módulo em desenvolvimento</p>
          </div>
      )}
    </AdminLayout>
  );
};

export default AdminPanel;