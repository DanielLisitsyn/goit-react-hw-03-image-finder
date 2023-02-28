import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
    document.body.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.props.close();
      }
    });
  }
  handleClose = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.close();
    }
  };
  render() {
    const { children } = this.props;
    return createPortal(
      <div onClick={this.handleClose} className={css.overlay}>
        <div className={css.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
Modal.propTypes = {
  close: PropTypes.func,
};