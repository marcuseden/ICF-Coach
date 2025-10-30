'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent } from '@/components/ui/card';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';

// Mock reading content database
const readingArticles: Record<string, {
  id: string;
  title: string;
  category: string;
  readTime: string;
  content: string[];
}> = {
  '1': {
    id: '1',
    title: 'Hantera fjärrteam effektivt',
    category: 'Ledarskap',
    readTime: '12 min',
    content: [
      'Att leda ett distribuerat team kräver nya färdigheter och tankesätt. Traditionella ledarskapsmetoder fungerar inte alltid när teamet är geografiskt spritt.',
      
      'Den första utmaningen är att skapa sammanhang och gemenskap. När teammedlemmar inte möts dagligen på kontoret, måste du aktivt arbeta för att bygga relationer och tillit.',
      
      'Här är fem nyckelprinciper för effektivt fjärrledarskap:',
      
      '1. **Överkommunicera med syfte**\nI ett fjärrteam räcker det inte med sporadisk kommunikation. Du behöver etablera tydliga rutiner för både synkron och asynkron kommunikation. Ha regelbundna videomöten där alla kan se varandras ansikten, men respektera också att folk arbetar i olika tidszoner.',
      
      '2. **Fokusera på resultat, inte aktivitet**\nSluta mäta hur många timmar folk sitter vid datorn. Istället, sätt tydliga mål och låt teamet själva bestämma när och hur de jobbar. Detta kräver tillit och tydliga förväntningar.',
      
      '3. **Skapa virtuella sociala rum**\nArbeta medvetet med att skapa informella mötesplatser. Det kan vara en virtuell fikapaus på fredagar, en kanal för småprat, eller digitala teamaktiviteter. Dessa "slumpmässiga" möten är viktiga för kreativitet och innovation.',
      
      '4. **Var synlig och närvarande**\nSom ledare måste du vara extra tydlig med din närvaro. Svara snabbt på meddelanden, håll kameran på i möten, och var proaktiv i din kommunikation. Ditt team behöver känna att du finns där för dem.',
      
      '5. **Investera i rätt verktyg**\nTeknik är inte allt, men den är grunden. Se till att teamet har bra utrustning hemma, tillgång till rätt samarbetsverktyg, och utbildning i hur de används. Ett dåligt headset kan förstöra ett viktigt möte.',
      
      'En ofta förbisedd aspekt av fjärrledarskap är att hantera olika arbetsstilar och preferenser. Vissa trivs med att jobba isolerat, medan andra saknar det sociala. Din uppgift som ledare är att skapa en flexibel miljö där alla kan prestera.',
      
      'Kom ihåg att fjärrarbete inte är tillfälligt längre - det är framtiden för många organisationer. De ledare som lär sig att leda effektivt på distans kommer att ha en stor fördel.',
      
      '**Reflektionsfrågor:**\n- Vilka av dessa principer tillämpar du redan?\n- Var finns den största utvecklingsmöjligheten för dig?\n- Hur kan du stärka relationen med varje teammedlem denna vecka?'
    ]
  },
  '2': {
    id: '2',
    title: 'Kraftfulla coachingfrågor',
    category: 'Coaching',
    readTime: '8 min',
    content: [
      'En bra coachingfråga öppnar dörrar. En dålig stänger dem. Skillnaden ligger inte bara i ordvalet, utan i intentionen bakom frågan.',
      
      'Som coach är din viktigaste verktyg inte dina råd eller din erfarenhet - det är din förmåga att ställa frågor som får klienten att tänka djupare.',
      
      '**Vad kännetecknar en kraftfull fråga?**',
      
      'En kraftfull coachingfråga är:\n- **Öppen** - Kan inte besvaras med ja eller nej\n- **Fokuserad på framtiden** - "Vad vill du?" istället för "Varför gjorde du?"\n- **Klientcentrerad** - Handlar om klientens perspektiv, inte ditt\n- **Utforskande** - Bjuder in till reflektion snarare än svar\n- **Energiskapande** - Skapar nyfikenhet och motivation',
      
      '**Exempel på kraftfulla coachingfrågor:**',
      
      '*För att utforska mål:*\n- Vad skulle framgång se ut för dig i denna situation?\n- Om du kunde vifta med en trollstav, hur skulle det ideala resultatet se ut?\n- Vad är verkligen viktigt för dig här?',
      
      '*För att skapa medvetenhet:*\n- Vad märker du när du reflekterar över detta?\n- Vilka alternativ ser du framför dig?\n- Vad säger din intuition?',
      
      '*För att stimulera handling:*\n- Vad är det minsta steget du kan ta idag?\n- Vad skulle göra störst skillnad just nu?\n- Hur vill du hålla dig ansvarig för detta?',
      
      '*För att fördjupa förståelse:*\n- Berätta mer om det...\n- Vad mer finns där?\n- Hur påverkar det dig?',
      
      '**Vanliga misstag att undvika:**',
      
      '1. **"Varför"-frågor som låter som anklagelser**\n"Varför gjorde du så?" kan få människor i försvar. Prova istället: "Vad var ditt resonemang när du valde den vägen?"',
      
      '2. **Ledande frågor**\n"Tycker du inte att du borde..." är inte en fråga, det är ett förklätt råd.',
      
      '3. **Flerfrågor**\n"Vad känner du och vad tänker du göra och när ska du börja?" - Ställ en fråga i taget.',
      
      '4. **För många frågor**\nIbland är tystnad den mest kraftfulla frågan. Ge klienten tid att tänka.',
      
      'Som coach utvecklar du din frågekompetens genom att:\n- Vara genuint nyfiken\n- Lyssna mer än du pratar\n- Våga ställa frågor du inte vet svaret på\n- Lita på att klienten har svaren inom sig',
      
      '**Övning:** Vid nästa coachingsamtal, räkna hur många gånger du ställer en fråga kontra ger ett råd. Sikta på att 80% ska vara frågor.'
    ]
  },
  '3': {
    id: '3',
    title: 'Bygga psykologisk trygghet',
    category: 'Teamutveckling',
    readTime: '15 min',
    content: [
      'Psykologisk trygghet är den viktigaste faktorn för högpresterande team. Det visar Googles Project Aristotle och Amy Edmondson forskning.',
      
      'Men vad betyder det egentligen? Psykologisk trygghet innebär att teammedlemmar känner sig trygga att ta risker, uttrycka åsikter, ställa frågor och göra misstag - utan rädsla för att bli förödmjukade eller bestraffade.',
      
      'Det handlar INTE om att vara "snäll" eller undvika tuff feedback. Det handlar om att skapa en miljö där människor vågar vara sårbara och autentiska.',
      
      '**Varför är det så viktigt?**',
      
      'Team med hög psykologisk trygghet:\n- Delar information öppet\n- Lär sig snabbare av misstag\n- Innoverar mer eftersom folk vågar testa idéer\n- Har bättre problemlösning genom diverse perspektiv\n- Behåller talang längre',
      
      '**Fem sätt att bygga psykologisk trygghet:**',
      
      '**1. Modellera sårbarhet**\nSom ledare, visa att det är okej att inte veta allt. Säg "Jag vet inte, vad tror du?" Erkänn när du har fel. Berätta om dina egna misstagoch vad du lärde dig.',
      
      '**2. Ställ inbjudande frågor**\n- "Vad ser jag inte här?"\n- "Vem har ett annat perspektiv?"\n- "Vad missar vi?"\n\nDessa frågor signalerar att olika åsikter är välkomna.',
      
      '**3. Hantera misstag konstruktivt**\nNär något går fel, fokusera på:\n- Vad hände? (fakta)\n- Vad kan vi lära oss?\n- Hur förhindrar vi detta framöver?\n\nINTE på: Vem gjorde fel? Varför var du så dum?',
      
      '**4. Uppmuntra konstruktiv konflikt**\nBra teams har sunda konflikter om idéer. Uppmuntra debatt, men ha tydliga regler:\n- Attackera idéer, inte personer\n- Lyssna för att förstå, inte för att svara\n- Sikta på bästa lösningen, inte att "vinna"',
      
      '**5. Fira lärande från misslyckanden**\nHa retrospektiver där ni öppet diskuterar vad som inte fungerade. Ge pris för "bästa misslyckande som ledde till lärande". Normalisera att experiment inte alltid lyckas.',
      
      '**Varningssignaler för låg psykologisk trygghet:**\n- Folk är tysta i möten\n- Ingen vågar utmana statusläget\n- Beslutsfattande tar mycket tid pga rädsla att välja fel\n- Folk döljer problem tills det är för sent\n- Teammedlemmar slutar',
      
      '**Så mäter du psykologisk trygghet:**',
      
      'Ställ dessa frågor anonymt till ditt team (1-5 skala):\n1. Om jag gör ett misstag i detta team, hålls det inte emot mig\n2. Medlemmar i detta team kan ta upp problem och svåra frågor\n3. Folk i detta team accepterar mig för den jag är\n4. Det är trygt att ta risker i detta team\n5. Jag kan be andra i teamet om hjälp\n6. Ingen i detta team skulle medvetet undergräva mina ansträngningar\n7. Mina unika färdigheter och talanger värderas och används',
      
      'Ett genomsnitt under 4 indikerar att ni har arbete att göra.',
      
      '**Kom ihåg:** Psykologisk trygghet byggs inte över natten. Det tar tid, konsistens och att du som ledare går före och visar vägen.'
    ]
  },
  '4': {
    id: '4',
    title: 'Feedback som förändrar',
    category: 'Kommunikation',
    readTime: '10 min',
    content: [
      'De flesta ledare ger för lite feedback. Och när de väl ger feedback, är den ofta vag eller defensiv. Men feedback är en av de mest kraftfulla verktygen för utveckling.',
      
      'Problemet är inte att feedback är svårt - det är att vi lärt oss fel metoder. Vi har fått höra att vi ska "smöra in" negativ feedback mellan positiv ("smörgåsmetoden"), eller att vi ska vara "konstruktiva" vilket ofta betyder att vi kryddar kritik med tomma komplimanger.',
      
      '**Vad är egentligen effektiv feedback?**',
      
      'Feedback som faktiskt leder till förändring har tre egenskaper:\n- Den är **specifik** och konkret\n- Den fokuserar på **beteende**, inte person\n- Den ger en **väg framåt**',
      
      '**COIN-modellen för feedback:**',
      
      '**C - Context** (Sammanhang)\nVar och när hände detta? Ge konkret kontext.\n"I gårdagens kundmöte..."',
      
      '**O - Observation** (Observation)\nVad såg/hörde du? Beskriv beteendet objektivt.\n"...la du fram tre olika förslag utan att först lyssna på kundens behov..."',
      
      '**I - Impact** (Påverkan)\nVilken effekt hade det? Beskriv konsekvenserna.\n"...vilket gjorde att kunden verkade förvirrad och mötet tog dubbelt så lång tid."',
      
      '**N - Next** (Nästa steg)\nVad vill du se framåt? Var specifik om önskat beteende.\n"Nästa gång, börja med att ställa frågor om kundens situation innan du presenterar lösningar."',
      
      '**Exempel på dålig vs bra feedback:**',
      
      '❌ Dålig: "Du är dålig på att kommunicera"\n✅ Bra: "I gårdagens projektmöte (C) skickade du uppdateringen via Slack istället för att informera teamet direkt (O), vilket gjorde att hälften missade informationen (I). Kan du nästa gång ta det i vårt dagliga standup så alla hör? (N)"',
      
      '❌ Dålig: "Bra jobbat, men..."\n✅ Bra: "Din presentation var välstrukturerad och datadrivn (O), vilket gjorde att styrelsen fattade beslut direkt (I). Nästa gång, inkludera också riskanalys i början (N)."',
      
      '**När ska du ge feedback?**',
      
      'Så snart som möjligt efter observationen. Feedback förlorar kraft med tiden. Men välj rätt tillfälle - inte när mottagaren är stressad eller när många kan höra.',
      
      '**Hur tar du emot feedback?**',
      
      'Som ledare måste du också kunna ta emot feedback. Här är hur:\n1. **Lyssna tyst** - Avbryt inte och försvara dig inte\n2. **Ställ klargörande frågor** - "Kan du ge ett exempel?"\n3. **Tacka** - Även om du inte håller med\n4. **Reflektera** - Finns det något sant i detta?\n5. **Agera** - Visa att du tagit det på allvar',
      
      '**Feedback-kultur:**',
      
      'I högpresterande team är feedback en gåva, inte en plikt. Så skapar du en sådan kultur:\n- Ge feedback regelbundet, både positiv och utvecklande\n- Be om feedback själv\n- Fira när folk ger svår feedback\n- Följ upp och visa att feedback leder till föränring',
      
      '**Övning för nästa vecka:**\nGe feedback till minst tre personer. Använd COIN-modellen. Skriv ner det först för att öva.'
    ]
  }
};

