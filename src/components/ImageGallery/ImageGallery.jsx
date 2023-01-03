import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryStyled } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends React.Component {
  render() {
    const queryArr = this.props.queryArr;

    return (
      <div>
        <ImageGalleryStyled>
          {queryArr.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              click={this.props.click}
            />
          ))}
        </ImageGalleryStyled>
      </div>
    );
  }
}

ImageGallery.propTypes = {
  queryArr: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      tags: PropTypes.string,
      pageURL: PropTypes.string,
      type: PropTypes.string,
      previewURL: PropTypes.string,
      previewWidth: PropTypes.number,
      previewHeight: PropTypes.number,
      webformatWidth: PropTypes.number,
      webformatHeight: PropTypes.number,
      imageWidth: PropTypes.number,
      imageHeight: PropTypes.number,
      imageSize: PropTypes.number,
      views: PropTypes.number,
      downloads: PropTypes.number,
      collections: PropTypes.number,
      likes: PropTypes.number,
      comments: PropTypes.number,
      user_id: PropTypes.number,
      user: PropTypes.string,
      userImageURL: PropTypes.string,
    })
  ),
  click: PropTypes.func,
  key: PropTypes.string,
};
