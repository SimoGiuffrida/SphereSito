import React from 'react';
import { ArrowRight } from 'lucide-react';

function VisionIndividual() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Vision Individual</h1>
        
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <p className="text-xl mb-6">
            Percorso strategico dedicato a studenti, professionisti e aspiranti imprenditori che vogliono definire 
            con chiarezza i propri obiettivi personali e professionali.
          </p>
          
          <div className="space-y-6 text-gray-600">
            <p>
              Attraverso incontri strutturati, si costruisce una visione concreta del proprio futuro, si identificano 
              risorse e opportunità, e si elabora un piano d'azione personalizzato.
            </p>
            <p>
              È pensato per chi vuole trasformare idee e ambizioni in progetti realizzabili.
            </p>
          </div>
        </div>

        <div className="text-center">
          <a 
            href="mailto:spherebusinessita@gmail.com?subject=Richiesta%20Vision%20Individual"
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

export default VisionIndividual;