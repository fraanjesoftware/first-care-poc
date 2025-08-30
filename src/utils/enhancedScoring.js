import { comprehensiveQuestions } from './comprehensiveQuestions';

export const calculateEnhancedScore = (answers) => {
  let totalScore = 0;
  let totalWeight = 0;
  // Initialize all categories to prevent NaN
  const categoryScores = {
    algemeen: { score: 0, maxScore: 0, questions: [], details: [] },
    bhv: { score: 0, maxScore: 0, questions: [], details: [] },
    middelen: { score: 0, maxScore: 0, questions: [], details: [] },
    planning: { score: 0, maxScore: 0, questions: [], details: [] },
    training: { score: 0, maxScore: 0, questions: [], details: [] },
    compliance: { score: 0, maxScore: 0, questions: [], details: [] },
    oefening: { score: 0, maxScore: 0, questions: [], details: [] },
    veiligheid: { score: 0, maxScore: 0, questions: [], details: [] }
  };
  const recommendations = [];

  console.log('Starting enhanced score calculation with answers:', answers);

  comprehensiveQuestions.forEach(question => {
    const answer = answers[question.id];
    if (!answer) {
      console.log(`No answer for question ${question.id}`);
      return;
    }

    let questionScore = 0;
    let maxQuestionScore = 0;

    switch (question.type) {
      case 'radio':
        // Single choice scoring
        const selectedOption = question.options.find(opt => opt.value === answer);
        if (selectedOption) {
          questionScore = selectedOption.score * question.weight;
          maxQuestionScore = 10 * question.weight;
        }
        break;

      case 'checkbox':
        // Multiple choice scoring - average of selected options
        if (Array.isArray(answer) && answer.length > 0) {
          // Filter out "none" or "geen" options which typically have 0 score
          const validAnswers = answer.filter(a => !['none', 'geen'].includes(a));
          
          if (validAnswers.length > 0) {
            const scores = validAnswers.map(val => {
              const opt = question.options.find(o => o.value === val);
              return opt ? opt.score : 0;
            });
            const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
            questionScore = avgScore * question.weight;
          } else if (answer.includes('geen') || answer.includes('none')) {
            // If only "none" is selected, score is 0
            questionScore = 0;
          }
          maxQuestionScore = 10 * question.weight;
        }
        break;

      case 'matrix':
        // Matrix scoring - average score across all rows
        if (typeof answer === 'object' && Object.keys(answer).length > 0) {
          const scores = [];
          question.rows.forEach(row => {
            if (answer[row.value]) {
              const col = question.columns.find(c => c.value === answer[row.value]);
              if (col) {
                scores.push(col.score);
              }
            }
          });
          
          if (scores.length > 0) {
            const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
            questionScore = avgScore * question.weight;
          }
          maxQuestionScore = 10 * question.weight;
        }
        break;

      case 'ranking':
        // Ranking scoring - based on correct priority order and relevance selection
        if (answer && answer.active && Array.isArray(answer.active) && answer.active.length > 0) {
          // Critical items that should be prioritized
          const criticalItems = ['fire', 'evacuation', 'firstaid'];
          let rankingScore = 0;
          const activeItems = answer.active;
          const inactiveItems = answer.inactive || [];
          
          // Bonus points for correctly identifying irrelevant items
          const nonCriticalInactive = ['violence', 'technical'];
          inactiveItems.forEach(item => {
            if (nonCriticalInactive.includes(item)) {
              rankingScore += 1; // Bonus for correctly marking non-critical as inactive
            }
          });
          
          // Check position of critical items
          activeItems.forEach((item, index) => {
            if (criticalItems.includes(item)) {
              // Higher score for critical items in top positions
              rankingScore += (activeItems.length - index) * 2;
            } else {
              // Lower score for non-critical items
              rankingScore += (activeItems.length - index) * 0.5;
            }
          });
          
          // Normalize to 0-10 scale
          const maxRankingScore = Math.max(activeItems.length * 2 * 3, 10); // max if all critical items at top
          questionScore = Math.min((rankingScore / maxRankingScore) * 10, 10) * question.weight;
          maxQuestionScore = 10 * question.weight;
        }
        break;

      default:
        break;
    }

    totalScore += questionScore;
    totalWeight += maxQuestionScore;

    // Track category scores (category already initialized above)
    categoryScores[question.category].score += questionScore;
    categoryScores[question.category].maxScore += maxQuestionScore;
    categoryScores[question.category].questions.push({
      question: question.question,
      type: question.type,
      answer: answer,
      score: maxQuestionScore > 0 ? (questionScore / maxQuestionScore) * 10 : 0
    });

    // Generate recommendations for low scores
    if (maxQuestionScore > 0 && (questionScore / maxQuestionScore) < 0.5) {
      recommendations.push(generateRecommendation(question, answer));
    }
  });

  const finalScore = totalWeight > 0 ? Math.round((totalScore / totalWeight) * 100) : 0;

  return {
    score: finalScore,
    categoryScores,
    recommendations: consolidateRecommendations(recommendations),
    level: getScoreLevel(finalScore),
    totalQuestions: comprehensiveQuestions.length,
    answeredQuestions: Object.keys(answers).length,
    detailedAnswers: answers
  };
};

