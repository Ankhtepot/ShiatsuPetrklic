import {EventData} from '../../Models/event-data';

function createQuoteData(
  eventId: string,
  titleCs: string,
  titleEn: string,
  descriptionCs: string,
  descriptionEn: string,
  date: Date,
  location: string,
  imageUrl?: string,
  miniatureUrl?: string
): EventData {
  return {
    date: date,
    id: eventId,
    titleCs: titleCs,
    titleEn: titleEn,
    descriptionCs: descriptionCs,
    descriptionEn: descriptionEn,
    location: location,
    imageUrl: imageUrl,
    miniatureUrl: miniatureUrl
  }
}

export function getEvents(): EventData[] {
  return [

  ]
}
