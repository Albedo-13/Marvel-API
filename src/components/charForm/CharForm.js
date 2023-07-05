import { useForm } from "react-hook-form";

import "./charForm.scss";
import "../../style/button.scss";
import useMarvelService from "../../services/MarvelService";
import { useState } from "react";
import { Link } from "react-router-dom";

const CharForm = () => {
  const [char, setChar] = useState(null);
  const [newItemLoading, setNewItemLoading] = useState(false);

  const { error, clearError, getCharacterByName } = useMarvelService();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setNewItemLoading(true);
    updateChar(data);
  };

  const onCharLoaded = (char) => {
    setChar(char);
    setNewItemLoading(false);
  };

  const updateChar = (data) => {
    if (!data.charName) {
      return;
    }
    clearError();
    getCharacterByName(data.charName).then(onCharLoaded);
  };

  const formValidationErrorsMsg = Object.keys(errors).length && !error ?
    <p className="char-form__error-text">{errors.charName?.message}</p>
    : null;
  const fetchErrorMsg = !Object.keys(errors).length && error ? (
    <p className="char-form__error-text">The character was not found. Check the name and try again</p>
  ) : null;
  const successSearchMsg = char && !Object.keys(errors).length && !error ? (
    <p className="char-form__success-text">There is! Visit {char.name} page?</p>
  ) : null;
  const toCharButton = successSearchMsg ? <ToCharButton charId={char.id} /> : null;

  return (
    <div className="char-form">
      <div className="char-form__title">Or find a character by name:</div>
      <form className="char-form__form" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("charName", {
            required: "This field is required.",
            onChange: () => {
              setChar(null);
            },
          })}
          className="char-form__input"
          type="text"
          placeholder="Enter name"
        />
        <button type="submit" className="button button__main" disabled={newItemLoading}>
          <div className="inner">FIND</div>
        </button>
      </form>
      <div className="char-form__redirect">
        {formValidationErrorsMsg}
        {fetchErrorMsg}
        {successSearchMsg}
        {toCharButton}
      </div>
    </div>
  );
};

const ToCharButton = (props) => {
  return (
    <Link to={`characters/${props.charId}`} className="button button__secondary">
      <div className="inner">TO PAGE</div>
    </Link>
  );
};

export default CharForm;
