import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Users, FileText, Shield, ArrowRight, Award, Clock, Target } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Gratis BHV Scan - Is uw bedrijf veilig?
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Test in slechts 5 minuten of uw organisatie voldoet aan de wettelijke BHV-eisen. 
            Ontvang direct een persoonlijk adviesrapport met concrete verbeterpunten.
          </p>
          
          <Link
            to="/quiz"
            className="inline-flex items-center bg-[#0066CC] hover:bg-[#0052A3] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Start de gratis scan
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <span className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Gratis advies
            </span>
            <span className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Direct resultaat
            </span>
            <span className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Geen verplichtingen
            </span>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-12 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-3xl font-bold text-[#0066CC]">2.500+</div>
              <div className="text-sm text-gray-600 mt-1">Bedrijven getest</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl font-bold text-[#0066CC]">15.000+</div>
              <div className="text-sm text-gray-600 mt-1">BHV'ers opgeleid</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl font-bold text-[#0066CC]">98%</div>
              <div className="text-sm text-gray-600 mt-1">Klanttevredenheid</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl font-bold text-[#0066CC]">24/7</div>
              <div className="text-sm text-gray-600 mt-1">Ondersteuning</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Waarom de BHV Safety Scan?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-[#0066CC]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-[#0066CC]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Gepersonaliseerd advies
              </h3>
              <p className="text-gray-600">
                Ontvang concrete aanbevelingen specifiek voor uw organisatie en situatie.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-[#0066CC]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-[#0066CC]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Snel en eenvoudig
              </h3>
              <p className="text-gray-600">
                In slechts 5 minuten weet u waar u staat met de veiligheid in uw bedrijf.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-[#0066CC]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-[#0066CC]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Gecertificeerde expertise
              </h3>
              <p className="text-gray-600">
                Ontwikkeld door ervaren BHV-professionals met jarenlange expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Hoe werkt het?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#0066CC] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Beantwoord de vragen
              </h3>
              <p className="text-gray-600">
                10 gerichte vragen over de veiligheid in uw organisatie
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#0066CC] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Vul uw gegevens in
              </h3>
              <p className="text-gray-600">
                Voor het ontvangen van uw persoonlijke rapport
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#0066CC] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ontvang direct resultaat
              </h3>
              <p className="text-gray-600">
                Met score, verbeterpunten en concrete actiepunten
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/quiz"
              className="inline-flex items-center bg-[#0066CC] hover:bg-[#0052A3] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Begin nu met de scan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Certification Badges */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">Gecertificeerd en erkend door:</p>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                <span className="text-gray-700 font-semibold">NIBHV</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                <span className="text-gray-700 font-semibold">ISO 9001</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                <span className="text-gray-700 font-semibold">VCA**</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                <span className="text-gray-700 font-semibold">NEN 4400</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;