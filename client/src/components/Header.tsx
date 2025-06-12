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
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/">
            <img src="/img/logo-nexus250116.png" alt="Nexus Válvulas Logo" className="h-16" />
          </Link>
          <div className="flex items-center space-x-6">
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
          <div className="lg:hidden">
            <Link to="/">
              <img src="/img/logo-nexus250116.png" alt="Nexus Válvulas Logo" className="h-12" />
            </Link>
          </div>
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