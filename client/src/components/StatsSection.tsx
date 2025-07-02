const StatsSection = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-nexus-blue mb-2">20+</div>
            <div className="text-gray-600">Anos de Experiência</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-nexus-blue mb-2">1000+</div>
            <div className="text-gray-600">Clientes Atendidos</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-nexus-blue mb-2">50+</div>
            <div className="text-gray-600">Tipos de Produtos</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-nexus-blue mb-2">24/7</div>
            <div className="text-gray-600">Suporte Técnico</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection; 