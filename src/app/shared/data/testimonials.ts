import {QuoteData} from '../../Models/quote-data';

const changeAfter = 7000;
const lengthBeforeEllipsis = 300;

function generateFragment(authorId: number): string {
  return `testimonial-anchor-${authorId}`;
}

function createQuoteData(
  csText: string,
  enText: string,
  author: string,
  index: number
): QuoteData {
  return {
    csText: csText,
    enText: enText,
    author: author,
    changeAfter: changeAfter,
    lengthBeforeEllipsis: lengthBeforeEllipsis,
    testimonialsFragment: generateFragment(index),
  }
}

export function getTestimonials(): QuoteData[] {
  return [
    createQuoteData(
      "Reakce klientky trpící od porodu bolestmi v páteři: Ahoj Petře, chci ti poděkovat za tvé schopnosti :) Bolest kostrče je pryč. Jen jednou od masáže se mi stalo, že když jsem seděla ve vlaku, cítila jsem mírnou bolest, ale bez problému jsem se zvedla. A od té doby nic. Mám klid. Moc diky!",
      "Client's reaction suffering from back pain since childbirth: Hi Petr, I want to thank you for your abilities :) The pain in my tailbone is gone. Just once after the massage, I felt a slight pain while sitting on the train, but I managed to get up without any problem. And since then, nothing. I'm at peace. Thank you so much!",
      "Monika, 32 let", 1
    ),
    createQuoteData(
      "Na shiatsu u Petra jsem byla poprvé na začátku srpna 2016 a od té doby chodím cca jednou za tři týdny. Pokaždé je to jiné. Někdy cítím po masáži klid, radost, uvolnění, méně těkající myšlenek, někdy naopak nepříjemné emoce (které se ale většinou druhý den vyčerpají a překlopí se to do stavu kdy je mi lépe než před masáží). U shiatsu jsem také poprvé byla schopná cítit proudění energie v těle. U Petra se cítím bezpečně a velmi oceňuji jeho naprostou přítomnost, pozornost, laskavost, vstřícnost co se týče termínů, inspirativní rozhovory, hezké prostředí pro masáže, a to že nemá žádný problém s tím když mám třeba zrovna záchvat smíchu nebo pláče, nebo prostě cokoliv (a tím pádem vím že si to mohu dovolit).\n" +
      "\n" +
      "Děkuji za všechno :-).",
      "I first tried shiatsu with Petr at the beginning of August 2016, and since then I go approximately every three weeks. Every time is different. Sometimes I feel calm, joy, relaxation, fewer racing thoughts after the massage, sometimes on the contrary, unpleasant emotions (which usually dissipate the next day and turn into a state where I feel better than before the massage). With shiatsu, I was also able to feel the flow of energy in my body for the first time. With Petr, I feel safe and greatly appreciate his complete presence, attention, kindness, flexibility regarding appointments, inspiring conversations, a nice environment for massages, and that he has no problem when I have an attack of laughter or tears or just anything (and therefore I know I can allow myself that).\n" +
      "\n" +
      "Thank you for everything :-).",
      "Miluše, 30 let", 2),
    createQuoteData(
      "S panem Závodným se znám od roku 2013 a to díky manželce, která mně zakoupila dárkový poukaz na shiatsu. Musím říci, že to bylo to nejlepší, co mě a mé chronické bolesti zad mohlo potkat.\n" +
      "\n" +
      "Po 2 letech pravidelných návštěv shiatsu, které vždycky moje záda daly dohromady, nastal další posun, který hodnotím jako přechod od pasivní role k aktivní a tou bylo cvičení jógy. Jelikož jsem zažil cvičení jógy v kolektivu lidí, tak můžu jen doporučit cvičení s panem Závodným, které (včetně shiatsu) je založeno na úplně jiném principu a tím je osobní přístup ke klientovi…jeho aktivní zájem o vaši osobu, rady, doporučení a profesionální přístup posunou vaše zdraví a dovednosti dále.\n" +
      "\n" +
      "Na stránkách pana Závodného jsem našel, že používá přezdívku Petr Klíč a mně se ihned vybaví klíč ke zdraví, takže všem, kteří chtějí být zdraví a plní energie doporučuji kombinaci jógy a shiatsu.",
      "I have known Mr. Závodný since 2013, thanks to my wife who bought me a gift voucher for shiatsu. I must say that it was the best thing that could happen to me and my chronic back pain.\n" +
      "\n" +
      "After 2 years of regular shiatsu visits, which always put my back back together, there was another shift that I evaluate as a transition from a passive role to an active one, and that was yoga practice. Since I have experienced yoga practice in a group of people, I can only recommend practicing with Mr. Závodný, which (including shiatsu) is based on a completely different principle, and that is a personal approach to the client... his active interest in your person, advice, recommendations, and professional approach will move your health and skills further.\n" +
      "\n" +
      "On Mr. Závodný's website, I found that he uses the nickname Petr Klíč (Petr Key), and it immediately reminds me of the key to health, so I recommend the combination of yoga and shiatsu to everyone who wants to be healthy and full of energy.",
      "Michal Konečný", 3),
    createQuoteData(
      "Z dopisu se svolením klientky: Milý pane Petře, dnes jsem byla na kontrolním vyšetření po půl roce. Mimo jiné bylo zaměřeno na moji páteř a musím Vám sdělit, že proti minulému šetření jsou zde vidět velké změny k lepšímu. Přičítám to Vašim masážím, protože opravdu cítím velkou úlevu. Děkuji Vám a těším se na další masáž.",
      "From a letter with the client's permission: Dear Mr. Petr, today I had a follow-up examination after half a year. Among other things, it focused on my spine, and I must inform you that there are significant improvements compared to the previous examination. I attribute this to your massages, as I really feel a great relief. Thank you and I look forward to the next massage.",
      "Anna, 68 let", 4),
    createQuoteData(
      "Z dopisu po ošetření dráhy ledvin: \"Ráda bych Ti dala zpětnou vazbu ke včerejsi masazi. Včera jsem to nijak moc necítila - jen velmi příjemné uvolnění po masáži, ovšem dnes.....dnes je den D......myslím tim, že mi to opravdu pomohlo.....a znovu nastartovalo takovou vnitřní radost, kterou jsem měla ztracenou....ráno jsem cvičila - báječné, a cítím se opět taková živá......to jsem včera necítila, takže velmi děkuji.\" (uveřejnění se souhlasem autorky).",
      "From a letter after kidney meridian treatment: \"I would like to give you feedback on yesterday's massage. I didn't feel much yesterday - just a very pleasant relaxation after the massage, but today... today is the day D... I mean that it really helped me... and restarted an inner joy that I had lost... this morning I practiced - wonderful, and I feel alive again... I didn't feel that yesterday, so thank you very much.\" (published with the author's consent).",
      "Katka, učitelka jógy", 5),
    createQuoteData(
      "K Petrovi jsem poprvé přišla na podzim v roce 2011, kdy mi masáže shiatsu doporučil náš společný kamarád. Od té doby jsem absolvovala mnoho masáží a vždy odcházela uvolněná, s vyčištěnou hlavou a lehkým krokem, který mě až nadnášel :) Jen těžko lze stručně popsat, jaké účinky má na tělo i ducha pravidelná masáž. Petr má individuální přístup ke každému klientovi, je empatický, nezaujatý a umí nabídnout jiný pohled na problémy, což mi několikrát hodně pomohlo.\n" +
      "Rozhodně doporučuji nejen těm, kteří už zkusili \"všechno\" a nic nepomáhá ;)",
      "I first came to Petr in the fall of 2011, when a mutual friend recommended shiatsu massages to me. Since then, I have undergone many massages and always left relaxed, with a cleared mind and a light step that almost lifted me :) It is difficult to briefly describe the effects of regular massage on both body and spirit. Petr has an individual approach to each client, is empathetic, unbiased, and can offer a different perspective on problems, which has helped me several times.\n" +
      "I definitely recommend it not only to those who have already tried \"everything\" and nothing helps ;)",
      "Iveta Kučerová, na mateřské", 6),
    createQuoteData(
      "Jsem klientkou Petra Závodného po dobu více jak roku a dostávám Shiatsu přibližně každé 2 týdny.\n" +
      " Trpím chronickou, neurologickou nemocí a čas od času mám rovněž menší potíže jako bolesti v zádech, zažívací problémy, nebo chřipku. Tyto problémy ale mizí velmi rychle a i s mou chronickou kondicí se cítím díky Shiatsu velmi podporována. Nemohu říci, co mi přesně pomáhá, ale cítím se tak nějak \"závislá\" na pravidelných ošetřeních :) Mohu díky nim relaxovat a také cítím, že dělám něco dobrého pro své tělo.\n" +
      " Petr bere svoji práci velmi seriozně. I když mám někdy bolesti v průběhu ošetření, nebo se dostávám do silných procesů, tak se cítím bezpečně a ošetřována s velkou péčí. Myslím, že má dobré cítění pro to, co je v daný moment pro klienta důležité.\n" +
      " Také (Petr) dokáže vytvořit útulný a bezpečný prostor ve svém salonu, či kdekoli, kde provádí ošetření.\n" +
      " Jsem moc ráda, že mám možnost dostávat pravidelná ošetření od Petra, je skvělý masér.\n" +
      " Katharina",
      "I am Petr Zavodny's client since more then a year and get shiatsu treatment all two weeks.\n" +
      " I have a chronic neurological disease and also from time to time some little problems like back-pain, problems with digestion or a flue. This little problems vanish very quick, and with my chronic disease i feel well supported by shiatsu. I can not say what exactly is helping me, but \n" +
      "I feel somehow \"addicted\" to get regular treatments :-) They relax me, and I feel I get something good for my body.\n" +
      " Petr takes his work very seriously. Even I have sometimes pain during treatment or come into strong processes I feel safe and treated with much care. I think he has a good feeling for what is important at the moment for the client.\n" +
      " He also provides a cozy and safe place in his salon or wherever he does the treatment.\n" +
      "I am happy I have the opportunity to get regular shiatsu by Petr, he is great masseur.\n" +
      "Katharina",
      "Dr. med. Katharina Kratochwil", 7),
    createQuoteData(
      "Jsem moc ráda, že jsem se po porodu ze všech možných masážích rozhodla právě pro shiatsu, přesněji pro shiatsu od Petra. Petr je velmi milý, empatický a šikovný člověk a je na něm vidět, že práce ho opravdu baví. O shiatsu jsem do té doby nevěděla téměř nic a opravdu mě překvapilo, jak komplexně tato masáž dokáže člověka řešit, doslova harmonizuje tělo i duši a přesně to jsem po ne zrovna bezproblémovém porodu potřebovala.\n" +
      "   Během roku jsem absolvovala poměrně intenzivní řadu masáží. Bezprostředně po nich jsem se cítila vždycky neuvěřitelně osvěžená, jak fyzicky, tak psychicky a z dlouhodobého hlediska vnímám výrazné zlepšení původních potíží. Navíc je skvělé, že mi Petr vždycky vyjde vstříc s termínem, s mimčem to někdy není jednoduché. A když je potřeba, můžu jej vzít i s sebou; Petr upraví místnost tak, aby pro něj byla bezpečná. Super je taky poloviční cena pro maminy na mateřské. Za sebe tedy velice doporučuji.",
      "I am very glad that after giving birth I chose shiatsu, more precisely shiatsu by Petr. Petr is a very nice, empathetic and skilled person and it is obvious that he really enjoys his work. I knew almost nothing about shiatsu before and I was really surprised how comprehensively this massage can address a person, literally harmonizing body and soul, which is exactly what I needed after a not-so-problem-free birth.\n" +
      "   Over the year, I underwent a fairly intensive series of massages. Immediately after them, I always felt incredibly refreshed, both physically and mentally, and in the long term, I perceive a significant improvement in my original problems. Moreover, it is great that Petr always accommodates me with the schedule, as it is sometimes not easy with a baby. And when necessary, I can take him with me; Petr adjusts the room to make it safe for him. It is also great that there is a half-price for mothers on maternity leave. So I highly recommend it.",
      "Monika Jánská, na mateřské", 8),
    createQuoteData(
      "Opatrně jsem vyčkala, ale teď VÁM musím říct, že se mi tak ulevilo, že se zase můžu radovat z veškerenstva... Díky :)",
      "I waited cautiously, but now I must tell you that I feel so relieved that I can enjoy everything again... Thank you :)",
      "Lenka, Vedoucí obchodu", 9),
    createQuoteData(
      "Ahoj Petre, zdravim z odpocinkove-pracovniho pobytu v Kanade. Byl jsem u tebe nekolikrat na shiatsu masazi a musim ti jeste jednou podekovat za ulevu od bolesti, kterou jsi mi \"zaridil\". A diky prijemnym rozhovorum jsem si take doufam poopravil svuj pohled na svet :)",
      "Hi Petr, greetings from a relaxing-working stay in Canada. I was at your place several times for shiatsu massage and I must thank you once again for the relief from pain that you \"arranged\" for me. And thanks to the pleasant conversations, I hope I also improved my view of the world :)",
      "Petr P.", 10),
    createQuoteData(
      "K Petrovi chodím pravidelně již několikátý měsíc. Je 100% profesionalní, respektuje hranice a přizpůsobuje se momentální potřebě klienta. Pomáhá mi pracovat s letitými tělesnými problémy, bloky a obecně zlepšit můj vztah a spojení s fyzickým tělem, což je penězi nevyčíslitelná služba. Jeho masáže, jejichž cena je i v dnešní době velice přátelská, s čistým srdcem doporučuji.",
      "I have been going to Petr regularly for several months now. He is 100% professional, respects boundaries, and adapts to the client's current needs. He helps me work with long-standing physical problems, blocks, and generally improve my relationship and connection with my physical body, which is an invaluable service. I wholeheartedly recommend his massages, which are also very reasonably priced in today's times.",
      "MgA. Lada Knápková", 11),
    createQuoteData(
      "Petr je člověk,který neustále rozvíjí své kvality a jeho energetické pole je velmi silné, což jsem pocítila už při první masáži. Byla velmi nabíjející a přitom jsem se cítila uvolněná a zrelaxovaná. S dalšími masážemi přibýval i dlouhotrvající účinek na imunitní systém, protistresový a čistící. Navíc mi vždy vyhověl v mých požadavcích, kdy jsme např. jednu masáž zaměřili na čištění ledvin nebo třeba odblokování krku. Mám z jeho práce velmi příjemný pocit a všem ho můžu s radostí dopručit.",
      "Petr is a person who constantly develops his qualities and his energy field is very strong, which I felt already during the first massage. It was very energizing, yet I felt relaxed and rejuvenated. With subsequent massages, the long-lasting effect on the immune system, stress relief, and detoxification increased. Moreover, he always accommodated my requests, such as focusing one massage on kidney cleansing or neck unblocking. I have a very pleasant feeling from his work and I can happily recommend him to everyone.",
      "Radka Svobodová", 12),
    createQuoteData(
      "K Petrovi chodím na masáž pravidelně a vždy se jedná o příjemný zážitek. Je citlivý k mým potřebám dokáže navodit uvolněnou a přátelskou atmosféru. Při první návštěvě mi vysvětlil, odkud Shiatsu pochází a na jakém principu pracuje. Při každé návštěvě se mě ptá jak se mám, jak na mě působila minulá masáž a vidím u něj opravdový zájem o klienta a jeho problémy. Mám pocit, že se snaží pochopit člověka a nebrat klienty jak na běžícím páse, ale na každého si opravdu vytvořit čas a potřebný prostor. Vždycky od něj odcházím v lepší náladě, šťastná, cítím jak energie proudí celým mým tělem a je mi skvěle J",
      "I go to Petr for a massage regularly and it is always a pleasant experience. He is sensitive to my needs and can create a relaxed and friendly atmosphere. During the first visit, he explained where Shiatsu comes from and how it works. At each visit, he asks me how I am doing, how the previous massage affected me, and I see a genuine interest in the client and their problems. I feel that he tries to understand the person and not treat clients like on an assembly line, but really takes the time and space needed for each individual. I always leave him in a better mood, happy, feeling the energy flowing through my body, and feeling great :)",
      "Ivana Černá, administrativní pracovnice", 13),
    createQuoteData(
      "Prva masaz u Petra. Vsetko bolo na zaciatku vysvetlene. Zamer mal byt o rozvinuti a uktoveni muzskej energie/sily. Masaz skvela, zazil som az \"nadprirodzene\" stavy, ktore je tazko popisat, po masazi prislo uvolnenie a plac, plac s pocitom stastia, ze nieco dobre sa udialo. Citim sa pevnejsi, ak treba podrzat manzelku, alebo odvaha komunikovat otvorene s pokojom a laskou ako muz pre zenu. Citim, ze je na com pracovat a verim, ze to nebola posledna masaz. Dakujem",
      "My first massage with Peter. Everything was explained at the beginning. The focus was on the development and grounding of masculine energy/strength. The massage was excellent; I experienced almost 'supernatural' states that are hard to describe. Afterwards there was release and tears—tears accompanied by a feeling of happiness that something positive had happened. I feel stronger, more able to support my wife when needed, or to communicate openly with calm and love, as a man to a woman. I see there is still work to do and I believe this was not my last massage. Thank you.",
      "Peter Biely, programator", 14),
  ]
}
