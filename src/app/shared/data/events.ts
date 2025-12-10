import {EventData} from '../models/event-data';
import {ContentItemHyperlink, ContentItemText, EContentItem} from '../models/content-item';

export function getEvents(): EventData[] {
  return events;
}

export const getEventById = (id: string): EventData | undefined =>{
  return events.find(event => event.id === id);
}

const events: EventData[] = [
  {
    id: 'TV-1',
    titleCs: 'Tantrický Večer',
    descriptionCs: 'Tato akce je zaměřená na vědomé setkávání a lidské propojení v bezpečném a respektujícím prostoru. Nabízí příležitost vnímat blízkost, dotek a intimitu s důrazem na vlastní hranice a svobodu projevu.\n' +
      '\n' +
      'Nejedná se o workshop ani výuku, ale o otevřený večer, kde každý může být sám sebou a zvolit si svou míru zapojení. Důležitá je důvěra, autenticita a respekt – nic není povinné, nic se neočekává. Jen prostor pro skutečné lidské spojení.',
    date: new Date('2025-03-06T19:00:00'),
    location: 'Bad Reputation Studio, Brno, Česká republika',
    titleEn: '',
    descriptionEn: '',
    imageUrl: 'images/events/tantric_circle.webp',
    miniatureUrl: 'images/events/miniatures/tantric_circle.webp',
    postEventTextCs: 'Večer proběhl v příjemné atmosféře, účastníci si užili blízkost a doteky v bezpečném prostředí. Bylo to skvělé setkání plné důvěry a respektu.',
    postEventTextEn: undefined,
    contentItems: [],
    showsMarkdown: false,
    markdownCZContentPath: '',
    markdownENContentPath: '',
  },
  {
    id: 'TV-2',
    titleCs: 'Tantrický Večer',
    descriptionCs: 'Tato akce je zaměřená na vědomé setkávání a lidské propojení v bezpečném a respektujícím prostoru. Nabízí příležitost vnímat blízkost, dotek a intimitu s důrazem na vlastní hranice a svobodu projevu.\n' +
      '\n' +
      'Nejedná se o workshop ani výuku, ale o otevřený večer, kde každý může být sám sebou a zvolit si svou míru zapojení. Důležitá je důvěra, autenticita a respekt – nic není povinné, nic se neočekává. Jen prostor pro skutečné lidské spojení.',
    date: new Date('2025-05-29T19:00:00'),
    location: 'Bad Reputation Studio, Brno, Česká republika',
    titleEn: '',
    descriptionEn: '',
    imageUrl: 'images/events/tantric_circle.webp',
    miniatureUrl: 'images/events/miniatures/tantric_circle.webp',
    postEventTextCs: 'Večer proběhl v příjemné atmosféře, účastníci si užili blízkost a doteky v bezpečném prostředí. Bylo to skvělé setkání plné důvěry a respektu.',
    postEventTextEn: undefined,
    contentItems: [],
    showsMarkdown: false,
    markdownCZContentPath: '',
    markdownENContentPath: '',
  },
  {
    id: 'TV-3',
    titleCs: 'Tantrický Večer',
    descriptionCs: 'Tato akce je zaměřená na vědomé setkávání a lidské propojení v bezpečném a respektujícím prostoru. Nabízí příležitost vnímat blízkost, dotek a intimitu s důrazem na vlastní hranice a svobodu projevu.\n' +
      '\n' +
      'Nejedná se o workshop ani výuku, ale o otevřený večer, kde každý může být sám sebou a zvolit si svou míru zapojení. Důležitá je důvěra, autenticita a respekt – nic není povinné, nic se neočekává. Jen prostor pro skutečné lidské spojení.',
    date: new Date('2025-07-10T19:00:00'),
    location: 'Bad Reputation Studio, Brno, Česká republika',
    titleEn: '',
    descriptionEn: '',
    imageUrl: 'images/events/tantric_circle.webp',
    miniatureUrl: 'images/events/miniatures/tantric_circle.webp',
    postEventTextCs: 'Večer proběhl v příjemné atmosféře, účastníci si užili blízkost a doteky v bezpečném prostředí. Bylo to skvělé setkání plné důvěry a respektu.',
    postEventTextEn: undefined,
    contentItems: [],
    showsMarkdown: false,
    markdownCZContentPath: '',
    markdownENContentPath: '',
  },
  {
    id: 'ST-1',
    titleCs: 'UBU Camp!',
    descriptionCs: 'Přijďte si užít Shiatsu masáže přímo na UBU Campu v Kempu Dobršín! Nabízím relaxační a terapeutické Shiatsu masáže, které vám pomohou uvolnit napětí, zlepšit prokrvení a celkově posílit vaše zdraví.\n',
    date: new Date('2025-07-25T15:00:00'),
    location: 'Kemp Dobršín, Jižní Čechy, Česká republika',
    titleEn: '',
    descriptionEn: '',
    imageUrl: 'images/events/tent_massage.webp',
    miniatureUrl: 'images/events/miniatures/tent_massage.webp',
    postEventTextCs: 'UBU Camp 2025 se vydařil, několika účastníkům jsem poskytl ošetření Shiatsu a poznal tak opět nové báječné lidi. Bylo to skvělé setkání plné relaxace, výborné hudby a dobré nálady.',
    postEventTextEn: undefined,
    contentItems: [
      {
        contentType: EContentItem.Hyperlink,
        url: 'https://www.kulturniraselina.cz/projekty/ubucamp',
        labelCs: 'O UBU Campu se dozvíte více na stránkách Kulturní Rašeliny: ',
        labelEn: undefined,
        urlTextCs: 'UBU Camp 2025',
        urlTextEn: undefined,
      } as ContentItemHyperlink,
    ],
    showsMarkdown: false,
    markdownCZContentPath: '',
    markdownENContentPath: '',
  },
  {
    id: 'DD-2',
    titleCs: 'Dotek Důtek - cesta k citlivosti',
    descriptionCs: 'Chybí ti pocit bezpečí v doteku?\n' +
      'Chceš objevit nové způsoby jak vnímat sám/sama sebe i blízkost?\n' +
      'Cítíš, že tvé tělo potřebuje obejmutí, ale bojíš se pustit si k sobě ostatní lidi?\n' +
      'Přeješ si zažít péči bez očekávání, že něco nějak bude a následného zklamání že to tak nebylo?\n' +
      'Hledáš laskavost tam, kde byla bolest?\n' +
      'Možná vnímáte důtky jako nástroj bolesti, nebo minimálně jako něco tvrdého a drsného. Rád bych vám ukázal, že mohou být i nástrojem jemnosti, pozornosti, a péče.\n' +
      '\n' +
      'Během tohoto jednodenního setkání si vyzkoušíme, jak lze důtky použít k tomu, abychom si byli skutečně blízko, vnímali tělo i pocity druhého a zároveň sami sebe. Naučíme se zpomalit, vnímat každý pohyb rukou i důtkami, a nechat tělo a mysl postupně se uvolnit a otevřít důvěře.\n' +
      '\n' +
      'Nečekej žádné předvádění nebo tlak. Spíš budeme společně objevovat, jakou sílu může mít jemný dotek – jak dokáže navodit pocit bezpečí, rozproudit v těle energii, a přivést nás do hlubšího spojení s přítomným okamžikem.',
    date: new Date('2025-09-27T10:00:00'),
    location: 'Bad Reputation Studio, Brno, Česká republika',
    titleEn: '',
    descriptionEn: '',
    imageUrl: 'images/events/FloggersHearth.webp',
    miniatureUrl: 'images/events/miniatures/FloggersHearth.webp',
    postEventTextCs: undefined,
    postEventTextEn: undefined,
    contentItems: [
      {
        contentType: EContentItem.Text,
        textCs: 'Více informací o akci a přihlášky najdete na stránkách Studia Bad Reputation.',
        textEn: undefined,
      } as ContentItemText,
      {
        contentType: EContentItem.Hyperlink,
        url: 'https://badreputation.cz/akce/info/workshop-dotek-dutek',
        labelCs: 'Klikněte na odkaz níže pro více informací a přihlášení:',
        labelEn: undefined,
        urlTextCs: 'Dotek Důtek - Bad Reputation Studio',
        urlTextEn: undefined,
      } as ContentItemHyperlink,
    ],
    showsMarkdown: false,
    markdownCZContentPath: '',
    markdownENContentPath: '',
  },
  {
    id: 'RS-1',
    titleCs: 'Vědomá Smyslnost a moudrost Těla',
    titleEn: 'Conscious Sensuality and Body Wisdom',
    date: new Date('2026-03-17T10:00:00'),
    descriptionCs: 'Robert Silber z Hawaie zavítá po letech opět do České Republiky! Srdečně vás zvu na retreat tohoto vynikajícího Havajského učitele a slovenské průvodkyně Katiky Kai.',
    descriptionEn: 'Robert Silber from Hawaii is returning to the Czech Republic after many years! You are warmly invited to a retreat with this excellent Hawaiian teacher and the Slovak guide Katika Kai.',
    showsMarkdown: true,
    markdownCZContentPath: '/markdown/RobertSilber2026_03CS.md',
    markdownENContentPath: '/markdown/RobertSilber2026_03EN.md',
    imageUrl: 'images/events/tantric_couple_outside.webp',
    miniatureUrl: 'images/events/miniatures/tantric_couple_outside.webp',
  },
  {
    id: 'Pezinok-1',
    date: new Date('2025-12-05T18:00:00'),
    titleCs: "Vedomý dotyk - tantrický večer",
    descriptionCs: 'Objav silu vedomého dotyku, intimity a prítomnosti.\n' +
      'Tantrický večer je priestorom pre stretnutia, zdieľanie a kultivovanie energie, ktorá v nás prebúdza jemnosť, radosť aj zmyselnosť.\n' +
      '\n' +
      'Nebude to workshop, ale večer v bezpečnom priestore, kde môžeš byť sám/sama sebou a prepojiť sa s ostatnými. Každý si určuje svoje hranice, všetko prebieha s úctou, dôverou a rešpektom, kde každý môže byť v tej hĺbke, na akú sa cíti. \n' +
      'Priebeh večera bude pod lektorským vedením Petra Závodného.\n' +
      'Vítaní sú všetci – bez ohľadu na skúsenosti, vek či pohlavie.\n',
    showsMarkdown: true,
    markdownCZContentPath: '/markdown/VedomyDotykPezinok.md',
    imageUrl: 'images/events/VedomyDotykPezinok.jpg',
    miniatureUrl: 'images/events/VedomyDotykPezinok.jpg',
    postEventTextCs: 'Večer proběhl v příjemné atmosféře, účastníci si užili blízkost a doteky v bezpečném prostředí. Bylo to krásné setkání plné důvěry a respektu.',
  }
];
