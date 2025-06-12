const Hero = () => {
  return (
    <section 
      className="bg-cover bg-center h-96 text-white flex items-center justify-center" 
      style={{ backgroundImage: "url('/img/banner/banner.png')" }}
    >
      <div className="bg-black bg-opacity-40 p-10 rounded-lg text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Nexus Válvulas e Conexões Industriais</h1>
        <p className="text-lg md:text-xl mb-8">
          Com mais de 20 anos de experiência no mercado, a Nexus é uma das principais fornecedoras de válvulas e conexões industriais no Brasil.
        </p>
        <a 
          href="#produtos"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
        >
          Saiba Mais
        </a>
      </div>
    </section>
  );
};

export default Hero; 