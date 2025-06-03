export class ImageData {
    public height: number = 0;
    public width: number = 0;

    constructor(

        public description: string,
        public imageUrl: string,
        public miniatureUrl?: string,
    ) {
    }
}
