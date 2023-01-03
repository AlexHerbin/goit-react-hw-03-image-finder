import React from 'react';
import PropTypes from 'prop-types';
import { LoadMoreButtonStyled } from './Button.styled';

export class Button extends React.Component {
  render() {
    return (
      <LoadMoreButtonStyled type="button" onClick={this.props.onClick}>
        Load more
      </LoadMoreButtonStyled>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
};
