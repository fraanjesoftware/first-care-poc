import React from 'react';

const HealthThermometer = ({ score }) => {
  const percentage = Math.round(score);
  
  const getHealthStatus = (score) => {
    if (score >= 80) return { text: 'Uitstekend', color: 'text-green-600' };
    if (score >= 60) return { text: 'Goed', color: 'text-[#379ADC]' };
    if (score >= 40) return { text: 'Voldoende', color: 'text-yellow-600' };
    if (score >= 20) return { text: 'Matig', color: 'text-orange-600' };
    return { text: 'Onvoldoende', color: 'text-red-600' };
  };

  const getThermometerColor = (score) => {
    if (score >= 80) return 'from-green-300 to-green-500';
    if (score >= 60) return 'from-[#379ADC50] to-[#379ADC]';
    if (score >= 40) return 'from-yellow-300 to-yellow-500';
    if (score >= 20) return 'from-orange-300 to-orange-500';
    return 'from-red-300 to-red-500';
  };

  const status = getHealthStatus(percentage);
  const thermometerColor = getThermometerColor(percentage);

  return (
    <div className="flex flex-col items-center space-y-6 p-8">
      <h3 className="text-2xl font-bold text-gray-800">Veiligheid Gezondheidsmeter</h3>
      
      <div className="relative">
        <div className="relative w-32 h-80 mx-auto">
          <div className="absolute inset-0 bg-gray-200 rounded-full shadow-inner overflow-hidden">
            <div 
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${thermometerColor} transition-all duration-1000 ease-out rounded-b-full`}
              style={{ height: `${percentage}%` }}
            />
          </div>
          
          <div className="absolute -right-12 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
            <span>100%</span>
            <span>80%</span>
            <span>60%</span>
            <span>40%</span>
            <span>20%</span>
            <span>0%</span>
          </div>
          
          <div className="absolute -left-20 top-0 h-full flex flex-col justify-between text-xs text-gray-600 font-medium">
            <span className="text-green-600">Uitstekend</span>
            <span className="text-[#379ADC]">Goed</span>
            <span className="text-yellow-600">Voldoende</span>
            <span className="text-orange-600">Matig</span>
            <span className="text-red-600">Kritiek</span>
            <span></span>
          </div>
        </div>
        
      </div>
      
      <div className="text-center mt-16 space-y-2">
        <div className="text-5xl font-bold text-gray-800">{percentage}%</div>
        <div className={`text-2xl font-semibold ${status.color}`}>
          {status.text}
        </div>
        <p className="text-gray-600 mt-4 max-w-md">
          Uw veiligheid scoort <span className="font-semibold">{percentage}%</span>. 
          {percentage < 60 && ' Er zijn verbeteringen nodig om de veiligheid op peil te brengen.'}
          {percentage >= 60 && percentage < 80 && ' U bent op de goede weg, maar er is ruimte voor verbetering.'}
          {percentage >= 80 && ' Uitstekend werk! Blijf deze hoge standaard handhaven.'}
        </p>
      </div>
    </div>
  );
};

export default HealthThermometer;