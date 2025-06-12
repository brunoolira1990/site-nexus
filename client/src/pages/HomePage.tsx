import Hero from '../components/Hero';
import Segments from '../components/Segments';
import ProductCard from '../components/ProductCard';

const featuredProducts = [
  {
    id: 1,
    name: 'Válvula Esfera Tripartida',
    description: 'Válvula de bloqueio de fluxo para aplicações industriais de alta performance e durabilidade.',
    imageUrl: 'https://images.unsplash.com/photo-1616837544573-5596475a4390?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Válvula Borboleta',
    description: 'Ideal para controle e isolamento de fluidos em grandes diâmetros. Operação rápida e leve.',
    imageUrl: 'https://images.unsplash.com/photo-1605370215962-13b34bf429b3?q=80&w=1935&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Válvula de Retenção',
    description: 'Impede o refluxo de fluidos na tubulação, garantindo a segurança do sistema.',
    imageUrl: 'https://images.unsplash.com/photo-1596877073537-e2c47646a742?q=80&w=1974&auto=format&fit=crop'
  }
];

const HomePage = () => {
  return (
    <>
      <Hero />
      <Segments />
      <div className="container mx-auto p-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Produtos em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage; 