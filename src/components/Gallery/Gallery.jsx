import { Component } from 'react';
import css from './Gallery.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import { fetchImages } from 'services/api';
import Button from 'components/Button/Button';
import Modal from 'shared/component/Modal';

class Gallery extends Component {
  state = {
    items: [],
    loading: false,
    page: 0,
    searchQuery: '',
    error: null,
    data: {},
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      try {
        this.setState({ loading: true });
        const data = await fetchImages(searchQuery, page);
        if (data.totalHits <= 0) {
          throw new Error('404');
        }
        this.setState(prev => ({
          data,
          items: [...prev.items, ...data.hits],
          loading: false,
        }));
      } catch (error) {
        this.setState({ error, loading: false });
      }
    }
  }

  onSearchImages = query => {
    const { searchQuery } = this.state;
    if (query === searchQuery) {
      return;
    }
    this.setState({ items: [], page: 1, searchQuery: query });
  };

  onLoadMore = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  showModal = (largeImageURL, tags) => {
    this.setState({
      showModal: true,
      largeImageURL,
      tags,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { items, loading, error, data, showModal, largeImageURL, tags } =
      this.state;

    return (
      <div className={css.gallery}>
        {showModal && (
          <Modal close={this.closeModal}>
            <img src={largeImageURL} alt={tags} width="800" />
          </Modal>
        )}
        <Searchbar onSubmit={this.onSearchImages} />
        {error && (
          <h2 className={css.error}>
            Image {this.state.searchQuery} not found.
          </h2>
        )}
        <ToastContainer autoClose={3000} theme="colored" position="top-right" />

        <ImageGallery items={items} onClick={this.showModal} />
        {loading && <Loader />}
        {items.length < data.totalHits && items.length > 0 && (
          <Button onClick={this.onLoadMore} />
        )}
      </div>
    );
  }
}

export default Gallery;
