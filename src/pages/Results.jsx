import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ResultsChart from '../components/ResultsChart';
import { calculateScore, saveResults } from '../utils/scoring';
import { 
  Download, 
  Calendar, 
  Phone, 
  AlertTriangle, 
  CheckCircle,
  ChevronRight,
  FileText,
  Users,
  Shield,
  Target
} from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    // Get quiz answers and contact info from session storage
    const savedAnswers = sessionStorage.getItem('bhv_quiz_answers');
    const savedContact = sessionStorage.getItem('bhv_contact_info');

    if (!savedAnswers || !savedContact) {
      // Redirect to home if no data
      navigate('/');
      return;
    }

    const answers = JSON.parse(savedAnswers);
    const contact = JSON.parse(savedContact);
    
    // Calculate results
    const calculatedResults = calculateScore(answers);
    
    // Save everything (logs to console and localStorage)
    saveResults({
      contactInfo: contact,
      answers: answers,
      score: calculatedResults.score,
      recommendations: calculatedResults.recommendations,
      timestamp: new Date().toISOString()
    });

    setResults(calculatedResults);
    setContactInfo(contact);

    // Clear session storage after saving
    sessionStorage.removeItem('bhv_quiz_answers');
    sessionStorage.removeItem('bhv_quiz_current');
    sessionStorage.removeItem('bhv_contact_info');
  }, [navigate]);

  if (!results || !contactInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066CC] mx-auto"></div>
          <p className="mt-4 text-gray-600">Resultaten worden berekend...</p>
        </div>
      </div>
    );
  }

  const getActionButton = () => {
    const level = results.level;
    if (level.color === 'red') {
      return (
        <button className="flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          <Calendar className="h-5 w-5 mr-2" />
          Direct gratis adviesgesprek inplannen
        </button>
      );
    } else if (level.color === 'orange') {
      return (
        <button className="flex items-center bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          <Download className="h-5 w-5 mr-2" />
          Download verbeterplan
        </button>
      );
    } else {
      return (
        <button className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          <CheckCircle className="h-5 w-5 mr-2" />
          Certificering aanvragen
        </button>
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Uw BHV Safety Scan Resultaten
          </h1>
          <p className="text-lg text-gray-600">
            {contactInfo.companyName} - {new Date().toLocaleDateString('nl-NL')}
          </p>
        </div>

        {/* Score Chart */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <ResultsChart score={results.score} level={results.level} />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            {getActionButton()}
            <button className="flex items-center border-2 border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              <Phone className="h-5 w-5 mr-2" />
              Bel direct: 088 - 123 45 67
            </button>
          </div>
        </div>

        {/* Recommendations */}
        {results.recommendations.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertTriangle className="h-6 w-6 text-orange-500 mr-2" />
              Aandachtspunten
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {results.recommendations.map((rec, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <div className={`p-2 rounded-lg mr-3 ${
                      rec.priority === 'Hoog' ? 'bg-red-100' : 
                      rec.priority === 'Middel' ? 'bg-orange-100' : 'bg-yellow-100'
                    }`}>
                      <Shield className={`h-5 w-5 ${
                        rec.priority === 'Hoog' ? 'text-red-600' : 
                        rec.priority === 'Middel' ? 'text-orange-600' : 'text-yellow-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                      <span className={`inline-block text-xs font-medium mt-2 px-2 py-1 rounded ${
                        rec.priority === 'Hoog' ? 'bg-red-100 text-red-700' : 
                        rec.priority === 'Middel' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        Prioriteit: {rec.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Gedetailleerde Score per Categorie
          </h2>
          
          <div className="space-y-4">
            {Object.entries(results.categoryScores).map(([category, data]) => {
              const percentage = Math.round((data.score / data.maxScore) * 100);
              return (
                <div key={category} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {category.replace('-', ' ')}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        percentage >= 70 ? 'bg-green-500' :
                        percentage >= 40 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-[#0066CC] to-[#0052A3] rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Uw volgende stappen</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="bg-white/20 p-2 rounded-lg mr-3">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">1. Download rapport</h3>
                <p className="text-sm text-white/80">
                  Ontvang uw complete rapport per e-mail
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-white/20 p-2 rounded-lg mr-3">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">2. Gratis adviesgesprek</h3>
                <p className="text-sm text-white/80">
                  Bespreek de resultaten met een expert
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-white/20 p-2 rounded-lg mr-3">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">3. Actieplan opstellen</h3>
                <p className="text-sm text-white/80">
                  Krijg een concreet verbeterplan op maat
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-[#0066CC] hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors">
              Download PDF rapport
            </button>
            <button className="bg-white/20 border-2 border-white text-white hover:bg-white/30 font-semibold py-3 px-6 rounded-lg transition-colors">
              Plan adviesgesprek
            </button>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Een van onze BHV-specialisten neemt binnen 24 uur contact met u op
          </p>
          <p className="text-sm text-gray-500">
            Heeft u direct vragen? Bel ons op <strong>088 - 123 45 67</strong> of mail naar{' '}
            <a href="mailto:info@firstcare.nl" className="text-[#0066CC] hover:underline">
              info@firstcare.nl
            </a>
          </p>
          
          <Link 
            to="/"
            className="inline-flex items-center text-[#0066CC] hover:text-[#0052A3] font-medium mt-6"
          >
            <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
            Nieuwe scan starten
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;