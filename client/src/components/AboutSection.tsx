const AboutSection = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Sobre a Nexus</h2>
            <p className="text-lg text-gray-600 mb-6">
              Com mais de 20 anos de experiência no mercado, a Nexus é uma das principais 
              fornecedoras de válvulas e conexões industriais no Brasil.
            </p>
            <p className="text-gray-600 mb-6">
              Nossa missão é fornecer produtos de alta qualidade que garantam a segurança, 
              eficiência e confiabilidade dos processos industriais de nossos clientes.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">20+</div>
                <div className="text-gray-600">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">1000+</div>
                <div className="text-gray-600">Clientes Atendidos</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="/img/about/about.png" 
              alt="Nexus Válvulas" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection; 