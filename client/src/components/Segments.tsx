interface Segment {
  name: string;
  description: string;
  imageUrl: string;
}

const segmentsData: Segment[] = [
  {
    name: "Metalúrgicas",
    description: "Fornecemos válvulas, conexões e acessórios de alta qualidade que atendem às rigorosas exigências do setor metalúrgico.",
    imageUrl: "/img/segmentos/metalurgica.jpg"
  },
  {
    name: "Alimentícias",
    description: "Garantimos a segurança e qualidade dos produtos no setor alimentício com válvulas e acessórios que seguem as normas sanitárias.",
    imageUrl: "/img/segmentos/alimenticias.jpg"
  },
  {
    name: "Petroquímica",
    description: "Oferecemos soluções robustas que suportam condições extremas, garantindo eficiência e segurança operacional.",
    imageUrl: "/img/segmentos/petroquimica.jpg"
  },
  {
    name: "Química",
    description: "Lidamos com substâncias corrosivas e reações complexas, fornecendo válvulas e tubos com máxima segurança e eficiência.",
    imageUrl: "/img/segmentos/quimicas.jpg"
  },
  {
    name: "Refinarias",
    description: "Nossos produtos atendem às exigências do setor de processamento de petróleo, garantindo a operação segura e eficiente.",
    imageUrl: "/img/segmentos/refinarias.jpg"
  },
  {
    name: "Siderúrgicas",
    description: "Nossas válvulas e acessórios suportam altas temperaturas e pressões, garantindo a qualidade na produção de aço.",
    imageUrl: "/img/segmentos/siderurgicas.jpg"
  }
];

const Segments = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Segmentos Atendidos</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {segmentsData.map((segment, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={segment.imageUrl} alt={segment.name} className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{segment.name}</h3>
                <p className="text-gray-600">{segment.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Segments; 