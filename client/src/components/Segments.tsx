interface Segment {
  name: string;
  description: string;
  imageUrl: string;
  features: string[];
}

const segmentsData: Segment[] = [
  {
    name: "Metalúrgicas",
    description: "Fornecemos válvulas, conexões e acessórios de alta qualidade que atendem às rigorosas exigências do setor metalúrgico.",
    imageUrl: "/img/segmentos/metalurgica.jpg",
    features: ["Alta temperatura", "Resistência à corrosão", "Controle preciso"]
  },
  {
    name: "Alimentícias",
    description: "Garantimos a segurança e qualidade dos produtos no setor alimentício com válvulas e acessórios que seguem as normas sanitárias.",
    imageUrl: "/img/segmentos/alimenticias.jpg",
    features: ["Normas sanitárias", "Fácil limpeza", "Material inerte"]
  },
  {
    name: "Petroquímica",
    description: "Oferecemos soluções robustas que suportam condições extremas, garantindo eficiência e segurança operacional.",
    imageUrl: "/img/segmentos/petroquimica.jpg",
    features: ["Alta pressão", "Resistência química", "Segurança operacional"]
  },
  {
    name: "Química",
    description: "Lidamos com substâncias corrosivas e reações complexas, fornecendo válvulas e tubos com máxima segurança e eficiência.",
    imageUrl: "/img/segmentos/quimicas.jpg",
    features: ["Resistência química", "Controle de vazamento", "Materiais especiais"]
  },
  {
    name: "Refinarias",
    description: "Nossos produtos atendem às exigências do setor de processamento de petróleo, garantindo a operação segura e eficiente.",
    imageUrl: "/img/segmentos/refinarias.jpg",
    features: ["Alta pressão", "Temperatura extrema", "Confiabilidade"]
  },
  {
    name: "Siderúrgicas",
    description: "Nossas válvulas e acessórios suportam altas temperaturas e pressões, garantindo a qualidade na produção de aço.",
    imageUrl: "/img/segmentos/siderurgicas.jpg",
    features: ["Alta temperatura", "Resistência mecânica", "Durabilidade"]
  }
];

const Segments = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Segmentos Atendidos</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Atendemos diversos setores industriais com soluções personalizadas e produtos 
            de alta qualidade que garantem eficiência e segurança operacional.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {segmentsData.map((segment, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img src={segment.imageUrl} alt={segment.name} className="w-full h-48 object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">{segment.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{segment.description}</p>
                <div className="space-y-2">
                  {segment.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Segments; 