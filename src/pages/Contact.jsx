import React from 'react';
import { useNavigate } from 'react-router-dom';
import LeadForm from '../components/LeadForm';
import { Shield } from 'lucide-react';

const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = (contactInfo) => {
    console.log('Contact form submitted with:', contactInfo);
    
    // Save contact info to session storage
    sessionStorage.setItem('bhv_contact_info', JSON.stringify(contactInfo));
    
    console.log('Saved to session storage, navigating to results...');
    
    // Navigate to results page
    navigate('/resultaten');
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#E52C9520' }}>
            <Shield className="h-8 w-8" style={{ color: '#E52C95' }} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Uitstekend werk!
          </h1>
          <p className="text-lg text-gray-600">
            U heeft alle vragen beantwoord. Vul nu uw gegevens in om uw persoonlijke rapport te ontvangen.
          </p>
        </div>
        
        <LeadForm onSubmit={handleSubmit} />
        
        <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: '#379ADC10' }}>
          <p className="text-sm text-gray-700">
            <strong>Wat gebeurt er na het invullen?</strong>
          </p>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>• U ontvangt direct uw persoonlijke BHV-rapport</li>
            <li>• Een adviseur neemt binnen 24 uur contact met u op</li>
            <li>• U krijgt een vrijblijvend adviesgesprek aangeboden</li>
            <li>• Geen verplichtingen, geen kleine lettertjes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;