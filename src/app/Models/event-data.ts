import { ContentItem } from './content-item';

export class EventData {
    public id: string = 'Unset ID';
    public date: Date = new Date();
    public titleCs: string = 'Unset Title';
    public location?: string = 'Unset Location';
    public descriptionCs?: string = 'Unset Description';
    public titleEn?: string = 'Unset Title';
    public descriptionEn?: string = 'Unset Description';
    public imageUrl?: string;
    public miniatureUrl?: string;
    public postEventTextCs?: string;
    public postEventTextEn?: string;
    public contentItems?: ContentItem[] = [];
    public showsMarkdown?: boolean = false;
    public markdownCZContentPath?: string;
    public markdownENContentPath?: string;
}
