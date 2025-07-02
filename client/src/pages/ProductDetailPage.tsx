import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  long_description: string;
  image_url: string;
  specifications: Record<string, any>;
  category_id: number;
  category_name?: string;
}

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        if (!res.ok) throw new Error('Erro ao buscar produto');
        const products: Product[] = await res.json();
        const found = products.find(p => String(p.id) === String(id));
        if (!found) throw new Error('Produto não encontrado');
        setProduct(found);
        // Se houver tamanhos, seleciona o primeiro por padrão
        if (found.specifications && found.specifications.tamanhos) {
          const sizes = Object.keys(found.specifications.tamanhos);
          if (sizes.length > 0) setSelectedSize(sizes[0]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Carregando...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Erro: {error}</div>;
  if (!product) return null;

  const specs = product.specifications || {};
  const hasVariations = specs.tamanhos && typeof specs.tamanhos === 'object';

  return (
    <div className="container mx-auto p-4 my-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {/* Imagem principal ou da variação selecionada */}
            <img
              className="w-full h-auto rounded-lg"
              src={
                hasVariations && selectedSize && specs.tamanhos[selectedSize]?.imagem
                  ? specs.tamanhos[selectedSize].imagem
                  : product.image_url
              }
              alt={product.name}
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-2">{product.description}</p>
            <p className="text-gray-700 mb-6">{product.long_description}</p>
            {hasVariations ? (
              <div className="mb-6">
                <label className="block font-semibold mb-2">Selecione o tamanho/modelo:</label>
                <select
                  className="border rounded px-3 py-2"
                  value={selectedSize ?? ''}
                  onChange={e => setSelectedSize(e.target.value)}
                >
                  {Object.keys(specs.tamanhos).map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                {/* Exibe especificações da variação selecionada */}
                {selectedSize && (
                  <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Especificações da Variação</h2>
                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                      {JSON.stringify(specs.tamanhos[selectedSize], null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Especificações Técnicas</h2>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                  {JSON.stringify(specs, null, 2)}
                </pre>
              </div>
            )}
            {specs.normas && Array.isArray(specs.normas) && (
              <div className="mb-2">
                <span className="font-semibold">Normas: </span>
                {specs.normas.join(', ')}
              </div>
            )}
            {product.category_name && (
              <div className="text-sm text-gray-500 mt-2">Categoria: {product.category_name}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 