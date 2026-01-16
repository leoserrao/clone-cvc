import React from 'react';
import { Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 transition-colors duration-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        
        {/* Newsletter */}
        <div className="bg-cvc-blue rounded-2xl p-6 md:p-10 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-white md:w-1/2">
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Mail /> Receba ofertas exclusivas
            </h3>
            <p className="opacity-90 text-sm">Cadastre-se e receba em primeira mão descontos de até 50% em pacotes.</p>
          </div>
          <div className="w-full md:w-1/2 flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              placeholder="Seu nome" 
              className="flex-1 px-4 py-3 rounded-lg outline-none text-gray-900 text-sm"
            />
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="flex-1 px-4 py-3 rounded-lg outline-none text-gray-900 text-sm"
            />
            <button className="bg-cvc-yellow text-cvc-blue font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors">
              Cadastrar
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-sm">
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Sobre a CVC</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-cvc-blue dark:hover:text-cvc-yellow">Quem somos</a></li>
              <li><a href="#" className="hover:text-cvc-blue dark:hover:text-cvc-yellow">Imprensa</a></li>
              <li><a href="#" className="hover:text-cvc-blue dark:hover:text-cvc-yellow">Investidores</a></li>
              <li><a href="#" className="hover:text-cvc-blue dark:hover:text-cvc-yellow">Trabalhe conosco</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Ajuda e Suporte</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-cvc-blue dark:hover:text-cvc-yellow">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-cvc-blue dark:hover:text-cvc-yellow">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-cvc-blue dark:hover:text-cvc-yellow">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-cvc-blue dark:hover:text-cvc-yellow">Cancelamentos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Produtos</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-cvc-blue dark:hover:text-cvc-yellow">Passagens Aéreas</a></li>
              <li><a href="#" className="hover:text-cvc-blue dark:hover:text-cvc-yellow">Hotéis</a></li>
              <li><a href="#" className="hover:text-cvc-blue dark:hover:text-cvc-yellow">Carros</a></li>
              <li><a href="#" className="hover:text-cvc-blue dark:hover:text-cvc-yellow">Seguro Viagem</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Siga-nos</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-blue-600"><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-pink-600"><Instagram /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-red-600"><Youtube /></a>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Pagamento</h4>
            <div className="flex gap-2">
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-slate-800 pt-8 text-center text-xs text-gray-500 dark:text-gray-500">
          <p>CVC Brasil Operadora e Agência de Viagens S.A - CNPJ: 10.760.260/0001-19</p>
          <p>Rua da Catequese, 227, 11º andar, sala 111 - Bairro Jardim, Santo André - SP, CEP: 09090-400</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;