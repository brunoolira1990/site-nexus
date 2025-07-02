import { useState } from 'react';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // Exemplo de integração com backend (ajuste a URL conforme necessário)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', message: '', consent: false });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-nexus-blue mb-4">Fale Conosco</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Entre em contato com a Nexus para solicitar orçamento, tirar dúvidas ou saber mais sobre nossos produtos e soluções.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Formulário */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nome</label>
                <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nexus-blue" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">E-mail</label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nexus-blue" />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Telefone</label>
                <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nexus-blue" placeholder="(11) 99999-9999" />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Mensagem</label>
                <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nexus-blue"></textarea>
              </div>
              <div className="mb-4 flex items-center">
                <input type="checkbox" id="consent" name="consent" checked={form.consent} onChange={handleChange} required className="mr-2" />
                <label htmlFor="consent" className="text-gray-700 text-sm">Autorizo o uso dos meus dados para contato conforme a LGPD.</label>
              </div>
              <div className="text-center">
                <button type="submit" disabled={status==='sending'} className="bg-orange-500 hover:bg-nexus-blue text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 disabled:opacity-60">
                  {status === 'sending' ? 'Enviando...' : 'Enviar Mensagem'}
                </button>
              </div>
              {status === 'success' && <p className="text-green-600 text-center mt-4">Mensagem enviada com sucesso!</p>}
              {status === 'error' && <p className="text-red-600 text-center mt-4">Erro ao enviar. Tente novamente.</p>}
            </form>
            <div className="mt-8 text-gray-600 text-sm">
              <div><b>Telefone:</b> <a href="tel:+551142408832" className="text-nexus-blue hover:underline">(11) 4240-8832</a></div>
              <div><b>E-mail:</b> <a href="mailto:nexus@nexusvalvulas.com.br" className="text-nexus-blue hover:underline">nexus@nexusvalvulas.com.br</a></div>
              <div><b>Endereço:</b> R. Miguel Langone, 341, Itaquera, São Paulo - SP</div>
            </div>
          </div>
          {/* Mapa */}
          <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Mapa Nexus"
              src="https://www.google.com/maps?q=R.+Miguel+Langone,+341,+São+Paulo+-+SP&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;