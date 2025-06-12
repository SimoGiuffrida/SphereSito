import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, Target, Brain, Compass, Search } from 'lucide-react';
import Home from './pages/Home';
import VisionIndividual from './pages/VisionIndividual';
import VisionPro from './pages/VisionPro';
import FastCheck from './pages/FastCheck';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[url('/grid.png')] bg-repeat text-gray-900 font-['Inter']">
        {/* Header */}
        <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-4">
              <img src="/transparent-background,-shadow-designify.png" alt="Sphere Logo" className="h-16 w-16" />
              <span className="font-semibold text-2xl">Sphere</span>
            </Link>
            <nav className="hidden md:flex items-center gap-12">
              <Link to="/#about" className="nav-link hover:text-gray-600">Chi Siamo</Link>
              <Link to="/#services" className="nav-link hover:text-gray-600">Servizi</Link>
              <Link to="/#contact" className="nav-link hover:text-gray-600">Contattaci</Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vision-individual" element={<VisionIndividual />} />
          <Route path="/vision-pro" element={<VisionPro />} />
          <Route path="/fast-check" element={<FastCheck />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App