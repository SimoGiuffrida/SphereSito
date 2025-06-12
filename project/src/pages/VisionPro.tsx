import React from 'react';
import { ArrowRight } from 'lucide-react';

function VisionPro() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Vision Pro</h1>
        
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <p className="text-xl mb-6">
            Strumento completo per startup e piccole imprese che vogliono rafforzare il proprio posizionamento, 
            esplorare nuove direzioni o rilanciare la propria attività.
          </p>
          
          <div className="space-y-6 text-gray-600">
            <p>
              Il percorso comprende analisi del mercato, valutazione del modello di business, definizione degli 
              obiettivi strategici e costruzione di una roadmap operativa.
            </p>
            <p>
              Il risultato è una guida concreta per prendere decisioni efficaci e orientate alla crescita.
            </p>
          </div>
        </div>

        <div className="text-center">
          <a 
            href="mailto:spherebusinessita@gmail.com?subject=Richiesta%20Vision%20Pro"
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

export default VisionPro;