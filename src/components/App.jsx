import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { AppStyled } from './App.styled';

const KEY = '30296080-c9807eed24713c3ccc4ff6a2b';

const searchParams = new URLSearchParams({
  key: KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

export class App extends React.Component {
  state = {
    query: '',
    queryArr: [],
    currentPage: 1,
    totalImg: null,
    status: 'idle',
    showModal: false,
    srcModal: '',
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.currentPage !== this.state.currentPage
    ) {
      return this.fetchDateQuery();
    }
  }

  async fetchDateQuery() {
    try {
      this.setState({ status: 'pending' });

      searchParams.set('q', this.state.query);
      searchParams.set('page', this.state.currentPage);

      await axios.get(`https://pixabay.com/api/?${searchParams}`).then(res => {
        if (!res.data.hits.length) {
          this.setState({ status: 'idle' });
          return toast.warning(
            'Sorry, there are no images matching your search query. Please try again'
          );
        }
        this.setState(({ queryArr }) => ({
          queryArr: [...queryArr, ...res.data.hits],
          status: 'resolved',
          totalImg: res.data.total,
        }));
      });
    } catch (error) {
      console.log(error);
    }
  }

  clearState = () => {
    this.setState({
      query: '',
      queryArr: [],
      currentPage: 1,
      totalImg: null,
    });
  };

  handleFormSubmit = name => {
    this.clearState();
    this.setState({ query: name });
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onGalleryItemClick = src => {
    this.toggleModal();
    this.setState({ srcModal: src });
  };

  render() {
    const { queryArr, status, totalImg, showModal, srcModal } = this.state;

    return (
      <AppStyled>
        {showModal && <Modal src={srcModal} close={this.toggleModal} />}

        <Searchbar onSubmit={this.handleFormSubmit} />

        {queryArr.length > 0 && (
          <ImageGallery queryArr={queryArr} click={this.onGalleryItemClick} />
        )}

        {status === 'pending' && <Loader />}

        {queryArr.length > 0 && queryArr.length < totalImg && (
          <Button onClick={this.loadMore} />
        )}

        <ToastContainer autoClose={2000} />
      </AppStyled>
    );
  }
}