export default function ReadingArticlePage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const articleId = params.id as string;
  const article = readingArticles[articleId];

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
    } else {
      setUser(currentUser);
      setLoading(false);
    }
  }, [router]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(scrollPercentage, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <p className="text-stone-600">Laddar...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <p className="text-stone-900 mb-4">Artikeln hittades inte</p>
          <button
            onClick={() => router.push('/reading')}
            className="text-purple-600 hover:text-purple-700"
          >
            Tillbaka till läsmaterial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-stone-200 z-50">
        <div 
          className="h-full bg-purple-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <AppHeader 
        title={article.category}
        showBack
      />

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 text-sm text-stone-600 mb-3">
            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">
              {article.category}
            </span>
            <span>•</span>
            <span>{article.readTime} läsning</span>
          </div>
          <h1 className="text-3xl font-bold text-stone-900 mb-4">
            {article.title}
          </h1>
        </div>

        {/* Article Content */}
        <Card className="border-stone-200 bg-white">
          <CardContent className="pt-8 pb-8">
            <article className="prose prose-stone max-w-none">
              {article.content.map((paragraph, index) => {
                // Check if it's a heading
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h2 key={index} className="text-xl font-bold text-stone-900 mt-8 mb-4">
                      {paragraph.replace(/\*\*/g, '')}
                    </h2>
                  );
                }
                
                // Check if it's a list item
                if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                  return (
                    <p key={index} className="text-base text-stone-700 leading-relaxed mb-3 pl-4">
                      • {paragraph.substring(2)}
                    </p>
                  );
                }
                
                // Regular paragraph - handle bold within text
                const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={index} className="text-base text-stone-700 leading-relaxed mb-6">
                    {parts.map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="font-semibold text-stone-900">{part.replace(/\*\*/g, '')}</strong>;
                      }
                      return part;
                    })}
                  </p>
                );
              })}
            </article>
          </CardContent>
        </Card>

        {/* Completion Button */}
        <div className="mt-6">
          <button
            onClick={() => router.push('/reading')}
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            Markera som läst
          </button>
        </div>
      </div>

      <AppFooter />
    </div>
  );
}

