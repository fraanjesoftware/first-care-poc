export const questions = [
  {
    id: 1,
    question: "Hoeveel medewerkers heeft uw organisatie?",
    type: "number",
    options: [
      { value: "1-10", label: "1-10 medewerkers", score: 10 },
      { value: "11-50", label: "11-50 medewerkers", score: 8 },
      { value: "51-100", label: "51-100 medewerkers", score: 6 },
      { value: "100+", label: "Meer dan 100 medewerkers", score: 4 }
    ],
    weight: 1,
    category: "algemeen"
  },
  {
    id: 2,
    question: "Heeft u gecertificeerde BHV'ers in dienst?",
    type: "radio",
    options: [
      { value: "ja-voldoende", label: "Ja, voldoende voor onze organisatie", score: 10 },
      { value: "ja-onvoldoende", label: "Ja, maar niet genoeg", score: 5 },
      { value: "nee", label: "Nee", score: 0 },
      { value: "weet-niet", label: "Weet ik niet", score: 2 }
    ],
    weight: 3,
    category: "bhv"
  },
  {
    id: 3,
    question: "Wanneer was uw laatste ontruimingsoefening?",
    type: "radio",
    options: [
      { value: "0-6", label: "Minder dan 6 maanden geleden", score: 10 },
      { value: "6-12", label: "6-12 maanden geleden", score: 7 },
      { value: "12-24", label: "1-2 jaar geleden", score: 4 },
      { value: "24+", label: "Meer dan 2 jaar geleden", score: 1 },
      { value: "nooit", label: "Nog nooit gehouden", score: 0 }
    ],
    weight: 2.5,
    category: "oefening"
  },
  {
    id: 4,
    question: "Is er een actueel ontruimingsplan aanwezig?",
    type: "radio",
    options: [
      { value: "ja-actueel", label: "Ja, en recent geüpdatet", score: 10 },
      { value: "ja-oud", label: "Ja, maar verouderd", score: 5 },
      { value: "in-ontwikkeling", label: "Wordt momenteel ontwikkeld", score: 3 },
      { value: "nee", label: "Nee", score: 0 }
    ],
    weight: 2,
    category: "planning"
  },
  {
    id: 5,
    question: "Zijn de vluchtwegen vrij en duidelijk gemarkeerd?",
    type: "radio",
    options: [
      { value: "ja-perfect", label: "Ja, volledig vrij en duidelijk gemarkeerd", score: 10 },
      { value: "ja-redelijk", label: "Grotendeels, enkele verbeterpunten", score: 7 },
      { value: "matig", label: "Matig, verbetering nodig", score: 4 },
      { value: "nee", label: "Nee, grote problemen", score: 0 }
    ],
    weight: 3,
    category: "veiligheid"
  },
  {
    id: 6,
    question: "Beschikt u over voldoende blusmiddelen?",
    type: "radio",
    options: [
      { value: "ja-gecertificeerd", label: "Ja, gecertificeerd en recent gecontroleerd", score: 10 },
      { value: "ja-niet-recent", label: "Ja, maar controle is verlopen", score: 5 },
      { value: "onvoldoende", label: "Onvoldoende aanwezig", score: 2 },
      { value: "nee", label: "Nee", score: 0 }
    ],
    weight: 2.5,
    category: "middelen"
  },
  {
    id: 7,
    question: "Is er een AED aanwezig in uw gebouw?",
    type: "radio",
    options: [
      { value: "ja-meerdere", label: "Ja, meerdere stuks", score: 10 },
      { value: "ja-een", label: "Ja, één AED", score: 8 },
      { value: "in-aanschaf", label: "Wordt aangeschaft", score: 4 },
      { value: "nee", label: "Nee", score: 0 }
    ],
    weight: 2,
    category: "middelen"
  },
  {
    id: 8,
    question: "Wordt er regelmatig een RI&E (Risico-inventarisatie & Evaluatie) uitgevoerd?",
    type: "radio",
    options: [
      { value: "ja-recent", label: "Ja, minder dan een jaar geleden", score: 10 },
      { value: "ja-1-3", label: "Ja, 1-3 jaar geleden", score: 7 },
      { value: "ja-ouder", label: "Ja, meer dan 3 jaar geleden", score: 3 },
      { value: "nee", label: "Nee/weet ik niet", score: 0 }
    ],
    weight: 2,
    category: "compliance"
  },
  {
    id: 9,
    question: "Hebben uw BHV'ers recent een herhalingstraining gevolgd?",
    type: "radio",
    options: [
      { value: "ja-6m", label: "Ja, binnen 6 maanden", score: 10 },
      { value: "ja-12m", label: "Ja, binnen 12 maanden", score: 7 },
      { value: "ja-24m", label: "Ja, binnen 24 maanden", score: 4 },
      { value: "nee", label: "Nee/niet van toepassing", score: 0 }
    ],
    weight: 2,
    category: "training"
  },
  {
    id: 10,
    question: "Is er een noodplan voor verschillende scenario's (brand, ongeval, bedreiging)?",
    type: "radio",
    options: [
      { value: "ja-compleet", label: "Ja, voor alle scenario's", score: 10 },
      { value: "ja-basis", label: "Ja, alleen voor brand", score: 5 },
      { value: "in-ontwikkeling", label: "In ontwikkeling", score: 3 },
      { value: "nee", label: "Nee", score: 0 }
    ],
    weight: 2,
    category: "planning"
  }
];

export const getQuestionById = (id) => {
  return questions.find(q => q.id === id);
};

export const getTotalQuestions = () => questions.length;