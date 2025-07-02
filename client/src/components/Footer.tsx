const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Coluna 1: Logo e Endereço */}
          <div>
            {/* Substituir texto por imagem do logo */}
            <img src="/img/logo-nexus-letreiro.png" alt="Logo Nexus" className="mb-4 max-h-16 mx-auto md:mx-0" />
            <p className="text-gray-400">
              R. Miguel Langone, 341<br/>
              Itaquera<br/>
              São Paulo - SP<br/>
              CEP: 08215-330
            </p>
          </div>

          {/* Coluna 2: Mapa do Site (Links de Navegação) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Produtos</a></li>
              {/* Ajustado de 'Serviços' para 'Sobre Nós' */}
              <li><a href="#" className="hover:text-blue-400 transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Coluna 3: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Assine nossa Newsletter</h3>
            <form action="#" className="flex flex-col gap-2">
              <input type="email" placeholder="Digite seu e-mail" className="p-2 rounded text-gray-800" />
              <button type="submit" className="bg-orange-500 hover:bg-nexus-blue text-white p-2 rounded transition-colors">Assinar</button>
            </form>
            <p className="text-gray-400 mt-2">
              Assine nossa Newsletter e receba novidades exclusivas!
            </p>
          </div>
        </div>

        {/* Seção de Copyright e Logos Adicionais */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Nexus Válvulas e Conexões Industriais LTDA. Todos os direitos reservados.</p>
          {/* Logos Adicionais adicionados de volta */}
          <div className="flex justify-center space-x-4 mt-4">
            <img src="/img/crc.png" alt="CRC" className="h-8" />
            <img src="/img/me.png" alt="ME" className="h-8" />
            <img src="/img/comlink.png" alt="Comlink" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;