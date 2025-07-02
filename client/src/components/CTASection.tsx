import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-nexus-blue mb-6">
          Precisa de uma Solução Industrial?
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Nossa equipe técnica está pronta para ajudar você a encontrar a melhor 
          solução para suas necessidades industriais.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/contato"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
          >
            Solicitar Orçamento
          </Link>
          <Link 
            to="/produtos"
            className="bg-transparent hover:bg-nexus-blue hover:text-white text-nexus-blue font-bold py-3 px-8 rounded-lg text-lg border-2 border-nexus-blue transition duration-300"
          >
            Ver Produtos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTASection; 