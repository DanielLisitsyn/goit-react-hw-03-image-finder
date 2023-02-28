import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ items, onClick }) => {
  return (
    <ul className={css.list}>
      {items.map(item => (
        <ImageGalleryItem
          key={item.id}
          largeImageURL={item.largeImageURL}
          webformatURL={item.webformatURL}
          tags={item.tags}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
ImageGallery.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func,
};
