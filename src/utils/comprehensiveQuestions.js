export const comprehensiveQuestions = [
  // 1. Basic Company Information
  {
    id: 1,
    question: "In welke sector is uw organisatie actief?",
    type: "radio",
    options: [
      { value: "kantoor", label: "Kantoor / Administratief", score: 8 },
      { value: "zorg", label: "Gezondheidszorg", score: 5 },
      { value: "industrie", label: "Industrie / Productie", score: 3 },
      { value: "bouw", label: "Bouw / Constructie", score: 2 },
      { value: "horeca", label: "Horeca / Retail", score: 6 },
      { value: "onderwijs", label: "Onderwijs", score: 7 },
      { value: "transport", label: "Transport / Logistiek", score: 4 }
    ],
    weight: 1,
    category: "algemeen"
  },

  // 2. BHV Coverage - Checkbox
  {
    id: 2,
    question: "Welke BHV-functies zijn binnen uw organisatie aanwezig?",
    type: "checkbox",
    hint: "Selecteer alle functies die van toepassing zijn",
    options: [
      { value: "bhv-basis", label: "BHV'er Basis", description: "Eerste hulp, brand bestrijding, ontruiming", score: 3 },
      { value: "ehbo", label: "EHBO'er", description: "Gecertificeerd voor eerste hulp", score: 2 },
      { value: "ploegleider", label: "Ploegleider BHV", description: "Coördineert BHV-team", score: 3 },
      { value: "ontruimer", label: "Ontruimingsleider", description: "Leidt evacuaties", score: 2 },
      { value: "communicatie", label: "Communicatiemedewerker", description: "Contact met hulpdiensten", score: 2 },
      { value: "geen", label: "Geen BHV'ers aanwezig", score: 0 }
    ],
    weight: 3,
    category: "bhv",
    minRequired: 1
  },

  // 3. Emergency Equipment Status - Matrix
  {
    id: 3,
    question: "Wat is de status van uw noodvoorzieningen?",
    type: "matrix",
    hint: "Beoordeel de huidige status van elke voorziening",
    rowLabel: "Voorziening",
    rows: [
      { value: "extinguishers", label: "Brandblussers", description: "Poeder/schuim/CO2" },
      { value: "aed", label: "AED", description: "Automatische Externe Defibrillator" },
      { value: "firstaid", label: "EHBO-koffers", description: "Volledig uitgerust" },
      { value: "emergency-lighting", label: "Noodverlichting", description: "Bij uitgangen" },
      { value: "alarm", label: "Brandalarm", description: "Detectie en melding" },
      { value: "evacuation-chairs", label: "Evacuatiestoelen", description: "Voor mindervaliden" }
    ],
    columns: [
      { value: "certified", label: "Aanwezig & Gecertificeerd", score: 10 },
      { value: "present", label: "Aanwezig, niet gecertificeerd", score: 5 },
      { value: "ordered", label: "Besteld", score: 3 },
      { value: "absent", label: "Niet aanwezig", score: 0 }
    ],
    weight: 2.5,
    category: "middelen"
  },

  // 4. Risk Priority - Ranking
  {
    id: 4,
    question: "Rangschik de volgende veiligheidsrisico's naar prioriteit in uw organisatie",
    type: "ranking",
    hint: "Sleep de items om ze te ordenen van hoogste (1) naar laagste prioriteit",
    options: [
      { value: "fire", label: "Brandgevaar", description: "Risico op brand en rookontwikkeling" },
      { value: "evacuation", label: "Evacuatie problemen", description: "Geblokkeerde uitgangen, onduidelijke routes" },
      { value: "firstaid", label: "Medische noodsituaties", description: "Hartfalen, ongevallen, verwondingen" },
      { value: "chemicals", label: "Gevaarlijke stoffen", description: "Chemische lekken of blootstelling" },
      { value: "violence", label: "Agressie & geweld", description: "Bedreiging door personen" },
      { value: "technical", label: "Technische storingen", description: "Stroom, gas, water problemen" }
    ],
    weight: 2,
    category: "planning"
  },

  // 5. Training Completion - Checkbox
  {
    id: 5,
    question: "Welke trainingen zijn in de afgelopen 12 maanden gevolgd?",
    type: "checkbox",
    hint: "Selecteer alle trainingen die uw team heeft gevolgd",
    options: [
      { value: "bhv-basic", label: "BHV Basis training", score: 3 },
      { value: "bhv-refresh", label: "BHV Herhaling", score: 3 },
      { value: "evacuation-drill", label: "Ontruimingsoefening", score: 2 },
      { value: "fire-practice", label: "Blusmiddelen praktijk", score: 2 },
      { value: "firstaid", label: "EHBO training", score: 2 },
      { value: "aed", label: "AED/reanimatie training", score: 2 },
      { value: "communication", label: "Communicatie bij calamiteiten", score: 1 },
      { value: "none", label: "Geen trainingen gevolgd", score: 0 }
    ],
    weight: 2.5,
    category: "training"
  },

  // 6. Documentation Status - Matrix
  {
    id: 6,
    question: "Wat is de status van uw veiligheidsdocumentatie?",
    type: "matrix",
    rowLabel: "Document",
    rows: [
      { value: "rie", label: "RI&E", description: "Risico Inventarisatie & Evaluatie" },
      { value: "evacuation-plan", label: "Ontruimingsplan" },
      { value: "emergency-plan", label: "Noodplan" },
      { value: "bhv-plan", label: "BHV organisatieplan" },
      { value: "incident-register", label: "Incidentenregister" },
      { value: "training-records", label: "Trainingsregistratie" }
    ],
    columns: [
      { value: "current", label: "Actueel (<1 jaar)", score: 10 },
      { value: "outdated", label: "Verouderd (>1 jaar)", score: 5 },
      { value: "in-progress", label: "In ontwikkeling", score: 3 },
      { value: "missing", label: "Niet aanwezig", score: 0 }
    ],
    weight: 2,
    category: "compliance"
  },

  // 7. Evacuation Readiness
  {
    id: 7,
    question: "Hoe vaak voert u een ontruimingsoefening uit?",
    type: "radio",
    options: [
      { value: "quarterly", label: "Elk kwartaal", score: 10 },
      { value: "biannual", label: "Twee keer per jaar", score: 8 },
      { value: "annual", label: "Jaarlijks", score: 6 },
      { value: "biennial", label: "Tweejaarlijks", score: 3 },
      { value: "never", label: "Nooit", score: 0 }
    ],
    weight: 2.5,
    category: "oefening"
  },

  // 8. Specific Safety Measures - Checkbox
  {
    id: 8,
    question: "Welke specifieke veiligheidsmaatregelen heeft u geïmplementeerd?",
    type: "checkbox",
    options: [
      { value: "emergency-exits", label: "Nooduitgangen duidelijk gemarkeerd", score: 2 },
      { value: "assembly-points", label: "Verzamelplaatsen aangewezen", score: 2 },
      { value: "floor-wardens", label: "Verdiepingsverantwoordelijken aangesteld", score: 2 },
      { value: "visitor-protocol", label: "Bezoekers veiligheidsprotocol", score: 1 },
      { value: "contractor-safety", label: "Aannemers veiligheidsinstructie", score: 1 },
      { value: "emergency-contacts", label: "Noodcontacten lijst actueel", score: 2 },
      { value: "backup-power", label: "Noodstroom voorziening", score: 1 },
      { value: "sprinklers", label: "Sprinklerinstallatie", score: 2 }
    ],
    weight: 2,
    category: "veiligheid"
  },

  // 9. Incident Response Time
  {
    id: 9,
    question: "Hoe snel kan uw BHV-team reageren op een incident?",
    type: "radio",
    options: [
      { value: "immediate", label: "< 2 minuten", score: 10 },
      { value: "quick", label: "2-5 minuten", score: 7 },
      { value: "moderate", label: "5-10 minuten", score: 4 },
      { value: "slow", label: "> 10 minuten", score: 1 },
      { value: "no-team", label: "Geen BHV-team aanwezig", score: 0 }
    ],
    weight: 3,
    category: "bhv"
  },

  // 10. Compliance & Certification
  {
    id: 10,
    question: "Welke certificeringen heeft uw organisatie?",
    type: "checkbox",
    options: [
      { value: "vca", label: "VCA certificering", score: 3 },
      { value: "iso45001", label: "ISO 45001", score: 3 },
      { value: "ohsas", label: "OHSAS 18001", score: 2 },
      { value: "nen", label: "NEN normeringen", score: 2 },
      { value: "arbo", label: "Arbocatalogus erkend", score: 2 },
      { value: "none", label: "Geen certificeringen", score: 0 }
    ],
    weight: 1.5,
    category: "compliance"
  },

  // 11. Budget & Resources
  {
    id: 11,
    question: "Hoeveel investeert u jaarlijks in veiligheid per medewerker?",
    type: "radio",
    options: [
      { value: "high", label: "> €500 per medewerker", score: 10 },
      { value: "medium", label: "€250-500 per medewerker", score: 7 },
      { value: "low", label: "€100-250 per medewerker", score: 4 },
      { value: "minimal", label: "< €100 per medewerker", score: 2 },
      { value: "none", label: "Geen specifiek budget", score: 0 }
    ],
    weight: 1,
    category: "algemeen"
  },

  // 12. External Support
  {
    id: 12,
    question: "Hoe is uw externe veiligheidsondersteuning geregeld?",
    type: "radio",
    options: [
      { value: "contract", label: "Volledig uitbesteed met SLA", score: 10 },
      { value: "partial", label: "Deels uitbesteed", score: 7 },
      { value: "advisory", label: "Externe adviseur op afroep", score: 5 },
      { value: "incidental", label: "Incidentele inhuur", score: 3 },
      { value: "none", label: "Alles intern geregeld", score: 6 }
    ],
    weight: 1.5,
    category: "algemeen"
  }
];

export const getTotalComprehensiveQuestions = () => comprehensiveQuestions.length;