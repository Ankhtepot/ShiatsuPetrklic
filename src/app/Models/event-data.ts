export class EventData {
    public id: string = 'Unset ID';
    public titleCs: string = 'Unset Title';
    public descriptionCs: string = 'Unset Description';
    public date: Date = new Date();
    public location: string = 'Unset Location';
    public titleEn?: string = 'Unset Title';
    public descriptionEn?: string = 'Unset Description';
    public imageUrl?: string = undefined;
    public miniatureUrl?: string = undefined;
    public postEventTextCs?: string = undefined;
    public postEventTextEn?: string = undefined;
    public externalLink?: string = undefined;

    constructor(
        id: string,
        titleCs: string,
        titleEn: string,
        descriptionCs: string,
        descriptionEn: string,
        date: Date,
        location: string,
        imageUrl?: string,
        miniatureUrl?: string,
        postEventTextCs?: string,
        postEventTextEn?: string,
        externalLink?: string,
    ) {
        this.id = id;
        this.titleCs = titleCs;
        this.descriptionCs = descriptionCs;
        this.date = date;
        this.location = location;
        this.descriptionEn = descriptionEn;
        this.titleEn = titleEn;
        this.imageUrl = imageUrl;
        this.miniatureUrl = miniatureUrl;
        this.postEventTextCs = postEventTextCs;
        this.postEventTextEn = postEventTextEn;
        this.externalLink = externalLink;
    }
}
