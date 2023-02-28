import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ largeImageURL, webformatURL, tags, onClick }) => {
  return (
    <li onClick={() => onClick(largeImageURL, tags)} className={css.listItem}>
      <img src={webformatURL} width="250" alt="hgg" />
    </li>
  );
};

export default ImageGalleryItem;
ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  onClick: PropTypes.func,
};
