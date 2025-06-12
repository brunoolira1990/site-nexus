const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4">NexusVálvulas</h3>
            <p className="text-gray-400">
              Soluções de alta qualidade em válvulas e conexões industriais.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Mapa do Site</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Produtos</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Serviços</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contato</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <p className="text-gray-400">Email: contato@nexusvalvulas.com.br</p>
            <p className="text-gray-400">Telefone: (11) 99999-9999</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} NexusVálvulas. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 