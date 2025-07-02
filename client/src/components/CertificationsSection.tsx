const CertificationsSection = () => {
  const certifications = [
    {
      name: "ISO 9001",
      description: "Sistema de Gestão da Qualidade",
      icon: "🏆"
    },
    {
      name: "ISO 14001",
      description: "Sistema de Gestão Ambiental",
      icon: "🌱"
    },
    {
      name: "OHSAS 18001",
      description: "Sistema de Gestão de Saúde e Segurança Ocupacional",
      icon: "🛡️"
    },
    {
      name: "ANSI/ASME",
      description: "Padrões Americanos de Válvulas",
      icon: "⚙️"
    }
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Certificações e Qualidade</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nossa empresa mantém rigorosos padrões de qualidade e possui 
            certificações internacionais que garantem a excelência de nossos produtos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">{cert.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{cert.name}</h3>
              <p className="text-gray-600">{cert.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Compromisso com a Qualidade</h3>
            <p className="text-gray-600 mb-6">
              Todos os nossos produtos passam por rigorosos controles de qualidade 
              e testes antes de serem disponibilizados para nossos clientes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">100%</div>
                <div className="text-gray-600">Testados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">24h</div>
                <div className="text-gray-600">Prazo de Resposta</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">5 Anos</div>
                <div className="text-gray-600">Garantia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationsSection; 