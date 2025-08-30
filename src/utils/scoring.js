import { questions } from './questions';

export const calculateScore = (answers) => {
  let totalScore = 0;
  let totalWeight = 0;
  const categoryScores = {};
  const recommendations = [];

  questions.forEach(question => {
    const answer = answers[question.id];
    if (answer) {
      const selectedOption = question.options.find(opt => opt.value === answer);
      if (selectedOption) {
        const weightedScore = selectedOption.score * question.weight;
        totalScore += weightedScore;
        totalWeight += question.weight * 10;

        // Track category scores
        if (!categoryScores[question.category]) {
          categoryScores[question.category] = { score: 0, maxScore: 0, questions: [] };
        }
        categoryScores[question.category].score += weightedScore;
        categoryScores[question.category].maxScore += question.weight * 10;
        categoryScores[question.category].questions.push({
          question: question.question,
          score: selectedOption.score,
          answer: selectedOption.label
        });

        // Generate recommendations based on low scores
        if (selectedOption.score < 5) {
          recommendations.push(generateRecommendation(question, selectedOption));
        }
      }
    }
  });

  const finalScore = totalWeight > 0 ? Math.round((totalScore / totalWeight) * 100) : 0;

  return {
    score: finalScore,
    categoryScores,
    recommendations,
    level: getScoreLevel(finalScore),
    totalQuestions: questions.length,
    answeredQuestions: Object.keys(answers).length
  };
};

const getScoreLevel = (score) => {
  if (score >= 70) {
    return {
      label: 'Goed op weg',
      color: 'green',
      description: 'Uw organisatie heeft een goede basis voor bedrijfsveiligheid. Er zijn enkele verbeterpunten.',
      action: 'Certificering aanvragen'
    };
  } else if (score >= 40) {
    return {
      label: 'Aandachtspunten',
      color: 'orange',
      description: 'Er zijn belangrijke aandachtspunten voor de veiligheid in uw organisatie.',
      action: 'Download verbeterplan'
    };
  } else {
    return {
      label: 'Urgent verbetering nodig',
      color: 'red',
      description: 'De veiligheid in uw organisatie vraagt om directe aandacht en verbetering.',
      action: 'Direct gratis adviesgesprek'
    };
  }
};

const generateRecommendation = (question, answer) => {
  const recommendations = {
    bhv: {
      title: "BHV'ers aanstellen of bijscholen",
      description: "Zorg voor voldoende gecertificeerde BHV'ers in uw organisatie",
      priority: "Hoog",
      icon: "users"
    },
    oefening: {
      title: "Ontruimingsoefening plannen",
      description: "Plan minimaal jaarlijks een ontruimingsoefening",
      priority: "Hoog",
      icon: "alert-triangle"
    },
    planning: {
      title: "Noodplannen opstellen of actualiseren",
      description: "Zorg voor actuele ontruimings- en noodplannen",
      priority: "Middel",
      icon: "file-text"
    },
    veiligheid: {
      title: "Vluchtwegen controleren",
      description: "Zorg dat vluchtwegen vrij en duidelijk gemarkeerd zijn",
      priority: "Hoog",
      icon: "exit"
    },
    middelen: {
      title: "Veiligheidsmiddelen aanschaffen",
      description: "Zorg voor voldoende blusmiddelen en een AED",
      priority: "Hoog",
      icon: "shield"
    },
    compliance: {
      title: "RI&E uitvoeren",
      description: "Voer een risico-inventarisatie en evaluatie uit",
      priority: "Middel",
      icon: "clipboard-check"
    },
    training: {
      title: "Herhalingstraining plannen",
      description: "Plan herhalingstrainingen voor uw BHV'ers",
      priority: "Middel",
      icon: "graduation-cap"
    },
    algemeen: {
      title: "Veiligheidsbeleid opstellen",
      description: "Stel een algemeen veiligheidsbeleid op voor uw organisatie",
      priority: "Laag",
      icon: "book"
    }
  };

  return recommendations[question.category] || {
    title: question.question,
    description: `Verbetering nodig: ${answer.label}`,
    priority: "Middel",
    icon: "info"
  };
};

export const saveResults = (data) => {
  // In a real app, this would send to an API
  console.log('=== LEAD CAPTURED ===');
  console.log('Contact Information:', data.contactInfo);
  console.log('Quiz Answers:', data.answers);
  console.log('Score:', data.score);
  console.log('Recommendations:', data.recommendations);
  console.log('=====================');
  
  // Save to localStorage for demo purposes
  localStorage.setItem('bhv_assessment_results', JSON.stringify(data));
  
  return true;
};