const getScoreLevel = (score) => {
  if (score >= 80) {
    return {
      label: 'Uitstekend',
      color: 'green',
      description: 'Uw veiligheidsorganisatie is uitstekend op orde. Blijf deze hoge standaard handhaven.',
      action: 'Certificering vernieuwen'
    };
  } else if (score >= 60) {
    return {
      label: 'Goed',
      color: 'blue',
      description: 'Uw organisatie heeft een goede basis voor bedrijfsveiligheid met enkele verbeterpunten.',
      action: 'Optimalisatieplan aanvragen'
    };
  } else if (score >= 40) {
    return {
      label: 'Voldoende',
      color: 'yellow',
      description: 'Er zijn belangrijke aandachtspunten voor de veiligheid in uw organisatie.',
      action: 'Verbeterplan downloaden'
    };
  } else if (score >= 20) {
    return {
      label: 'Onvoldoende',
      color: 'orange',
      description: 'De veiligheid vraagt om directe aandacht. Verschillende aspecten moeten verbeterd worden.',
      action: 'Adviesgesprek aanvragen'
    };
  } else {
    return {
      label: 'Kritiek',
      color: 'red',
      description: 'Urgente actie vereist. Uw organisatie voldoet niet aan minimale veiligheidseisen.',
      action: 'Direct contact opnemen'
    };
  }
};

const generateRecommendation = (question, answer) => {
  const categoryRecommendations = {
    bhv: {
      title: "BHV-organisatie versterken",
      description: "Stel gecertificeerde BHV'ers aan en zorg voor adequate dekking",
      priority: "Hoog",
      actions: [
        "BHV-risicoanalyse uitvoeren",
        "BHV'ers opleiden",
        "BHV-plan opstellen"
      ]
    },
    middelen: {
      title: "Noodvoorzieningen op orde brengen",
      description: "Zorg voor complete en gecertificeerde veiligheidsmiddelen",
      priority: "Hoog",
      actions: [
        "Inventarisatie huidige middelen",
        "Aanschaf ontbrekende middelen",
        "Onderhoudscontract afsluiten"
      ]
    },
    training: {
      title: "Trainingsprogramma opzetten",
      description: "Implementeer een structureel opleidingsprogramma",
      priority: "Middel",
      actions: [
        "Trainingskalender opstellen",
        "Budget reserveren",
        "Trainingen inplannen"
      ]
    },
    oefening: {
      title: "Oefenbeleid implementeren",
      description: "Plan regelmatige ontruimingsoefeningen",
      priority: "Hoog",
      actions: [
        "Oefenscenario's ontwikkelen",
        "Oefeningen inplannen",
        "Evaluatieprotocol opstellen"
      ]
    },
    compliance: {
      title: "Documentatie actualiseren",
      description: "Breng alle veiligheidsdocumentatie op orde",
      priority: "Middel",
      actions: [
        "RI&E uitvoeren/actualiseren",
        "Noodplannen opstellen",
        "Procedures documenteren"
      ]
    },
    planning: {
      title: "Risicoprioritering herzien",
      description: "Evalueer en prioriteer veiligheidsrisico's",
      priority: "Middel",
      actions: [
        "Risicoanalyse uitvoeren",
        "Maatregelen prioriteren",
        "Actieplan opstellen"
      ]
    },
    veiligheid: {
      title: "Veiligheidsmaatregelen implementeren",
      description: "Verbeter fysieke veiligheidsvoorzieningen",
      priority: "Hoog",
      actions: [
        "Vluchtwegen controleren",
        "Signalering verbeteren",
        "Noodvoorzieningen installeren"
      ]
    },
    algemeen: {
      title: "Veiligheidsbeleid ontwikkelen",
      description: "Stel een integraal veiligheidsbeleid op",
      priority: "Laag",
      actions: [
        "Beleidsdocument opstellen",
        "Verantwoordelijkheden vastleggen",
        "Communicatieplan maken"
      ]
    }
  };

  return categoryRecommendations[question.category] || {
    title: "Algemene verbetering nodig",
    description: `Aandacht vereist voor: ${question.question}`,
    priority: "Middel",
    actions: ["Situatie analyseren", "Verbeterplan opstellen", "Implementeren"]
  };
};

const consolidateRecommendations = (recommendations) => {
  // Group recommendations by category and remove duplicates
  const grouped = {};
  
  recommendations.forEach(rec => {
    const key = rec.title;
    if (!grouped[key]) {
      grouped[key] = rec;
    }
  });
  
  // Convert to array and sort by priority
  const priorityOrder = { 'Hoog': 1, 'Middel': 2, 'Laag': 3 };
  
  return Object.values(grouped).sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

export const saveEnhancedResults = (data) => {
  // In a real app, this would send to an API
  console.log('=== ENHANCED ASSESSMENT RESULTS ===');
  console.log('Contact Information:', data.contactInfo);
  console.log('Score:', data.score);
  console.log('Category Scores:', data.categoryScores);
  console.log('Detailed Answers:', data.detailedAnswers);
  console.log('Recommendations:', data.recommendations);
  console.log('Timestamp:', data.timestamp);
  console.log('===================================');
  
  // Save to localStorage for demo purposes
  localStorage.setItem('bhv_enhanced_assessment', JSON.stringify(data));
  
  return true;
};