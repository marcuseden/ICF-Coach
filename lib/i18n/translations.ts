// Translation system for ICF Coach App
// Supports Swedish (sv) and English (en)

export type Language = 'sv' | 'en';

export interface Translations {
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    save: string;
    cancel: string;
    continue: string;
    back: string;
    next: string;
    getStarted: string;
    learnMore: string;
  };
  
  // Navigation
  nav: {
    home: string;
    features: string;
    pricing: string;
    howItWorks: string;
    about: string;
    dashboard: string;
    sessions: string;
    book: string;
    commitments: string;
    reading: string;
    settings: string;
    menu: string;
    login: string;
    signup: string;
    logout: string;
  };
  
  // Hero Section
  hero: {
    title: string[];
    subtitle: string[];
    cta: string;
  };
  
  // Features
  features: {
    voiceCoach: {
      title: string;
      subtitle: string;
      description: string;
    };
    humanCoaching: {
      title: string;
      subtitle: string;
      description: string;
    };
    progressTracking: {
      title: string;
      subtitle: string;
      description: string;
    };
    icfCertified: {
      title: string;
      description: string;
    };
    smartScheduling: {
      title: string;
      description: string;
    };
    continuousGrowth: {
      title: string;
      description: string;
    };
  };
  
  // Features Page
  featuresPage: {
    hero: {
      title: string;
      subtitle: string;
    };
    voiceCoach: {
      subtitle: string;
      title: string;
      description: string;
      details: string[];
    };
    videoSessions: {
      subtitle: string;
      title: string;
      description: string;
      details: string[];
    };
    smartScheduling: {
      subtitle: string;
      title: string;
      description: string;
      details: string[];
    };
    commitmentTracking: {
      subtitle: string;
      title: string;
      description: string;
      details: string[];
    };
    growthInsights: {
      subtitle: string;
      title: string;
      description: string;
      details: string[];
    };
    icfCertified: {
      subtitle: string;
      title: string;
      description: string;
      details: string[];
    };
    wearables: {
      title: string;
      subtitle: string;
      appleWatch: {
        title: string;
        description: string;
        features: string[];
      };
      ouraRing: {
        title: string;
        description: string;
        features: string[];
      };
      whoop: {
        title: string;
        description: string;
        features: string[];
      };
      connectMessage: string;
      getStarted: string;
    };
    cta: {
      title: string;
      subtitle: string;
      button: string;
    };
  };
  
  // Packages
  packages: {
    heading: string;
    subtitle: string;
    mostPopular: string;
    basic: {
      name: string;
      duration: string;
      sessions: string;
      features: string[];
    };
    standard: {
      name: string;
      duration: string;
      sessions: string;
      features: string[];
    };
    premium: {
      name: string;
      duration: string;
      sessions: string;
      features: string[];
    };
  };
  
  // Value Props
  valueProps: {
    presence: {
      title: string;
      description: string;
    };
    awareness: {
      title: string;
      description: string;
    };
    action: {
      title: string;
      description: string;
    };
  };
  
  // How It Works
  howItWorks: {
    title: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  
  // Dashboard
  dashboard: {
    greeting: string;
    welcomeBack: string;
    quickActions: {
      startSession: string;
      checkIn: string;
      voiceSession: string;
      bookSession: string;
      talkToCoach: string;
      startVoiceCall: string;
    };
    upcomingSessions: string;
    nextSession: string;
    bookedSessions: string;
    progress: {
      title: string;
      sessionsCompleted: string;
      commitmentsMade: string;
      readingCompleted: string;
      sessions: string;
      activeGoals: string;
      confidence: string;
    };
    todaysFocus: string;
    todaysFocusText: string;
    showCommitments: string;
    continueReading: string;
    readingMaterial: string;
    minuteRead: string;
  };
  
  // Sessions
  sessions: {
    title: string;
    upcoming: string;
    completed: string;
    schedule: string;
    withCoach: string;
    duration: string;
    topics: string;
    voiceSession: string;
    videoSession: string;
    bookSession: string;
    sessionType: string;
    date: string;
    time: string;
    coach: string;
    noSessions: string;
    bookYourFirst: string;
  };
  
  // Reading
  reading: {
    title: string;
    categories: string;
    all: string;
    leadership: string;
    coaching: string;
    teamDevelopment: string;
    communication: string;
    minuteRead: string;
    continueReading: string;
    startReading: string;
  };
  
  // Settings
  settings: {
    title: string;
    profile: string;
    plan: string;
    devices: string;
    language: string;
    notifications: string;
    privacy: string;
    logout: string;
    editProfile: string;
    changePlan: string;
    manageDevices: string;
  };
  
  // Commitments
  commitments: {
    title: string;
    active: string;
    completed: string;
    noCommitments: string;
    addCommitment: string;
    dueDate: string;
    status: string;
    markComplete: string;
  };
  
  // Auth
  auth: {
    login: {
      title: string;
      email: string;
      password: string;
      submit: string;
      noAccount: string;
      signupLink: string;
    };
    signup: {
      title: string;
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      submit: string;
      hasAccount: string;
      loginLink: string;
    };
  };
  
  // Footer
  footer: {
    copyright: string;
    privacy: string;
    terms: string;
    contact: string;
  };
  
  // CTA
  cta: {
    main: string;
    description: string;
    button: string;
  };
}

