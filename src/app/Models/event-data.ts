export class EventData {
    public id: string = 'Unset ID';
    public titleCs: string = 'Unset Title';
    public titleEn: string = 'Unset Title';
    public descriptionCs: string = 'Unset Description';
    public descriptionEn: string = 'Unset Description';
    public date: Date = new Date();
    public location: string = 'Unset Location';
    public imageUrl?: string = undefined;
    public miniatureUrl?: string = undefined;

    constructor(
        id: string,
        titleCs: string,
        titleEn: string,
        descriptionCs: string,
        descriptionEn: string,
        date: Date,
        location: string,
        imageUrl?: string,
        miniatureUrl?: string
    ) {
        this.id = id;
        this.titleCs = titleCs;
        this.titleEn = titleEn;
        this.descriptionCs = descriptionCs;
        this.descriptionEn = descriptionEn;
        this.date = date;
        this.location = location;
        this.imageUrl = imageUrl;
        this.miniatureUrl = miniatureUrl;
    }
}
