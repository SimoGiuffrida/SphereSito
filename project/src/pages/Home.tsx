import React from 'react';
import { ArrowRight, ArrowDown, Target, Brain, Compass, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="dynamic-bg">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent"></div>
        <div className="container mx-auto max-w-4xl relative">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              Non vendiamo consulenza.<br />
              Costruiamo direzione.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Sphere è un laboratorio strategico che trasforma dati grezzi e intuizioni vaghe in decisioni operative.
              Non ti diamo consigli: ti offriamo una struttura per decidere meglio.
            </p>
            <div className="flex flex-col items-center gap-4 mb-12 backdrop-blur-sm bg-white/30 p-6 rounded-2xl">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <span>Pensato per imprenditori lucidi.</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⚙️</span>
                <span>Scritto in output.</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⚡</span>
                <span>La velocità è il nostro punto forte.</span>
              </div>
            </div>
            <a href="#services" className="group flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1">
              Scopri i nostri strumenti
              <ArrowDown className="w-4 h-4 group-hover:animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 relative">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">I nostri strumenti</h2>
            <p className="text-xl">Abbiamo costruito un sistema.</p>
            <p className="text-gray-600">Semplice. Profondo. Adattabile.</p>
            <p className="text-gray-600">Ti prendiamo per mano.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/fast-check" className="hover-card bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <Search className="w-8 h-8 mb-4" />
              <h3 className="text-2xl font-bold mb-4">FAST CHECK</h3>
              <p className="text-gray-600 mb-4">Il tuo stato di salute strategica.</p>
              <div className="flex items-center gap-2 text-black group">
                Scopri di più
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>

            <Link to="/vision-individual" className="hover-card bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <Target className="w-8 h-8 mb-4" />
              <h3 className="text-2xl font-bold mb-4">VISION INDIVIDUAL</h3>
              <p className="text-gray-600 mb-4">Esplorazione strategica personalizzata delle tue idee.</p>
              <div className="flex items-center gap-2 text-black group">
                Scopri di più
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>

            <Link to="/vision-pro" className="hover-card bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <Brain className="w-8 h-8 mb-4" />
              <h3 className="text-2xl font-bold mb-4">VISION PRO</h3>
              <p className="text-gray-600 mb-4">Uno specchio in cui guardarsi prima di lanciarsi nel futuro.</p>
              <div className="flex items-center gap-2 text-black group">
                Scopri di più
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>

            <div className="hover-card bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <Compass className="w-8 h-8 mb-4" />
              <h3 className="text-2xl font-bold mb-4">DIREZIONE</h3>
              <p className="text-gray-600 mb-4">Un rapporto continuativo di progettazione strategica.</p>
              <div className="flex items-center gap-2 text-black">
                Prossimamente
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white/90 backdrop-blur-sm px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Perché funzioniamo?</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-2">1. Non siamo consulenti.</h3>
                <p className="text-gray-600">Siamo architetti operativi. Costruiamo framework, non pareri.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">2. Scriviamo in output.</h3>
                <p className="text-gray-600">Ogni servizio genera un documento strategico utilizzabile subito.</p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-2">3. Non ti tratteniamo.</h3>
                <p className="text-gray-600">Zero lock-in. Nessun servizio vincolante. Solo valore reale.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">4. Siamo ossessionati dalla qualità.</h3>
                <p className="text-gray-600">Non prendiamo tutti. E non promettiamo tutto.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black text-white px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">Vuoi direzione, non opinioni?</h2>
          <p className="text-xl mb-8">
            Fallo con lucidità. Fallo con metodo.<br />
            Fall it with Sphere.
          </p>
          <a 
            href="mailto:spherebusinessita@gmail.com"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 group"
          >
            Contattaci
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white/90 backdrop-blur-sm px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/transparent-background,-shadow-designify.png" alt="Sphere Logo" className="h-8 w-8" />
                <span className="font-semibold">Sphere</span>
              </div>
              <p className="text-gray-600 mb-4">
                Sphere è un laboratorio strategico indipendente.
                Offriamo strumenti decisionali e operativi per microimprese e startup italiane.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Disclaimer</h3>
              <p className="text-gray-600 text-sm">
                I nostri servizi non costituiscono attività riservate o consulenza professionale regolamentata. 
                Sono strumenti di progettazione strategica e decisionale per imprenditori.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © Sphere 2025 · P.IVA
            </div>
            <div className="flex gap-4 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Termini e Condizioni</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;