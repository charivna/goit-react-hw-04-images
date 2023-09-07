import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'services/image-api';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { toast } from 'react-toastify';

import { ColorRing } from 'react-loader-spinner';

export const App = () => {
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [totalImg, setTotalImg] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSearchSubmit = inputValue => {
    setInputValue(inputValue);
    setImages([]);
    setPage(1);
  };

  const handleClickImg = evt => {
    const imgForModal = evt.target.dataset.src;
    const altForModal = evt.target.alt;

    setShowModal(true);
    setModalImg(imgForModal);
    setModalAlt(altForModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (!inputValue) return;
    setLoading(true);

    fetchImages(inputValue, page)
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          toast.error(`No pictures with "${inputValue}"`);
          return;
        } else {
          setImages(state => [...state, ...hits]);
          setTotalImg(totalHits);
        }
      })
      .catch(error => setError(true))
      .finally(() => setLoading(false));
  }, [page, inputValue]);

  return (
    <>
      <Searchbar onSubmit={handleSearchSubmit} />
      {error && !loading && <h1>Something wrong. Reload the page!</h1>}
      {loading && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      )}

      {images.length > 0 && (
        <ImageGallery images={images} clickImg={handleClickImg} />
      )}
      {images.length !== 0 && page < Math.ceil(totalImg / 12) && (
        <Button onClick={handleLoadMore} />
      )}
      {showModal && (
        <Modal img={modalImg} alt={modalAlt} onCloseModal={closeModal}>
          Some
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </>
  );
};
