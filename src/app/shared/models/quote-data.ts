export interface QuoteData {
  csText: string;
  enText: string;
  author: string;
  changeAfter?: number;
  lengthBeforeEllipsis?: number;
  testimonialsFragment?: string;
}

export const INVALID_QUOTE: QuoteData = {
  author: 'Shiatsu Petrklic',
  csText: 'Nastala chybička, tato událost neumí zobrazit své detailní informace.',
  enText: 'Mistakes were made, this event failed to show its detail.'
}
