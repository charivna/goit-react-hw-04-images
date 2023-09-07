import { ImageGalleryItem } from './ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, clickImg }) => {
  return (
    <Gallery>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            src={webformatURL}
            dataSrc={largeImageURL}
            tags={tags}
            onClick={clickImg}
          />
        );
      })}
    </Gallery>
  );
};
