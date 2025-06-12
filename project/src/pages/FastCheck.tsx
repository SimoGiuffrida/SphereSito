import React from 'react';
import { ArrowRight } from 'lucide-react';

function FastCheck() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Fast Check</h1>
        
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <p className="text-xl mb-6">
            Analisi mirata della situazione strategica ed economico-finanziaria dell'impresa.
          </p>
          
          <div className="space-y-6 text-gray-600">
            <p>
              Esamina bilanci, rischi, performance e segnali di squilibrio per offrire un quadro chiaro 
              della salute aziendale.
            </p>
            <p>
              Il documento finale include una valutazione sintetica, raccomandazioni pratiche e spunti utili 
              per rafforzare la gestione e prevenire crisi future.
            </p>
            <p>
              Ideale per avere rapidamente una fotografia completa e affidabile.
            </p>
          </div>
        </div>

        <div className="text-center">
          <a 
            href="mailto:spherebusinessita@gmail.com?subject=Richiesta%20Fast%20Check"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            Richiedi informazioni
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default FastCheck;