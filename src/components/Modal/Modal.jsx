import { Component } from 'react';
import { ModalStyled, OverlayStyled } from './Modal.styled';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.close();
    }
  };

  handleBackDrop = e => {
    if (e.currentTarget === e.target) {
      this.props.close();
    }
  };

  render() {
    return (
      <OverlayStyled onClick={this.handleBackDrop}>
        <ModalStyled>
          <img src={this.props.src} alt="" />
        </ModalStyled>
      </OverlayStyled>
    );
  }
}

Modal.propTypes = {
  toggleModal: PropTypes.func,
  srcModal: PropTypes.string,
};
