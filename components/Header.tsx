import React, { useState } from 'react';
import { Menu, Search, User, Moon, Sun, ShoppingBag, LogOut, LayoutDashboard } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  user: FirebaseUser | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onAdminClick: () => void; // New prop
}

const Header: React.FC<HeaderProps> = ({ 
  isDarkMode, 
  toggleTheme, 
  user, 
  onLoginClick,
  onLogoutClick,
  onAdminClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navItems = [
    'Passagens', 'Hotéis', 'Pacotes', 'Cruzeiros', 'Carros', 'Clube CVC'
  ];

  return (
    <header className="sticky top-0 z-50 bg-cvc-blue dark:bg-slate-900 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
                {/* Logo Placeholder - Text based for code simplicity */}
                <div className="text-cvc-yellow font-bold text-3xl tracking-tighter">CVC</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-white font-medium hover:text-cvc-yellow transition-colors text-sm uppercase tracking-wide"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-white/10 rounded-full px-3 py-1.5 border border-white/20">
              <input 
                type="text" 
                placeholder="Busque por pedido..." 
                className="bg-transparent border-none outline-none text-white text-sm placeholder-gray-300 w-32 focus:w-48 transition-all"
              />
              <Search size={16} className="text-white ml-2" />
            </div>

            <button 
              onClick={toggleTheme}
              className="text-white hover:text-cvc-yellow transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Auth Button Logic */}
            {user ? (
               <div className="relative">
                 <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 text-white hover:text-cvc-yellow font-medium bg-white/10 px-3 py-1.5 rounded-full"
                 >
                   <User size={20} />
                   <span className="hidden sm:inline text-sm max-w-[100px] truncate">
                     {user.displayName || user.email?.split('@')[0]}
                   </span>
                 </button>
                 
                 {/* User Dropdown */}
                 {isUserMenuOpen && (
                   <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl py-2 border border-gray-100 dark:border-slate-700 animate-in fade-in slide-in-from-top-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Logado como</p>
                        <p className="text-sm font-bold text-gray-800 dark:text-white truncate">{user.email}</p>
                      </div>
                      
                      {/* Admin Link for logged users (Simulated permission check) */}
                      <button 
                        onClick={() => {
                            onAdminClick();
                            setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-cvc-blue dark:text-cvc-yellow hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2 font-semibold"
                      >
                        <LayoutDashboard size={14} /> Painel Admin
                      </button>

                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700">Minhas Viagens</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700">Meus Dados</a>
                      <button 
                        onClick={() => {
                          onLogoutClick();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                      >
                        <LogOut size={14} /> Sair
                      </button>
                   </div>
                 )}
               </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="flex items-center gap-2 text-white hover:text-cvc-yellow font-medium"
              >
                <User size={20} />
                <span className="hidden sm:inline text-sm">Entrar</span>
              </button>
            )}
            
            <button className="text-white hover:text-cvc-yellow relative">
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 bg-cvc-yellow text-cvc-blue text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-cvc-blue dark:bg-slate-800 border-t border-white/10">
          <nav className="flex flex-col p-4">
            {navItems.map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-white py-3 border-b border-white/10 hover:text-cvc-yellow"
              >
                {item}
              </a>
            ))}
            {/* Mobile Login option */}
            {!user && (
                <button onClick={onLoginClick} className="text-left text-white py-3 font-bold hover:text-cvc-yellow">
                    Entrar / Cadastrar
                </button>
            )}
            {user && (
                <>
                  <button onClick={onAdminClick} className="text-left text-cvc-yellow py-3 font-bold hover:text-white border-b border-white/10">
                      Acessar Admin
                  </button>
                  <button onClick={onLogoutClick} className="text-left text-red-300 py-3 font-bold hover:text-red-400">
                      Sair da conta
                  </button>
                </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;