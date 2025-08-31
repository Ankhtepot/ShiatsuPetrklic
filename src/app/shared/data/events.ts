import {EventData} from '../../Models/event-data';
import {ContentItem, ContentItemHyperlink, ContentItemText, EContentItem} from '../../Models/content-item';

function createEventData(
  eventId: string,
  titleCs: string,
  descriptionCs: string,
  date: Date,
  location: string,
  titleEn?: string,
  descriptionEn?: string,
  imageUrl?: string,
  miniatureUrl?: string,
  postEventTextCs?: string,
  postEventTextEn?: string,
  contentItems?: ContentItem[],
): EventData {

  if (!imageUrl) {
    imageUrl = 'images/no-image.png';
  }

  if (!miniatureUrl) {
    miniatureUrl = 'images/no-image.png';
  }

  return {
    date: date,
    id: eventId,
    titleCs: titleCs,
    descriptionCs: descriptionCs,
    location: location,
    titleEn: titleEn,
    descriptionEn: descriptionEn,
    imageUrl: imageUrl,
    miniatureUrl: miniatureUrl,
    postEventTextCs: postEventTextCs,
    postEventTextEn: postEventTextEn,
    contentItems: contentItems,
  }
}

export function getEvents(): EventData[] {
  return [
    createEventData(
      'TV-1',
      'Tantrický Večer',
      'Tato akce je zaměřená na vědomé setkávání a lidské propojení v bezpečném a respektujícím prostoru. Nabízí příležitost vnímat blízkost, dotek a intimitu s důrazem na vlastní hranice a svobodu projevu.\n' +
      '\n' +
      'Nejedná se o workshop ani výuku, ale o otevřený večer, kde každý může být sám sebou a zvolit si svou míru zapojení. Důležitá je důvěra, autenticita a respekt – nic není povinné, nic se neočekává. Jen prostor pro skutečné lidské spojení.',
      new Date('2025-03-06T19:00:00'),
      'Bad Reputation Studio, Brno, Česká republika',
      undefined,
      undefined,
      'images/events/tantric_circle.webp',
      'images/events/miniatures/tantric_circle.webp',
      'Večer proběhl v příjemné atmosféře, účastníci si užili blízkost a doteky v bezpečném prostředí. Bylo to skvělé setkání plné důvěry a respektu.',
      undefined,
      undefined,
    ),
    createEventData(
      'TV-2',
      'Tantrický Večer',
      'Tato akce je zaměřená na vědomé setkávání a lidské propojení v bezpečném a respektujícím prostoru. Nabízí příležitost vnímat blízkost, dotek a intimitu s důrazem na vlastní hranice a svobodu projevu.\n' +
      '\n' +
      'Nejedná se o workshop ani výuku, ale o otevřený večer, kde každý může být sám sebou a zvolit si svou míru zapojení. Důležitá je důvěra, autenticita a respekt – nic není povinné, nic se neočekává. Jen prostor pro skutečné lidské spojení.',
      new Date('2025-05-29T19:00:00'),
      'Bad Reputation Studio, Brno, Česká republika',
      undefined,
      undefined,
      'images/events/tantric_circle.webp',
      'images/events/miniatures/tantric_circle.webp',
      'Večer proběhl v příjemné atmosféře, účastníci si užili blízkost a doteky v bezpečném prostředí. Bylo to skvělé setkání plné důvěry a respektu.',
      undefined,
      undefined,
    ),
    createEventData(
      'TV-3',
      'Tantrický Večer',
      'Tato akce je zaměřená na vědomé setkávání a lidské propojení v bezpečném a respektujícím prostoru. Nabízí příležitost vnímat blízkost, dotek a intimitu s důrazem na vlastní hranice a svobodu projevu.\n' +
      '\n' +
      'Nejedná se o workshop ani výuku, ale o otevřený večer, kde každý může být sám sebou a zvolit si svou míru zapojení. Důležitá je důvěra, autenticita a respekt – nic není povinné, nic se neočekává. Jen prostor pro skutečné lidské spojení.',
      new Date('2025-07-10T19:00:00'),
      'Bad Reputation Studio, Brno, Česká republika',
      undefined,
      undefined,
      'images/events/tantric_circle.webp',
      'images/events/miniatures/tantric_circle.webp',
      'Večer proběhl v příjemné atmosféře, účastníci si užili blízkost a doteky v bezpečném prostředí. Bylo to skvělé setkání plné důvěry a respektu.',
      undefined,
      undefined,
    ),
    createEventData(
      'TV-4',
      'Tantrický Večer',
      'Tato akce je zaměřená na vědomé setkávání a lidské propojení v bezpečném a respektujícím prostoru. Nabízí příležitost vnímat blízkost, dotek a intimitu s důrazem na vlastní hranice a svobodu projevu.\n' +
      '\n' +
      'Nejedná se o workshop ani výuku, ale o otevřený večer, kde každý může být sám sebou a zvolit si svou míru zapojení. Důležitá je důvěra, autenticita a respekt – nic není povinné, nic se neočekává. Jen prostor pro skutečné lidské spojení.',
      new Date('2025-09-11T19:00:00'),
      'Bad Reputation Studio, Brno, Česká republika',
      undefined,
      undefined,
      'images/events/tantric_circle.webp',
      'images/events/miniatures/tantric_circle.webp',
      undefined,
      undefined,
      [{
        contentType: EContentItem.Hyperlink,
        textCs: 'Přihlášky a více informací v odkazu:',
        textEn: undefined,
        url: `https://badreputation.cz/akce/info/tantricke-setkani-638`,
        urlTextCs: 'Tantrický Večer - Bad Reputation Studio',
      } as ContentItemText],
    ),
    createEventData(
      'ST-1',
      'UBU Camp!',
      'Přijďte si užít Shiatsu masáže přímo na UBU Campu v Kempu Dobršín! Nabízím relaxační a terapeutické Shiatsu masáže, které vám pomohou uvolnit napětí, zlepšit prokrvení a celkově posílit vaše zdraví.\n',
      new Date('2025-07-25T15:00:00'),
      'Kemp Dobršín, Jižní Čechy, Česká republika',
      undefined,
      undefined,
      'images/events/tent_massage.webp',
      'images/events/miniatures/tent_massage.webp',
      'UBU Camp 2025 se vydařil, několika účastníkům jsem poskytl ošetření Shiatsu a poznal tak opět nové báječné lidi. Bylo to skvělé setkání plné relaxace, výborné hudby a dobré nálady.',
      undefined,
      [{
        contentType: EContentItem.Hyperlink,
        url: 'https://www.kulturniraselina.cz/projekty/ubucamp',
        labelCs: 'O UBU Campu se dozvíte více na stránkách Kulturní Rašeliny: ',
        labelEn: undefined,
        urlTextCs: 'UBU Camp 2025',
        urlTextEn: undefined,
      } as ContentItemHyperlink],
    ),
    createEventData(
      'DD-2', // Dotek Dutek
      'Dotek Důtek - cesta k citlivosti',
      'Chybí ti pocit bezpečí v doteku?\n' +
      'Chceš objevit nové způsoby jak vnímat sám/sama sebe i blízkost?\n' +
      'Cítíš, že tvé tělo potřebuje obejmutí, ale bojíš se pustit si k sobě ostatní lidi?\n' +
      'Přeješ si zažít péči bez očekávání, že něco nějak bude a následného zklamání že to tak nebylo?\n' +
      'Hledáš laskavost tam, kde byla bolest?\n' +
      'Možná vnímáte důtky jako nástroj bolesti, nebo minimálně jako něco tvrdého a drsného. Rád bych vám ukázal, že mohou být i nástrojem jemnosti, pozornosti, a péče.\n' +
      '\n' +
      'Během tohoto jednodenního setkání si vyzkoušíme, jak lze důtky použít k tomu, abychom si byli skutečně blízko, vnímali tělo i pocity druhého a zároveň sami sebe. Naučíme se zpomalit, vnímat každý pohyb rukou i důtkami, a nechat tělo a mysl postupně se uvolnit a otevřít důvěře.\n' +
      '\n' +
      'Nečekej žádné předvádění nebo tlak. Spíš budeme společně objevovat, jakou sílu může mít jemný dotek – jak dokáže navodit pocit bezpečí, rozproudit v těle energii, a přivést nás do hlubšího spojení s přítomným okamžikem.',
      new Date('2025-09-27T10:00:00'),
      'Bad Reputation Studio, Brno, Česká republika',
      undefined,
      undefined,
      'images/events/FloggersHearth.webp',
      'images/events/miniatures/FloggersHearth.webp',
      undefined,
      undefined,
      [
        {
          contentType: EContentItem.Text,
          textCs: 'Více informací o akci a přihlášky najdete na stránkách Studia Bad Reputation.',
          textEn: undefined,
        } as ContentItemText,
        {
          contentType: EContentItem.Hyperlink,
          url: 'https://badreputation.cz/akce/info/workshop-dotek-dutek',
          labelCs: 'Bad Reputation Studio',
          labelEn: undefined,
          urlTextCs: 'Dotek Důtek - Bad Reputation Studio',
          urlTextEn: undefined,
        } as ContentItemHyperlink],
    )
  ]
}
