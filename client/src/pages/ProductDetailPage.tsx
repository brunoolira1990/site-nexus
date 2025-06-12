import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  // No futuro, usaremos o 'id' para buscar os dados do produto de uma API.
  // Por enquanto, vamos apenas exibi-lo.

  // Dados de exemplo (mock) que corresponderiam ao 'id'
  const product = {
    name: `Produto Exemplo ${id}`,
    imageUrl: 'https://images.unsplash.com/photo-1596877073537-e2c47646a742?q=80&w=1974&auto=format&fit=crop',
    description: 'Esta é uma descrição detalhada e completa sobre o produto, falando sobre suas especificações técnicas, materiais de fabricação, aplicações recomendadas, certificações e muito mais. O objetivo é fornecer ao cliente todas as informações necessárias para a tomada de decisão.',
    specs: [
      { label: 'Material', value: 'Aço Inox 316' },
      { label: 'Conexão', value: 'Rosca NPT' },
      { label: 'Pressão Máxima', value: '150 bar' },
      { label: 'Temperatura', value: '-20°C a 180°C' },
    ]
  };

  return (
    <div className="container mx-auto p-4 my-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img className="w-full h-auto rounded-lg" src={product.imageUrl} alt={product.name} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-6">{product.description}</p>
            <div className="border-t pt-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Especificações Técnicas</h2>
              <ul>
                {product.specs.map(spec => (
                  <li key={spec.label} className="flex justify-between py-2 border-b">
                    <span className="font-semibold">{spec.label}:</span>
                    <span>{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 