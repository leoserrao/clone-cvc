import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  CalendarDays, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Plane
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
  onExitAdmin: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeView, setActiveView, onExitAdmin }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'packages', label: 'Gerenciar Pacotes', icon: Package },
    { id: 'bookings', label: 'Reservas', icon: CalendarDays },
    { id: 'users', label: 'Clientes', icon: Users },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex transition-colors duration-300">
      
      {/* Sidebar - Desktop */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} hidden md:flex flex-col bg-cvc-blue dark:bg-slate-800 text-white transition-all duration-300 shadow-xl z-20`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {isSidebarOpen ? (
             <div className="flex items-center gap-2 font-bold text-xl">
               <span className="text-cvc-yellow">CVC</span> Admin
             </div>
          ) : (
             <div className="font-bold text-xl text-cvc-yellow mx-auto">C</div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white/70 hover:text-white">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-6 px-2 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                activeView === item.id 
                  ? 'bg-cvc-yellow text-cvc-blue font-bold shadow-lg' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon size={20} className={!isSidebarOpen ? 'mx-auto' : ''} />
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={onExitAdmin}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-300 hover:bg-red-500/20 transition-colors`}
          >
            <LogOut size={20} className={!isSidebarOpen ? 'mx-auto' : ''} />
            {isSidebarOpen && <span>Sair do Admin</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-cvc-blue dark:bg-slate-800 flex items-center justify-between px-4 shadow-md text-white">
            <div className="font-bold text-lg">CVC Admin</div>
            <button onClick={onExitAdmin} className="text-sm bg-white/10 px-3 py-1 rounded">Sair</button>
        </header>

        {/* Mobile Nav Tabs (Bottom) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 flex justify-around p-2 z-50">
            {menuItems.slice(0, 4).map((item) => (
                 <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`flex flex-col items-center p-2 rounded-lg ${activeView === item.id ? 'text-cvc-blue dark:text-cvc-yellow' : 'text-gray-400'}`}
                 >
                    <item.icon size={20} />
                    <span className="text-[10px] mt-1">{item.label}</span>
                 </button>
            ))}
        </div>

        <main className="flex-1 overflow-y-auto p-6 pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;