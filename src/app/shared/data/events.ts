import {EventData} from '../../Models/event-data';

function createQuoteData(
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
  externalLink?: string,
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
    externalLink: externalLink,
  }
}

export function getEvents(): EventData[] {
  return [
   createQuoteData(
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
    createQuoteData(
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
    createQuoteData(
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
    createQuoteData(
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
      undefined,
    ),
    createQuoteData(
      'ST-1',
      'UBU Camp!',
      'Přijďte si užít Shiatsu masáže přímo na UBU Campu v Kempu Dobršín! Nabízím relaxační a terapeutické Shiatsu masáže, které vám pomohou uvolnit napětí, zlepšit prokrvení a celkově posílit vaše zdraví.\n',
      new Date('2025-07-25T15:00:00'),
      'Kemp Dobršín, Jižní Čechy, Česká republika',
      undefined,
      undefined,
      'images/events/tent_massage.webp',
      'images/events/miniatures/tent_massage.webp',
      undefined,
      undefined,
      'https://www.kulturniraselina.cz/projekty/ubucamp',
    )
  ]
}
