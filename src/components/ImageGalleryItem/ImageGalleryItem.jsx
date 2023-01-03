import {
  ImageGalleryItemStyled,
  ImageGalleryItemImageStyled,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  click,
}) => {
  return (
    <ImageGalleryItemStyled
      onClick={() => {
        click(largeImageURL);
      }}
    >
      <ImageGalleryItemImageStyled src={webformatURL} alt={tags} />
    </ImageGalleryItemStyled>
  );
};

ImageGalleryItem.propTypes = {
  click: PropTypes.func,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};
