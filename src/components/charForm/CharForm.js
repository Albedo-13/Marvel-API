import { useForm } from 'react-hook-form';

import './charForm.scss';
import '../../style/button.scss';
import useMarvelService from '../../services/MarvelService';
import { useState } from 'react';

const CharForm = () => {
  const [char, setChar] = useState(null);

  const {
    loading,
    error,
    clearError,
    getCharacterByName
  } = useMarvelService();

  const {
    register,
    handleSubmit,
    formState: {
      errors
    } } = useForm();

  const onSubmit = (data) => {
    updateChar(data);
  }

  const onCharLoaded = (char) => {
    setChar(char);
    // Show hero's page button & success message
  }

  const updateChar = (data) => {
    if (!data.charName) {
      return;
    }
    clearError();
    getCharacterByName(data.charName)
      .then(onCharLoaded);
  }

  // X - TODO: fix rerenders amount per query
  // TODO: error handling
  // TODO: integrate form messages into char state (work with id)
  // TODO: Generate hero description page (mb same with prev one)
  
  console.log(errors, error);


  // TODO: нужен один источник правды
  // TODO: в кофи хаус изменить ссылки на navlink в хедере?

  const formValidationErrorsMsg = (Object.keys(errors).length && !error) ? <p>{errors.charName?.message}</p> : null;
  const fetchErrorMsg = (!Object.keys(errors).length && error) ? <p>The character was not found. Check the name and try again</p> : null;
  const successSearchMsg = (char && !Object.keys(errors).length && !error) ? <p>There is! Visit {char.name} page?</p> : null;

  console.log('errors:', formValidationErrorsMsg, fetchErrorMsg);
  
  return (
    <div className="char-form">
      <div className="char-form__title">Or find a character by name:</div>
      <form
        className="char-form__form"
        onSubmit={handleSubmit(onSubmit)}>
        <input
          // MBTODO: on empty input - char state to null?
          {...register("charName", { required: "This field is required." })}
          className="char-form__input"
          type="text"
          placeholder='Enter name' />
        <button
          type="submit"
          className="button button__main">
          <div className="inner">FIND</div>
        </button>
      </form>
      {successSearchMsg}
      {formValidationErrorsMsg}
      {fetchErrorMsg}
    </div>
  );
}

export default CharForm;