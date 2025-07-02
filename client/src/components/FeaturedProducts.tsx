import { Link } from 'react-router-dom';

interface FeaturedProduct {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
}

const featuredProducts: FeaturedProduct[] = [
  {
    id: 1,
    name: "Válvulas de Esfera",
    description: "Válvulas de esfera de alta qualidade para controle preciso de fluxo em sistemas industriais.",
    imageUrl: "/img/portfolio/valvula-esfera.jpg",
    category: "Válvulas"
  },
  {
    id: 2,
    name: "Conexões Forjadas",
    description: "Conexões forjadas com rosca e socket weld para sistemas de alta pressão.",
    imageUrl: "/img/portfolio/conexoes-forjadas.jpg",
    category: "Conexões"
  },
  {
    id: 3,
    name: "Flanges Industriais",
    description: "Flanges de diversos tipos para conexões seguras e eficientes.",
    imageUrl: "/img/portfolio/flanges.jpg",
    category: "Flanges"
  }
];

const FeaturedProducts = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Produtos em Destaque</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça nossa linha de produtos de alta qualidade, projetados para atender às necessidades 
            dos mais diversos setores industriais.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <Link 
                  to={`/produtos/${product.id}`}
                  className="inline-block bg-orange-500 hover:bg-nexus-blue text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/produtos"
            className="inline-block bg-nexus-blue hover:bg-nexus-blue-hover text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
          >
            Ver Todos os Produtos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts; 