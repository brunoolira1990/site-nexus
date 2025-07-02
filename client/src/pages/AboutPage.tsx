const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-nexus-blue mb-4">Sobre Nós</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Saiba mais sobre a Nexus Válvulas e Conexões Industriais. Descubra nossa missão, visão, valores e como nos tornamos referência em soluções industriais.
          </p>
        </div>

        {/* Seção principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img src="/img/about/about.png" alt="Sobre a Nexus" className="rounded-lg shadow-lg w-full" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-nexus-blue mb-4">Por que escolher a Nexus?</h2>
            <p className="text-gray-700 mb-4">
              A Nexus Válvulas e Conexões Industriais é uma das principais fornecedoras de soluções industriais no Brasil. Com um portfólio completo, oferecemos válvulas, conexões, flanges, tubos, chapas, perfis, cantoneiras e acessórios industriais, atendendo às mais diversas demandas do mercado.
            </p>
            <ul className="mb-4 space-y-2">
              <li className="flex items-start"><span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></span> <span><b>Variedade e Qualidade:</b> Produtos certificados e de alto desempenho para garantir segurança e eficiência.</span></li>
              <li className="flex items-start"><span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></span> <span><b>Atendimento Personalizado:</b> Nossa equipe está pronta para encontrar as melhores soluções para o seu projeto.</span></li>
              <li className="flex items-start"><span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></span> <span><b>Entrega Ágil:</b> Compromisso com prazos e excelência em cada etapa do processo.</span></li>
            </ul>
            <p className="text-gray-700 mb-6">
              Na Nexus, somos o elo que conecta você às melhores soluções para o seu negócio.
            </p>
            <a href="/contato" className="inline-block bg-nexus-blue hover:bg-nexus-blue-hover text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300">Entre em Contato</a>
          </div>
        </div>

        {/* Seção de diferenciais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <img src="/img/svg_icon/airplane.png" alt="Transporte Seguro" className="mx-auto mb-4 h-16" />
            <h3 className="text-xl font-bold text-nexus-blue mb-2">Transporte Seguro</h3>
            <p className="text-gray-600">Garantimos transporte seguro e ágil para todos os nossos produtos, com logística eficiente e compromisso com a entrega.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <img src="/img/svg_icon/live.png" alt="Monitoramento de Pedidos" className="mx-auto mb-4 h-16" />
            <h3 className="text-xl font-bold text-nexus-blue mb-2">Monitoramento de Pedidos</h3>
            <p className="text-gray-600">Acompanhe o status da produção, envio e entrega dos seus pedidos com total transparência e segurança.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <img src="/img/svg_icon/world.png" alt="Entregas Rápidas" className="mx-auto mb-4 h-16" />
            <h3 className="text-xl font-bold text-nexus-blue mb-2">Entregas Rápidas</h3>
            <p className="text-gray-600">Logística otimizada para garantir que seus pedidos cheguem no prazo, atendendo às necessidades industriais sem demora.</p>
          </div>
        </div>

        {/* Seção de compromisso */}
        <div className="bg-white rounded-lg p-10 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-nexus-blue mb-4">100% Seguro e Confiável</h3>
          <p className="text-lg text-gray-700 mb-2">Garantimos a máxima segurança e qualidade em todos os nossos produtos e serviços. Com soluções industriais robustas e comprometidas com a excelência, você pode contar conosco para atender às suas necessidades com confiança e eficiência.</p>
          <a href="tel:+551142408832" className="inline-block mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded transition duration-300">+55 11 4240-8832</a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 