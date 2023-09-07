import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  BtnLabel,
  Header,
  Input,
  SearchButton,
  SearchForm,
} from './Serchbar.styled';
import { ReactComponent as Icon } from 'icons/search.svg';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = ({ currentTarget }) => {
    setInputValue(currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      return toast.error('Enter your search query!');
    }
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <>
      <Header className="searchbar">
        <SearchForm className="form" onSubmit={handleSubmit}>
          <SearchButton type="submit" className="button">
            <BtnLabel className="button-label">
              {' '}
              <Icon />
            </BtnLabel>
          </SearchButton>

          <Input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={handleInputChange}
          />
        </SearchForm>
      </Header>
    </>
  );
};
