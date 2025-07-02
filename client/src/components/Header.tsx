import { Link } from 'react-router-dom';

const Header = () => {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Produtos', path: '/produtos' },
    { label: 'Sobre Nós', path: '/sobre-nos' },
    { label: 'Contato', path: '/contato' },
  ];

  return (
    <header className="bg-white shadow-md">
      {/* Top Header */}
      <div className="bg-gray-100 py-2 hidden lg:block">
        <div className="container mx-auto px-4 flex items-center">
          {/* Logo principal para telas grandes */}
          <Link to="/">
            {/* Aumentar o tamanho do logo principal */}
            <img src="/img/logo-nexus.png" alt="Nexus Válvulas Logo" className="h-24" />
          </Link>
          {/* Logos Adicionais - Centralizar e ocupar espaço disponível */}
          <div className="flex items-center space-x-2 justify-center flex-grow">
            <img src="/img/crc.png" alt="CRC" className="h-8" />
            <img src="/img/me.png" alt="ME" className="h-8" />
            <img src="/img/comlink.png" alt="Comlink" className="h-8" />
          </div>
          {/* Informações de contato para telas grandes - Alinhar à direita */}
          <div className="flex items-center space-x-6 ml-auto">
            <div className="flex items-center space-x-2 text-gray-600">
              <i className="fa fa-envelope"></i>
              <span>nexus@nexusvalvulas.com.br</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <i className="fa fa-phone"></i>
              <span>(11) 4240-8832</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="bg-white sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          {/* Logo principal e logos adicionais para telas pequenas */}
          <div className="lg:hidden flex items-center space-x-2">
            <Link to="/">
              {/* Aumentar o tamanho do logo principal para telas pequenas */}
              <img src="/img/logo-nexus250116.png" alt="Nexus Válvulas Logo" className="h-16" />
            </Link>
             {/* Logos Adicionais - Centralizar e ocupar espaço disponível */}
            <div className="flex items-center space-x-1 justify-center flex-grow">
              <img src="/img/crc.png" alt="CRC" className="h-6" />
              <img src="/img/me.png" alt="ME" className="h-6" />
              <img src="/img/comlink.png" alt="Comlink" className="h-6" />
            </div>
          </div>
          {/* Navegação principal */}
          <nav className="hidden lg:flex flex-grow justify-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-gray-800 font-semibold hover:text-blue-600 transition-colors duration-300"
              >
                {item.label.toUpperCase()}
              </Link>
            ))}
          </nav>
          {/* Botão do menu mobile */}
          <div className="lg:hidden">
            <button className="text-gray-800 focus:outline-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m4 6H4"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;