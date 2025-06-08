import {QuoteData} from '../../Models/quote-data';

/* Template for testimonials
{
    csText: "CS text of the testimonial goes here.",
    enText: "English text of the testimonial goes here.",
    author: "Author Name",
    changeAfter: changeAfter,
    lengthBeforeEllipsis: lengthBeforeEllipsis,
    readWholeUrl: generateReadWholeUrl(1),
},
And Empty one:
{
    csText: "",
    enText: "",
    author: "",
    changeAfter: changeAfter,
    lengthBeforeEllipsis: lengthBeforeEllipsis,
    readWholeUrl: generateReadWholeUrl(1),
},
 */

const changeAfter = 70000;
const lengthBeforeEllipsis = 300;

function generateReadWholeUrl(authorId: number): string {
  return `/testimonials/${encodeURIComponent(authorId.toString())}`;
}

export const testimonials : QuoteData[] = [
  {
    csText: "Reakce klientky trpící od porodu bolestmi v páteři: Ahoj Petře, chci ti poděkovat za tvé schopnosti :) Bolest kostrče je pryč. Jen jednou od masáže se mi stalo, že když jsem seděla ve vlaku, cítila jsem mírnou bolest, ale bez problému jsem se zvedla. A od té doby nic. Mám klid. Moc diky!",
    enText: "",
    author: "Monika, 32 let",
    changeAfter: changeAfter,
    lengthBeforeEllipsis: lengthBeforeEllipsis,
    readWholeUrl: generateReadWholeUrl(1),
  },
  {
    csText: "Na shiatsu u Petra jsem byla poprvé na začátku srpna 2016 a od té doby chodím cca jednou za tři týdny. Pokaždé je to jiné. Někdy cítím po masáži klid, radost, uvolnění, méně těkající myšlenek, někdy naopak nepříjemné emoce (které se ale většinou druhý den vyčerpají a překlopí se to do stavu kdy je mi lépe než před masáží). U shiatsu jsem také poprvé byla schopná cítit proudění energie v těle. U Petra se cítím bezpečně a velmi oceňuji jeho naprostou přítomnost, pozornost, laskavost, vstřícnost co se týče termínů, inspirativní rozhovory, hezké prostředí pro masáže, a to že nemá žádný problém s tím když mám třeba zrovna záchvat smíchu nebo pláče, nebo prostě cokoliv (a tím pádem vím že si to mohu dovolit).\n" +
      "\n" +
      "Děkuji za všechno :-).",
    enText: "",
    author: "Miluše, 30 let",
    changeAfter: changeAfter,
    lengthBeforeEllipsis: lengthBeforeEllipsis,
    readWholeUrl: generateReadWholeUrl(2),
  },
  {
    csText: "S panem Závodným se znám od roku 2013 a to díky manželce, která mně zakoupila dárkový poukaz na shiatsu. Musím říci, že to bylo to nejlepší, co mě a mé chronické bolesti zad mohlo potkat.\n" +
      "\n" +
      "Po 2 letech pravidelných návštěv shiatsu, které vždycky moje záda daly dohromady, nastal další posun, který hodnotím jako přechod od pasivní role k aktivní a tou bylo cvičení jógy. Jelikož jsem zažil cvičení jógy v kolektivu lidí, tak můžu jen doporučit cvičení s panem Závodným, které (včetně shiatsu) je založeno na úplně jiném principu a tím je osobní přístup ke klientovi…jeho aktivní zájem o vaši osobu, rady, doporučení a profesionální přístup posunou vaše zdraví a dovednosti dále.\n" +
      "\n" +
      "Na stránkách pana Závodného jsem našel, že používá přezdívku Petr Klíč a mně se ihned vybaví klíč ke zdraví, takže všem, kteří chtějí být zdraví a plní energie doporučuji kombinaci jógy a shiatsu.",
    enText: "",
    author: "Michal Konečný",
    changeAfter: changeAfter,
    lengthBeforeEllipsis: lengthBeforeEllipsis,
    readWholeUrl: generateReadWholeUrl(3),
  },
  {
    csText: "Z dopisu se svolením klientky: Milý pane Petře, dnes jsem byla na kontrolním vyšetření po půl roce. Mimo jiné bylo zaměřeno na moji páteř a musím Vám sdělit, že proti minulému šetření jsou zde vidět velké změny k lepšímu. Přičítám to Vašim masážím, protože opravdu cítím velkou úlevu. Děkuji Vám a těším se na další masáž.",
    enText: "",
    author: "Anna, 68 let",
    changeAfter: changeAfter,
    lengthBeforeEllipsis: lengthBeforeEllipsis,
    readWholeUrl: generateReadWholeUrl(4),
  },
  {
    csText: "Z dopisu po ošetření dráhy ledvin: \"Ráda bych Ti dala zpětnou vazbu ke včerejsi masazi. Včera jsem to nijak moc necítila - jen velmi příjemné uvolnění po masáži, ovšem dnes.....dnes je den D......myslím tim, že mi to opravdu pomohlo.....a znovu nastartovalo takovou vnitřní radost, kterou jsem měla ztracenou....ráno jsem cvičila - báječné, a cítím se opět taková živá......to jsem včera necítila, takže velmi děkuji.\" (uveřejnění se souhlasem autorky).",
    enText: "",
    author: "Katka, učitelka jógy",
    changeAfter: changeAfter,
    lengthBeforeEllipsis: lengthBeforeEllipsis,
    readWholeUrl: generateReadWholeUrl(5),
  }
  ]
