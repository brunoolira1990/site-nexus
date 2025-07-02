const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "João Silva",
      company: "Indústria Metalúrgica ABC",
      text: "A Nexus tem sido nosso parceiro confiável há mais de 10 anos. A qualidade dos produtos e o suporte técnico são excepcionais.",
      rating: 5
    },
    {
      name: "Maria Santos",
      company: "Refinaria Petroquímica XYZ",
      text: "Os produtos da Nexus atendem perfeitamente às nossas necessidades de alta pressão e temperatura. Recomendo fortemente.",
      rating: 5
    },
    {
      name: "Carlos Oliveira",
      company: "Indústria Alimentícia DEF",
      text: "A conformidade com normas sanitárias e a facilidade de manutenção dos produtos da Nexus superaram nossas expectativas.",
      rating: 5
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A satisfação dos nossos clientes é nossa maior conquista. 
            Conheça alguns depoimentos de quem confia na Nexus.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <div>
                <div className="font-semibold text-gray-800">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection; 