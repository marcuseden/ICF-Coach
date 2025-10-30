// Swedish version of reading materials for ICF Coaching
// Translated from reading-content.ts

export interface ReadingArticleSV {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  progress: number;
  image: string;
  content: string[];
}

export const readingArticlesSV: Record<string, ReadingArticleSV> = {
  '1': {
    id: '1',
    title: 'Hantera fjärrteam effektivt',
    description: 'Lär dig strategier för att leda distribuerade team',
    category: 'Ledarskap',
    readTime: '12 min',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    content: [
      'Att leda ett distribuerat team kräver nya färdigheter och tankesätt. Traditionella ledarskapsmetoder fungerar inte alltid när teamet är geografiskt spritt.',
      'Den första utmaningen är att skapa sammanhang och gemenskap. När teammedlemmar inte möts dagligen på kontoret, måste du aktivt arbeta för att bygga relationer och tillit.',
      '**Fem nyckelprinciper för effektivt fjärrledarskap:**',
      '**1. Överkommunicera med syfte**',
      'I ett fjärrteam räcker det inte med sporadisk kommunikation. Du behöver etablera tydliga rutiner för både synkron och asynkron kommunikation.',
      '**2. Fokusera på resultat, inte aktivitet**',
      'Sluta mäta hur många timmar folk sitter vid datorn. Istället, sätt tydliga mål och låt teamet själva bestämma när och hur de jobbar.',
      '**3. Skapa virtuella sociala rum**',
      'Arbeta medvetet med att skapa informella mötesplatser. Det kan vara en virtuell fikapaus på fredagar eller en kanal för småprat.',
      '**4. Var synlig och närvarande**',
      'Som ledare måste du vara extra tydlig med din närvaro. Svara snabbt på meddelanden, håll kameran på i möten, och var proaktiv.',
      '**5. Investera i rätt verktyg**',
      'Teknik är inte allt, men den är grunden. Se till att teamet har bra utrustning hemma och tillgång till rätt samarbetsverktyg.',
      '**Reflektionsfrågor:**',
      '- Vilka av dessa principer tillämpar du redan?',
      '- Var finns den största utvecklingsmöjligheten för dig?',
      '- Hur kan du stärka relationen med varje teammedlem denna vecka?'
    ]
  },

  '2': {
    id: '2',
    title: 'Kraftfulla coachingfrågor',
    description: 'En guide till att ställa frågor som skapar insikt',
    category: 'Coaching',
    readTime: '8 min',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop',
    content: [
      'En bra coachingfråga öppnar dörrar. En dålig stänger dem. Skillnaden ligger inte bara i ordvalet, utan i intentionen bakom frågan.',
      'Som coach är din viktigaste verktyg inte dina råd eller din erfarenhet - det är din förmåga att ställa frågor som får klienten att tänka djupare.',
      '**Vad kännetecknar en kraftfull fråga?**',
      'En kraftfull coachingfråga är:',
      '- **Öppen** - Kan inte besvaras med ja eller nej',
      '- **Fokuserad på framtiden** - "Vad vill du?" istället för "Varför gjorde du?"',
      '- **Klientcentrerad** - Handlar om klientens perspektiv, inte ditt',
      '- **Utforskande** - Bjuder in till reflektion snarare än svar',
      '- **Energiskapande** - Skapar nyfikenhet och motivation',
      '**Exempel på kraftfulla coachingfrågor:**',
      '*För att utforska mål:*',
      '- Vad skulle framgång se ut för dig i denna situation?',
      '- Om du kunde vifta med en trollstav, hur skulle det ideala resultatet se ut?',
      '- Vad är verkligen viktigt för dig här?',
      '*För att skapa medvetenhet:*',
      '- Vad märker du när du reflekterar över detta?',
      '- Vilka alternativ ser du framför dig?',
      '- Vad säger din intuition?',
      '**Vanliga misstag att undvika:**',
      '**1. "Varför"-frågor som låter som anklagelser**',
      '"Varför gjorde du så?" kan få människor i försvar. Prova istället: "Vad var ditt resonemang när du valde den vägen?"',
      '**2. Ledande frågor**',
      '"Tycker du inte att du borde..." är inte en fråga, det är ett förklätt råd.',
      '**Övning:** Vid nästa coachingsamtal, räkna hur många gånger du ställer en fråga kontra ger ett råd. Sikta på att 80% ska vara frågor.'
    ]
  },

  '3': {
    id: '3',
    title: 'Bygga psykologisk trygghet',
    description: 'Skapa en miljö där teamet vågar ta risker',
    category: 'Teamutveckling',
    readTime: '15 min',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
    content: [
      'Psykologisk trygghet är den viktigaste faktorn för högpresterande team. Det visar Googles Project Aristotle och Amy Edmondsons forskning.',
      'Men vad betyder det egentligen? Psykologisk trygghet innebär att teammedlemmar känner sig trygga att ta risker, uttrycka åsikter, ställa frågor och göra misstag - utan rädsla för att bli förödmjukade eller bestraffade.',
      '**Varför är det så viktigt?**',
      'Team med hög psykologisk trygghet:',
      '- Delar information öppet',
      '- Lär sig snabbare av misstag',
      '- Innoverar mer eftersom folk vågar testa idéer',
      '- Har bättre problemlösning genom diverse perspektiv',
      '- Behåller talang längre',
      '**Fem sätt att bygga psykologisk trygghet:**',
      '**1. Modellera sårbarhet**',
      'Som ledare, visa att det är okej att inte veta allt. Säg "Jag vet inte, vad tror du?" Erkänn när du har fel.',
      '**2. Ställ inbjudande frågor**',
      '- "Vad ser jag inte här?"',
      '- "Vem har ett annat perspektiv?"',
      '- "Vad missar vi?"',
      '**3. Hantera misstag konstruktivt**',
      'När något går fel, fokusera på: Vad hände? Vad kan vi lära oss? Hur förhindrar vi detta framöver?',
      '**4. Uppmuntra konstruktiv konflikt**',
      'Bra teams har sunda konflikter om idéer. Uppmuntra debatt med tydliga regler.',
      '**5. Fira lärande från misslyckanden**',
      'Ha retrospektiver där ni öppet diskuterar vad som inte fungerade. Normalisera att experiment inte alltid lyckas.',
      '**Kom ihåg:** Psykologisk trygghet byggs inte över natten. Det tar tid, konsistens och att du som ledare går före.'
    ]
  },

  '4': {
    id: '4',
    title: 'Feedback som förändrar',
    description: 'Konsten att ge konstruktiv återkoppling',
    category: 'Kommunikation',
    readTime: '10 min',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    content: [
      'De flesta ledare ger för lite feedback. Och när de väl ger feedback, är den ofta vag eller defensiv.',
      'Problemet är inte att feedback är svårt - det är att vi lärt oss fel metoder.',
      '**COIN-modellen för feedback:**',
      '**C - Context** (Sammanhang)',
      'Var och när hände detta? Ge konkret kontext.',
      '**O - Observation** (Observation)',
      'Vad såg/hörde du? Beskriv beteendet objektivt.',
      '**I - Impact** (Påverkan)',
      'Vilken effekt hade det? Beskriv konsekvenserna.',
      '**N - Next** (Nästa steg)',
      'Vad vill du se framåt? Var specifik om önskat beteende.',
      '**Exempel på bra feedback:**',
      '"I gårdagens projektmöte skickade du uppdateringen via Slack istället för att informera teamet direkt, vilket gjorde att hälften missade informationen. Kan du nästa gång ta det i vårt dagliga standup?"',
      '**När ska du ge feedback?**',
      'Så snart som möjligt efter observationen. Feedback förlorar kraft med tiden.',
      '**Övning för nästa vecka:**',
      'Ge feedback till minst tre personer. Använd COIN-modellen. Skriv ner det först för att öva.'
    ]
  },

  '5': {
    id: '5',
    title: 'Delegering som utvecklar',
    description: 'Släpp kontroll och bygg kompetens',
    category: 'Ledarskap',
    readTime: '11 min',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    content: [
      'Delegering är inte bara om att få saker gjorda - det är ett av dina kraftfullaste verktyg för att utveckla ditt team.',
      'Men de flesta ledare delegerar för lite, för sent, eller på fel sätt.',
      '**Varför delegerar vi inte?**',
      '**"Det går snabbare om jag gör det själv"** - Sant på kort sikt, men på lång sikt blir du en flaskhals.',
      '**"De kan inte göra det lika bra som jag"** - Korrekt. De kommer göra det annorlunda. Och det är okej.',
      '**"Jag är rädd att de ska misslyckas"** - Det är så man lär sig. Din uppgift är att göra det säkert att misslyckas.',
      '**Fem nivåer av delegering:**',
      '**Nivå 1: Undersök och rapportera**',
      '"Ta reda på fakta och kom tillbaka till mig, så beslutar vi tillsammans."',
      '**Nivå 2: Undersök och rekommendera**',
      '"Ta reda på alternativen och ge mig dina rekommendationer."',
      '**Nivå 3: Undersök och agera efter godkännande**',
      '"Bestäm själv, men fråga mig innan du implementerar."',
      '**Nivå 4: Agera och rapportera**',
      '"Gör vad du tycker är rätt och informera mig efteråt."',
      '**Nivå 5: Agera fritt**',
      '"Du har fullt ansvar. Ingen rapportering behövs."',
      '**Hur delegerar du effektivt:**',
      '**1. Var tydlig med vad och varför**',
      'Beskriv önskat resultat, inte metod. Förklara varför uppgiften är viktig.',
      '**2. Matcha uppgift med utvecklingsnivå**',
      'Någon ny på området? Börja på nivå 1-2. Erfaren? Ge nivå 4-5.',
      '**3. Ge resurser och stöd**',
      'Säkerställ att personen har vad den behöver: tid, budget, information, mandat.',
      '**4. Följ upp regelbundet**',
      'Schemalägg check-ins baserat på risk och erfarenhet.',
      '**5. Lär av resultatet**',
      'Oavsett utfall, ha en kort retrospektiv: Vad fungerade? Vad lärde vi oss?'
    ]
  },

  '6': {
    id: '6',
    title: 'Aktiv lyssning i praktiken',
    description: 'Lyssna för att förstå, inte för att svara',
    category: 'Coaching',
    readTime: '9 min',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1573164574472-797cdf4a583a?w=400&h=300&fit=crop',
    content: [
      'Vi tror att vi lyssnar. Men ofta väntar vi bara på vår tur att prata.',
      'Aktiv lyssning är en färdighet som få behärskar men som alla kan lära sig.',
      '**Tre nivåer av lyssning:**',
      '**Nivå 1: Intern lyssning**',
      'Du hör orden men tänker mest på vad de betyder för dig. "Det påminner mig om när jag..."',
      '**Nivå 2: Fokuserad lyssning**',
      'Du lyssnar fullt på vad personen säger, både ord och känsla.',
      '**Nivå 3: Global lyssning**',
      'Du är närvarande för allt - ord, tonfall, kroppsspråk, energi, det osagda.',
      '**Tecken på att du INTE lyssnar aktivt:**',
      '- Du avbryter med lösningar',
      '- Du tänker på ditt svar medan personen pratar',
      '- Du kollar telefonen eller datorn',
      '- Du ändrar ämne till något som intresserar dig mer',
      '- Du jämför med egen erfarenhet',
      '**Så lyssnar du aktivt:**',
      '**1. Var fullt närvarande**',
      'Stäng laptopen. Lägg bort telefonen. Vänd kroppen mot personen.',
      '**2. Använd tystnad**',
      'Räkna till tre efter att personen slutat prata. Ofta kommer det viktiga efter pausen.',
      '**3. Reflektera tillbaka**',
      '"Så som jag förstår det säger du att..." Detta visar att du lyssnar och ger personen chans att förtydliga.',
      '**4. Fånga känslor**',
      '"Du verkar frustrerad över det här." Namnge känslor hjälper personen att känna sig sedd.',
      '**5. Ställ öppna frågor**',
      '"Berätta mer..." "Vad mer finns där?" "Hur kändes det?"',
      '**Resultat av aktiv lyssning:**',
      'När du verkligen lyssnar:',
      '- Människor känner sig sedda och värderade',
      '- Problem löses snabbare eftersom rätt problem identifieras',
      '- Relationer fördjupas',
      '- Du lär dig saker du annars missat',
      '- Konflikter minskar'
    ]
  },
};

// Helper functions
export function getArticleByIdSV(id: string): ReadingArticleSV | undefined {
  return readingArticlesSV[id];
}

export function getArticlesByCategorySV(category?: string): ReadingArticleSV[] {
  const articles = Object.values(readingArticlesSV);
  if (!category) return articles;
  return articles.filter(article => article.category === category);
}

export function getCategoriesSV(): string[] {
  const categories = new Set(Object.values(readingArticlesSV).map(a => a.category));
  return Array.from(categories);
}

