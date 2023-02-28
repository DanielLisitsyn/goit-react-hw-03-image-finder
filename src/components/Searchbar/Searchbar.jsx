import { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    text: '',
  };

  handelSubmit = e => {
    e.preventDefault();
    if (this.state.text.trim() === '') {
      toast.warn('Enter image name');
      return;
    }
    const { onSubmit } = this.props;
    onSubmit(this.state.text);
    this.reset();
  };

  reset() {
    this.setState({ text: '' });
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      text: value,
    });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handelSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <ImSearch />
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.text}
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
