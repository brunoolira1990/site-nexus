import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
}

const ProductCard = ({ id, name, imageUrl, description }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      <img className="w-full h-56 object-cover" src={imageUrl} alt={name} />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 truncate">{description}</p>
        <Link 
          to={`/produtos/${id}`} 
          className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Saiba Mais
        </Link>
      </div>
    </div>
  );
};

export default ProductCard; 