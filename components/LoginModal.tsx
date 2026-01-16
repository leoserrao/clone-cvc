import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Loader2, AlertCircle } from 'lucide-react';
import { loginUser, registerUser } from '../services/authService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegistering) {
        await registerUser(email, password, name);
      } else {
        await loginUser(email, password);
      }
      onClose(); // Fecha o modal no sucesso
    } catch (err: any) {
      // Simplificando mensagens de erro do Firebase para o usuário
      let msg = "Ocorreu um erro. Tente novamente.";
      if (err.message.includes('auth/invalid-credential')) msg = "E-mail ou senha incorretos.";
      if (err.message.includes('auth/email-already-in-use')) msg = "Este e-mail já está cadastrado.";
      if (err.message.includes('auth/weak-password')) msg = "A senha deve ter pelo menos 6 caracteres.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transition-all transform scale-100">
        
        {/* Header */}
        <div className="bg-cvc-blue p-6 text-white text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-1">
            {isRegistering ? 'Crie sua conta' : 'Bem-vindo de volta!'}
          </h2>
          <p className="text-white/80 text-sm">
            {isRegistering ? 'Acesse ofertas exclusivas.' : 'Acesse sua conta para continuar.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 dark:border-slate-700">
          <button 
            onClick={() => { setIsRegistering(false); setError(null); }}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors ${!isRegistering ? 'text-cvc-blue dark:text-cvc-yellow border-b-2 border-cvc-blue dark:border-cvc-yellow' : 'text-gray-400'}`}
          >
            Entrar
          </button>
          <button 
            onClick={() => { setIsRegistering(true); setError(null); }}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors ${isRegistering ? 'text-cvc-blue dark:text-cvc-yellow border-b-2 border-cvc-blue dark:border-cvc-yellow' : 'text-gray-400'}`}
          >
            Cadastrar
          </button>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {isRegistering && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Nome Completo</label>
                <div className="flex items-center border border-gray-200 dark:border-slate-600 rounded-lg p-3 focus-within:border-cvc-blue dark:bg-slate-700 transition-colors">
                  <UserIcon size={18} className="text-gray-400 mr-2" />
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome" 
                    className="w-full outline-none text-sm bg-transparent dark:text-white" 
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">E-mail</label>
              <div className="flex items-center border border-gray-200 dark:border-slate-600 rounded-lg p-3 focus-within:border-cvc-blue dark:bg-slate-700 transition-colors">
                <Mail size={18} className="text-gray-400 mr-2" />
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com" 
                  className="w-full outline-none text-sm bg-transparent dark:text-white" 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Senha</label>
              <div className="flex items-center border border-gray-200 dark:border-slate-600 rounded-lg p-3 focus-within:border-cvc-blue dark:bg-slate-700 transition-colors">
                <Lock size={18} className="text-gray-400 mr-2" />
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******" 
                  className="w-full outline-none text-sm bg-transparent dark:text-white" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-cvc-yellow hover:bg-yellow-400 text-cvc-blue font-bold py-3.5 rounded-lg transition-all shadow-md mt-4 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                isRegistering ? 'Criar Conta' : 'Acessar Conta'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;