export const translations: Record<Language, Translations> = {
  sv: {
    common: {
      loading: 'Laddar...',
      error: 'Något gick fel',
      success: 'Klart!',
      save: 'Spara',
      cancel: 'Avbryt',
      continue: 'Fortsätt',
      back: 'Tillbaka',
      next: 'Nästa',
      getStarted: 'Kom igång',
      learnMore: 'Läs mer',
    },
    
    nav: {
      home: 'Hem',
      features: 'Funktioner',
      pricing: 'Priser',
      howItWorks: 'Så fungerar det',
      about: 'Om oss',
      dashboard: 'Översikt',
      sessions: 'Sessioner',
      book: 'Boka',
      commitments: 'Åtaganden',
      reading: 'Läsmaterial',
      settings: 'Inställningar',
      menu: 'Meny',
      login: 'Logga in',
      signup: 'Skapa konto',
      logout: 'Logga ut',
    },
    
    hero: {
      title: ['Din coach.', 'Alltid där.', 'Alltid lyssnar.'],
      subtitle: [
        'Professionell coaching som passar ditt liv.',
        'AI-drivna sessioner, mänsklig visdom, verkliga resultat.'
      ],
      cta: 'Kom igång',
    },
    
    features: {
      voiceCoach: {
        title: 'Din AI-coach.\nTillgänglig när som helst.',
        subtitle: 'Håll in för att prata. Få omedelbar vägledning. Bygg momentum mellan sessioner med en coach som aldrig sover.',
        description: 'Vår AI röstcoach förstår dina mål, minns dina åtaganden och ställer de kraftfulla frågor som låser upp nya perspektiv. Det är som att ha en ICF-certifierad coach i fickan, redo när inspirationen slår till.',
      },
      humanCoaching: {
        title: 'Riktiga coacher.\nRiktig transformation.',
        subtitle: 'Anslut med ICF-certifierade proffs som har guidat tusentals genom deras tuffaste ledarutmaningar.',
        description: 'Video eller telefon. Ditt val. Boka sessioner som passar ditt schema och anslut med coacher som förstår det unika trycket i modernt ledarskap. Varje session följer beprövade ICF-ramverk designade för att skapa bestående förändring.',
      },
      progressTracking: {
        title: 'Se dig själv växa.\nVecka för vecka.',
        subtitle: 'Följ åtaganden. Mät självförtroende. Se mönster växa fram när små handlingar förvandlas till stora genombrott.',
        description: 'Vårt framstegssystem visar dig vad som fungerar. Visuella instrumentpaneler avslöjar din tillväxtbana, medan veckovisa check-ins håller dig ansvarig. Se dina självförtroende-poäng stiga när du bygger vanorna som gör stora ledare.',
      },
      icfCertified: {
        title: 'ICF-certifierad',
        description: 'Coaching som följer internationella standarder',
      },
      smartScheduling: {
        title: 'Smart schemaläggning',
        description: 'Boka sessioner som passar ditt liv, inte tvärtom',
      },
      continuousGrowth: {
        title: 'Kontinuerlig tillväxt',
        description: 'Bygg momentum med veckovisa check-ins och insikter',
      },
    },
    
    featuresPage: {
      hero: {
        title: 'Kraftfulla verktyg för din tillväxt',
        subtitle: 'AI-driven coaching kombinerad med mänsklig expertis för verklig transformation',
      },
      voiceCoach: {
        subtitle: 'RÖSTCOACHING',
        title: 'Din AI-coach. Tillgänglig när som helst.',
        description: 'Håll in för att prata. Få omedelbar vägledning. Bygg momentum mellan sessioner med en coach som aldrig sover.',
        details: [
          'ICF-certifierad coaching tillgänglig 24/7',
          'Minns alla dina mål och åtaganden',
          'Ställer kraftfulla frågor som låser upp nya perspektiv',
          'Perfekt för snabba check-ins mellan sessioner'
        ],
      },
      videoSessions: {
        subtitle: 'VIDEOSESSIONER',
        title: 'Riktiga coacher. Riktig transformation.',
        description: 'Anslut med ICF-certifierade proffs som har guidat tusentals genom deras tuffaste ledarutmaningar.',
        details: [
          'Boka sessioner som passar ditt schema',
          'Video eller telefon - ditt val',
          'Varje coach har 500+ timmar av certifierad utbildning',
          'Specialiserade i ledarskap och teamutveckling'
        ],
      },
      smartScheduling: {
        subtitle: 'SMART SCHEMALÄGGNING',
        title: 'Coaching som passar ditt liv',
        description: 'Boka sessioner som fungerar för dig, inte tvärtom. Vårt smarta system hittar de perfekta tiderna.',
        details: [
          'Se tillgänglighet i realtid',
          'Boka, omboka eller avboka enkelt',
          'Automatiska påminnelser och förberedelser',
          'Synkroniserar med din kalender'
        ],
      },
      commitmentTracking: {
        subtitle: 'ÅTAGANDE-SPÅRNING',
        title: 'Förvandla insikter till handling',
        description: 'Varje coaching-session genererar åtaganden. Vårt system hjälper dig att följa dem.',
        details: [
          'Spåra framsteg mot varje åtagande',
          'Veckovisa check-ins håller dig ansvarig',
          'Se mönster i vad som fungerar',
          'Bygg momentum med små vinster'
        ],
      },
      growthInsights: {
        subtitle: 'TILLVÄXT-INSIKTER',
        title: 'Se dig själv växa. Vecka för vecka.',
        description: 'Mät självförtroende. Följ åtaganden. Se mönster växa fram när små handlingar förvandlas till stora genombrott.',
        details: [
          'Visuella instrumentpaneler visar din framsteg',
          'Följ självförtroende över tid',
          'Identifiera vad som fungerar bäst',
          'Dela framsteg med din coach'
        ],
      },
      icfCertified: {
        subtitle: 'ICF-CERTIFIERAD',
        title: 'Världsklass coaching-standarder',
        description: 'Varje coach och varje session följer ramverket från International Coach Federation.',
        details: [
          'Alla coacher är ICF-certifierade',
          'Beprövade metoder för bestående förändring',
          'Etiska riktlinjer och konfidentialitet',
          'Kontinuerlig professionell utveckling'
        ],
      },
      wearables: {
        title: 'Anslut dina enheter',
        subtitle: 'Integrera dina hälso- och träningsdata för djupare insikter',
        appleWatch: {
          title: 'Apple Watch',
          description: 'Synkronisera aktivitet, sömn och mindfulness-data',
          features: [
            'Automatisk aktivitetsspårning',
            'Sömnanalys',
            'Hjärtfrekvensdata',
            'Mindfulness-minuter'
          ],
        },
        ouraRing: {
          title: 'Oura Ring',
          description: 'Djupgående sömn- och återhämtningsinsikter',
          features: [
            'Sömnstadier och kvalitet',
            'Återhämtningspoäng',
            'Beredskap att prestera',
            'Aktivitetsbalans'
          ],
        },
        whoop: {
          title: 'WHOOP Band',
          description: 'Professionell tränings- och återhämtningsspårning',
          features: [
            'Ansträngningspoäng',
            'Återhämtning',
            'Sömnprestation',
            'Träningsrekommendationer'
          ],
        },
        connectMessage: 'Anslut dina enheter för att ge din coach fullständig bild av din hälsa och prestanda.',
        getStarted: 'Kom igång',
      },
      cta: {
        title: 'Redo att börja din tillväxtresa?',
        subtitle: 'Gå med tusentals ledare som transformerar sitt ledarskap med AI-driven coaching.',
        button: 'Kom igång idag',
      },
    },
    
    packages: {
      heading: 'Välj din resa',
      subtitle: 'Alla paket inkluderar AI röstcoaching och ICF-certifierat mänskligt stöd',
      mostPopular: 'Mest populär',
      basic: {
        name: 'Bas',
        duration: '4 veckor',
        sessions: '4 sessioner',
        features: [
          '30-min sessioner',
          'Veckovisa check-ins',
          'AI röstcoach',
          '2 läsmaterial'
        ],
      },
      standard: {
        name: 'Standard',
        duration: '8 veckor',
        sessions: '8 sessioner',
        features: [
          '45-min sessioner',
          'Två-veckors check-ins',
          'AI + mänsklig coach',
          '3 läsmaterial',
          'Framstegsrapporter'
        ],
      },
      premium: {
        name: 'Premium',
        duration: '12 veckor',
        sessions: '12 sessioner',
        features: [
          '60-min sessioner',
          'Veckovisa check-ins',
          'Prioriterad support',
          '4 läsmaterial',
          'Detaljerade rapporter',
          'Videosessioner'
        ],
      },
    },
    
    valueProps: {
      presence: {
        title: 'Närvaro',
        description: 'Fullt närvarande coaching som skapar tillit och trygghet',
      },
      awareness: {
        title: 'Medvetenhet',
        description: 'Kraftfulla frågor som väcker dina egna insikter',
      },
      action: {
        title: 'Handling',
        description: 'Självgenererade steg som skapar bestående förändring',
      },
    },
    
    howItWorks: {
      title: 'Så fungerar det',
      steps: [
        {
          title: 'Välj ditt paket',
          description: 'Välj den coachingresa som passar dina behov och tidsram',
        },
        {
          title: 'Slutför intag',
          description: 'Dela var du är och vart du vill komma',
        },
        {
          title: 'Engagera i sessioner',
          description: 'Veckovisa coachingsessioner med kraftfulla frågor och reflektion',
        },
        {
          title: 'Agera & reflektera',
          description: 'Mobila check-ins mellan sessioner för att följa dina framsteg',
        },
        {
          title: 'Väx & bibehåll',
          description: 'Bygg bestående vanor och system för pågående utveckling',
        },
      ],
    },
    
    dashboard: {
      greeting: 'Hej',
      welcomeBack: 'Välkommen tillbaka',
      quickActions: {
        startSession: 'Starta session',
        checkIn: 'Check-in',
        voiceSession: 'Röstsession',
        bookSession: 'Boka session',
        talkToCoach: 'Prata med din coach',
        startVoiceCall: 'Starta ett röstsamtal med din AI-coach',
      },
      upcomingSessions: 'Kommande sessioner',
      nextSession: 'Nästa session: ',
      bookedSessions: 'bokad session',
      progress: {
        title: 'Din progress',
        sessionsCompleted: 'Genomförda sessioner',
        commitmentsMade: 'Åtaganden gjorda',
        readingCompleted: 'Läsmaterial klart',
        sessions: 'Sessioner',
        activeGoals: 'Aktiva mål',
        confidence: 'Förtroende',
      },
      todaysFocus: 'Dagens fokus',
      todaysFocusText: 'Fortsätt bygga förtroende med ditt team genom individuella samtal. Ta dig tid att verkligen lyssna och ställa öppna frågor.',
      showCommitments: 'Visa åtaganden',
      continueReading: 'Fortsätt läsa',
      readingMaterial: 'Läsmaterial',
      minuteRead: 'min läsning',
    },
    
    sessions: {
      title: 'Sessioner',
      upcoming: 'Kommande',
      completed: 'Genomförda',
      schedule: 'Schemalägg',
      withCoach: 'med',
      duration: 'min',
      topics: 'Ämnen',
      voiceSession: 'Röstsession',
      videoSession: 'Videosession',
      bookSession: 'Boka session',
      sessionType: 'Sessionstyp',
      date: 'Datum',
      time: 'Tid',
      coach: 'Coach',
      noSessions: 'Inga sessioner bokade',
      bookYourFirst: 'Boka din första session',
    },
    
    reading: {
      title: 'Läsmaterial',
      categories: 'Kategorier',
      all: 'Alla',
      leadership: 'Ledarskap',
      coaching: 'Coaching',
      teamDevelopment: 'Teamutveckling',
      communication: 'Kommunikation',
      minuteRead: 'min läsning',
      continueReading: 'Fortsätt läsa',
      startReading: 'Börja läsa',
    },
    
    settings: {
      title: 'Inställningar',
      profile: 'Profil',
      plan: 'Abonnemang',
      devices: 'Enheter',
      language: 'Språk',
      notifications: 'Notifikationer',
      privacy: 'Integritet',
      logout: 'Logga ut',
      editProfile: 'Redigera profil',
      changePlan: 'Ändra abonnemang',
      manageDevices: 'Hantera enheter',
    },
    
    commitments: {
      title: 'Åtaganden',
      active: 'Aktiva',
      completed: 'Genomförda',
      noCommitments: 'Inga åtaganden än',
      addCommitment: 'Lägg till åtagande',
      dueDate: 'Förfallodatum',
      status: 'Status',
      markComplete: 'Markera som klar',
    },
    
    auth: {
      login: {
        title: 'Logga in',
        email: 'E-postadress',
        password: 'Lösenord',
        submit: 'Logga in',
        noAccount: 'Inget konto?',
        signupLink: 'Skapa ett',
      },
      signup: {
        title: 'Skapa konto',
        name: 'Namn',
        email: 'E-postadress',
        password: 'Lösenord',
        confirmPassword: 'Bekräfta lösenord',
        submit: 'Skapa konto',
        hasAccount: 'Har redan konto?',
        loginLink: 'Logga in',
      },
    },
    
    footer: {
      copyright: '© 2025 YourCoachAgent. Alla rättigheter förbehållna.',
      privacy: 'Integritet',
      terms: 'Villkor',
      contact: 'Kontakt',
    },
    
    cta: {
      main: 'Redo att bli ledaren du är menad att vara?',
      description: 'Gå med hundratals chefer som har transformerat sina team och karriärer',
      button: 'Börja din resa',
    },
  },
  
  en: {
    common: {
      loading: 'Loading...',
      error: 'Something went wrong',
      success: 'Success!',
      save: 'Save',
      cancel: 'Cancel',
      continue: 'Continue',
      back: 'Back',
      next: 'Next',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
    },
    
    nav: {
      home: 'Home',
      features: 'Features',
      pricing: 'Pricing',
      howItWorks: 'How It Works',
      about: 'About',
      dashboard: 'Dashboard',
      sessions: 'Sessions',
      book: 'Book',
      commitments: 'Commitments',
      reading: 'Reading',
      settings: 'Settings',
      menu: 'Menu',
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
    },
    
    hero: {
      title: ['Your coach.', 'Always there.', 'Always listening.'],
      subtitle: [
        'Professional coaching that fits your life.',
        'AI-powered sessions, human wisdom, real results.'
      ],
      cta: 'Get Started',
    },
    
    features: {
      voiceCoach: {
        title: 'Your AI coach.\nAvailable anytime.',
        subtitle: 'Hold to speak. Get instant guidance. Build momentum between sessions with a coach that never sleeps.',
        description: 'Our AI voice coach understands your goals, remembers your commitments, and asks the powerful questions that unlock new perspectives. It\'s like having an ICF-certified coach in your pocket, ready whenever inspiration strikes.',
      },
      humanCoaching: {
        title: 'Real coaches.\nReal transformation.',
        subtitle: 'Connect with ICF-certified professionals who\'ve guided thousands through their toughest leadership challenges.',
        description: 'Video or phone. Your choice. Book sessions that fit your schedule and connect with coaches who understand the unique pressures of modern leadership. Every session follows proven ICF frameworks designed to create lasting change.',
      },
      progressTracking: {
        title: 'See yourself grow.\nWeek by week.',
        subtitle: 'Track commitments. Measure confidence. Watch patterns emerge as small actions compound into major breakthroughs.',
        description: 'Our progress system shows you what\'s working. Visual dashboards reveal your growth trajectory, while weekly check-ins keep you accountable. See your confidence scores rise as you build the habits that make great leaders.',
      },
      icfCertified: {
        title: 'ICF Certified',
        description: 'Coaching that follows international standards',
      },
      smartScheduling: {
        title: 'Smart Scheduling',
        description: 'Book sessions that fit your life, not the other way around',
      },
      continuousGrowth: {
        title: 'Continuous Growth',
        description: 'Build momentum with weekly check-ins and insights',
      },
    },
    
    featuresPage: {
      hero: {
        title: 'Powerful tools for your growth',
        subtitle: 'AI-powered coaching combined with human expertise for real transformation',
      },
      voiceCoach: {
        subtitle: 'VOICE COACHING',
        title: 'Your AI coach. Available anytime.',
        description: 'Hold to speak. Get instant guidance. Build momentum between sessions with a coach that never sleeps.',
        details: [
          'ICF-certified coaching available 24/7',
          'Remembers all your goals and commitments',
          'Asks powerful questions that unlock new perspectives',
          'Perfect for quick check-ins between sessions'
        ],
      },
      videoSessions: {
        subtitle: 'VIDEO SESSIONS',
        title: 'Real coaches. Real transformation.',
        description: 'Connect with ICF-certified professionals who\'ve guided thousands through their toughest leadership challenges.',
        details: [
          'Book sessions that fit your schedule',
          'Video or phone - your choice',
          'Every coach has 500+ hours of certified training',
          'Specialized in leadership and team development'
        ],
      },
      smartScheduling: {
        subtitle: 'SMART SCHEDULING',
        title: 'Coaching that fits your life',
        description: 'Book sessions that work for you, not the other way around. Our smart system finds the perfect times.',
        details: [
          'See real-time availability',
          'Book, reschedule, or cancel easily',
          'Automatic reminders and preparation',
          'Syncs with your calendar'
        ],
      },
      commitmentTracking: {
        subtitle: 'COMMITMENT TRACKING',
        title: 'Transform insights into action',
        description: 'Every coaching session generates commitments. Our system helps you follow through.',
        details: [
          'Track progress toward each commitment',
          'Weekly check-ins keep you accountable',
          'See patterns in what works',
          'Build momentum with small wins'
        ],
      },
      growthInsights: {
        subtitle: 'GROWTH INSIGHTS',
        title: 'See yourself grow. Week by week.',
        description: 'Measure confidence. Track commitments. Watch patterns emerge as small actions compound into major breakthroughs.',
        details: [
          'Visual dashboards show your progress',
          'Track confidence over time',
          'Identify what works best',
          'Share progress with your coach'
        ],
      },
      icfCertified: {
        subtitle: 'ICF CERTIFIED',
        title: 'World-class coaching standards',
        description: 'Every coach and every session follows the framework from the International Coach Federation.',
        details: [
          'All coaches are ICF certified',
          'Proven methods for lasting change',
          'Ethical guidelines and confidentiality',
          'Ongoing professional development'
        ],
      },
      wearables: {
        title: 'Connect your devices',
        subtitle: 'Integrate your health and fitness data for deeper insights',
        appleWatch: {
          title: 'Apple Watch',
          description: 'Sync activity, sleep, and mindfulness data',
          features: [
            'Automatic activity tracking',
            'Sleep analysis',
            'Heart rate data',
            'Mindfulness minutes'
          ],
        },
        ouraRing: {
          title: 'Oura Ring',
          description: 'Deep sleep and recovery insights',
          features: [
            'Sleep stages and quality',
            'Recovery score',
            'Readiness to perform',
            'Activity balance'
          ],
        },
        whoop: {
          title: 'WHOOP Band',
          description: 'Professional training and recovery tracking',
          features: [
            'Strain score',
            'Recovery',
            'Sleep performance',
            'Training recommendations'
          ],
        },
        connectMessage: 'Connect your devices to give your coach the complete picture of your health and performance.',
        getStarted: 'Get Started',
      },
      cta: {
        title: 'Ready to start your growth journey?',
        subtitle: 'Join thousands of leaders transforming their leadership with AI-powered coaching.',
        button: 'Get Started Today',
      },
    },
    
    packages: {
      heading: 'Choose your journey',
      subtitle: 'All packages include AI voice coaching and ICF-certified human support',
      mostPopular: 'Most Popular',
      basic: {
        name: 'Basic',
        duration: '4 weeks',
        sessions: '4 sessions',
        features: [
          '30-min sessions',
          'Weekly check-ins',
          'AI voice coach',
          '2 reading materials'
        ],
      },
      standard: {
        name: 'Standard',
        duration: '8 weeks',
        sessions: '8 sessions',
        features: [
          '45-min sessions',
          'Bi-weekly check-ins',
          'AI + human coach',
          '3 reading materials',
          'Progress reports'
        ],
      },
      premium: {
        name: 'Premium',
        duration: '12 weeks',
        sessions: '12 sessions',
        features: [
          '60-min sessions',
          'Weekly check-ins',
          'Priority support',
          '4 reading materials',
          'Detailed reports',
          'Video sessions'
        ],
      },
    },
    
    valueProps: {
      presence: {
        title: 'Presence',
        description: 'Fully present coaching that creates trust and safety',
      },
      awareness: {
        title: 'Awareness',
        description: 'Powerful questions that evoke your own insights',
      },
      action: {
        title: 'Action',
        description: 'Self-generated steps that create lasting change',
      },
    },
    
    howItWorks: {
      title: 'How It Works',
      steps: [
        {
          title: 'Choose Your Package',
          description: 'Select the coaching journey that fits your needs and timeline',
        },
        {
          title: 'Complete Intake',
          description: 'Share where you are and where you want to go',
        },
        {
          title: 'Engage in Sessions',
          description: 'Weekly coaching sessions with powerful questions and reflection',
        },
        {
          title: 'Take Action & Reflect',
          description: 'Mobile check-ins between sessions to track your progress',
        },
        {
          title: 'Grow & Sustain',
          description: 'Build lasting habits and systems for ongoing development',
        },
      ],
    },
    
    dashboard: {
      greeting: 'Hello',
      welcomeBack: 'Welcome back',
      quickActions: {
        startSession: 'Start Session',
        checkIn: 'Check-In',
        voiceSession: 'Voice Session',
        bookSession: 'Book Session',
        talkToCoach: 'Talk to your coach',
        startVoiceCall: 'Start a voice call with your AI coach',
      },
      upcomingSessions: 'Upcoming Sessions',
      nextSession: 'Next session: ',
      bookedSessions: 'booked session',
      progress: {
        title: 'Your Progress',
        sessionsCompleted: 'Sessions Completed',
        commitmentsMade: 'Commitments Made',
        readingCompleted: 'Reading Completed',
        sessions: 'Sessions',
        activeGoals: 'Active Goals',
        confidence: 'Confidence',
      },
      todaysFocus: 'Today\'s Focus',
      todaysFocusText: 'Continue building trust with your team through individual conversations. Take time to really listen and ask open questions.',
      showCommitments: 'Show commitments',
      continueReading: 'Continue reading',
      readingMaterial: 'Reading Material',
      minuteRead: 'min read',
    },
    
    sessions: {
      title: 'Sessions',
      upcoming: 'Upcoming',
      completed: 'Completed',
      schedule: 'Schedule',
      withCoach: 'with',
      duration: 'min',
      topics: 'Topics',
      voiceSession: 'Voice Session',
      videoSession: 'Video Session',
      bookSession: 'Book Session',
      sessionType: 'Session Type',
      date: 'Date',
      time: 'Time',
      coach: 'Coach',
      noSessions: 'No sessions booked',
      bookYourFirst: 'Book your first session',
    },
    
    reading: {
      title: 'Reading',
      categories: 'Categories',
      all: 'All',
      leadership: 'Leadership',
      coaching: 'Coaching',
      teamDevelopment: 'Team Development',
      communication: 'Communication',
      minuteRead: 'min read',
      continueReading: 'Continue reading',
      startReading: 'Start reading',
    },
    
    settings: {
      title: 'Settings',
      profile: 'Profile',
      plan: 'Plan',
      devices: 'Devices',
      language: 'Language',
      notifications: 'Notifications',
      privacy: 'Privacy',
      logout: 'Logout',
      editProfile: 'Edit profile',
      changePlan: 'Change plan',
      manageDevices: 'Manage devices',
    },
    
    commitments: {
      title: 'Commitments',
      active: 'Active',
      completed: 'Completed',
      noCommitments: 'No commitments yet',
      addCommitment: 'Add commitment',
      dueDate: 'Due date',
      status: 'Status',
      markComplete: 'Mark complete',
    },
    
    auth: {
      login: {
        title: 'Login',
        email: 'Email',
        password: 'Password',
        submit: 'Login',
        noAccount: 'No account?',
        signupLink: 'Sign up',
      },
      signup: {
        title: 'Sign Up',
        name: 'Name',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        submit: 'Sign Up',
        hasAccount: 'Already have an account?',
        loginLink: 'Login',
      },
    },
    
    footer: {
      copyright: '© 2025 YourCoachAgent. All rights reserved.',
      privacy: 'Privacy',
      terms: 'Terms',
      contact: 'Contact',
    },
    
    cta: {
      main: 'Ready to become the leader you\'re meant to be?',
      description: 'Join hundreds of managers who\'ve transformed their teams and careers',
      button: 'Start Your Journey',
    },
  },
};

// Helper function to get translations
export function getTranslations(language: Language = 'sv'): Translations {
  return translations[language];
}

// Helper function for nested translation access
export function t(language: Language, key: string): any {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value;
}

