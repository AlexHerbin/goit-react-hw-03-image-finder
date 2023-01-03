import { Component } from 'react';
import {
  SearchbarStyled,
  SearchFormStyled,
  SearchFormInputStyled,
} from './Searchbar.styled';
import { SearchFormButtonStyled } from 'components/Button/Button.styled';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleQueryChange = e => {
    const query = e.currentTarget.value.toLowerCase();

    this.setState({ searchQuery: query });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return toast.warning('please input the correct query');
    }

    this.props.onSubmit(this.state.searchQuery);

    this.setState({ searchQuery: '' });

    e.target.reset();
  };

  render() {
    return (
      <SearchbarStyled>
        <SearchFormStyled onSubmit={this.handleSubmit}>
          <SearchFormButtonStyled type="submit">
            <BsSearch size="18" />
          </SearchFormButtonStyled>

          <SearchFormInputStyled
            // value={this.state.searchQuery}
            onChange={this.handleQueryChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchFormStyled>
      </SearchbarStyled>
    );
  }
}

Searchbar.propTypes = {
  handleFormSubmit: PropTypes.func,
};
