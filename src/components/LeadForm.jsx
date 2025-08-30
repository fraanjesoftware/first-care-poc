import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const LeadForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
    phone: '',
    employeeCount: '',
    privacy: false
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Bedrijfsnaam is verplicht';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Naam is verplicht';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mailadres is verplicht';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ongeldig e-mailadres';
    }
    
    if (!formData.employeeCount) {
      newErrors.employeeCount = 'Selecteer aantal medewerkers';
    }
    
    if (!formData.privacy) {
      newErrors.privacy = 'U moet akkoord gaan met het privacybeleid';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Nog één stap voor uw resultaten
      </h2>
      <p className="text-gray-600 mb-6">
        Vul uw gegevens in om uw persoonlijke BHV-rapport te ontvangen
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
            Bedrijfsnaam *
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC] outline-none transition-colors ${
              errors.companyName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Uw bedrijfsnaam"
          />
          {errors.companyName && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.companyName}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Uw naam *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC] outline-none transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Voor- en achternaam"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.name}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            E-mailadres *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC] outline-none transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="naam@bedrijf.nl"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefoonnummer (optioneel)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC] outline-none transition-colors"
            placeholder="06-12345678"
          />
        </div>
        
        <div>
          <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700 mb-1">
            Aantal medewerkers *
          </label>
          <select
            id="employeeCount"
            name="employeeCount"
            value={formData.employeeCount}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC] outline-none transition-colors ${
              errors.employeeCount ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Selecteer aantal</option>
            <option value="1-10">1-10 medewerkers</option>
            <option value="11-50">11-50 medewerkers</option>
            <option value="51-100">51-100 medewerkers</option>
            <option value="100+">Meer dan 100 medewerkers</option>
          </select>
          {errors.employeeCount && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.employeeCount}
            </p>
          )}
        </div>
        
        <div className="pt-4">
          <label className="flex items-start">
            <input
              type="checkbox"
              name="privacy"
              checked={formData.privacy}
              onChange={handleChange}
              className="mt-1 mr-3 h-4 w-4 text-[#0066CC] border-gray-300 rounded focus:ring-[#0066CC]"
            />
            <span className="text-sm text-gray-600">
              Ik ga akkoord met het <a href="#" className="text-[#0066CC] hover:underline">privacybeleid</a> en 
              geef toestemming om contact met mij op te nemen over de resultaten van deze scan. *
            </span>
          </label>
          {errors.privacy && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.privacy}
            </p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-[#0066CC] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#0052A3] transition-colors duration-200"
        >
          Bekijk uw resultaten
        </button>
      </form>
    </div>
  );
};

export default LeadForm;