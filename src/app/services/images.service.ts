import { Injectable } from '@angular/core';
import {ImageData} from "../Models/image-data";

export enum Category {
  All = "All",
  Profile = "Profile",
}

export enum ImageSize {
  Miniature = "miniature",
  Full = "full"
}

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  images: { [category: string]: ImageData[] } = {

  };

  profileImages: ImageData[] = [
    new ImageData('Profile photo 1', 'assets/images/profile_images/dance.jpg'),
    new ImageData('Profile photo 2', 'assets/images/profile_images/greeting.jpg'),
    new ImageData('Profile photo 3', 'assets/images/profile_images/leaning_on_wall.jpg'),
  ]

  constructor() { }


  getImagesData(category: Category) : ImageData[] {
    return this.images[category].slice();
  }

  getImages(category: Category, sizeVariant: ImageSize = ImageSize.Full) : (string | undefined)[] {
    return this.images[category].map(image => sizeVariant === ImageSize.Full ? image.imageUrl : image.miniatureUrl);
  }

  getRandomImageUrl(category: Category, imageSize: ImageSize = ImageSize.Miniature) : string | undefined {
    if (category === Category.All) {
      const allImages = Object.values(this.images).reduce((acc, val) => acc.concat(val), []);
      const randomIndex = Math.floor(Math.random() * allImages.length);
      return imageSize === ImageSize.Full ? allImages[randomIndex].imageUrl : allImages[randomIndex].miniatureUrl;
    } else if (category === Category.Profile) {
      return this.profileImages[Math.floor(Math.random() * this.profileImages.length)].imageUrl;
    }
    else {
      const randomIndex = Math.floor(Math.random() * this.images[category].length);
      return imageSize == ImageSize.Full ? this.images[category][randomIndex].imageUrl : this.images[category][randomIndex].miniatureUrl;
    }
  }

  private createImageData(imageNumbers: number[], baseName: string, folderName: string): ImageData[] {
    return imageNumbers.map(
      imageNumber => new ImageData(
        `${baseName} ${imageNumber}`,
        `assets/images/${folderName}/${imageNumber}.webp`,
        `assets/images/${folderName}/miniatures/${imageNumber}.webp`
      ));
  }
}
