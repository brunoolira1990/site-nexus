const Hero = () => {
  return (
    <section 
      className="bg-cover bg-center h-screen text-white flex items-center justify-center relative" 
      style={{ backgroundImage: "url('/img/banner/banner.png')" }}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Nexus Válvulas e 
          <span className="text-orange-500"> Conexões Industriais</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Com mais de 20 anos de experiência no mercado, a Nexus é uma das principais 
          fornecedoras de válvulas e conexões industriais no Brasil.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a 
            href="#produtos"
            className="bg-orange-500 hover:bg-nexus-blue text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300"
          >
            Conheça Nossos Produtos
          </a>
          <a 
            href="#contato"
            className="bg-transparent hover:bg-white hover:text-nexus-blue text-white font-bold py-4 px-8 rounded-lg text-lg border-2 border-white transition duration-300"
          >
            Solicitar Orçamento
          </a>
        </div>
        
        {/* Estatísticas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500">20+</div>
            <div className="text-sm">Anos de Experiência</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500">1000+</div>
            <div className="text-sm">Clientes Atendidos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500">50+</div>
            <div className="text-sm">Tipos de Produtos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500">24/7</div>
            <div className="text-sm">Suporte Técnico</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;