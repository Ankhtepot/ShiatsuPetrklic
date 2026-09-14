export enum EContentItem {
  Hyperlink = 'Hyperlink',
  Text = 'Text',
  // Gallery = 'Gallery',
  // Video = 'Video',
  // Audio = 'Audio',
  // File = 'File',
  // CodeSnippet = 'CodeSnippet'
}

export interface ContentItem {
  contentType: EContentItem;
}

export class ContentItemHyperlink implements ContentItem {
  contentType: EContentItem = EContentItem.Hyperlink;
  url: string = '';
  labelCs: string = '';
  labelEn?: string = undefined;
  urlTextCs: string = 'link';
  urlTextEn?: string = undefined;
}

export class ContentItemText implements ContentItem {
  contentType: EContentItem = EContentItem.Text;
  textCs: string = '';
  textEn?: string = undefined;
}
