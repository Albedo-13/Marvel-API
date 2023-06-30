import useMarvelService from '../../../services/MarvelService';
import { useState, useEffect } from 'react';
import Spinner from '../../spinner/Spinner';
import { useParams, Link } from 'react-router-dom';

import Page404 from '../404';
import AppBanner from '../../appBanner/AppBanner';

import './singleCharPage.scss';

const SingleCharPage = () => {
  const { charId } = useParams();
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charId]);

  const updateChar = () => {
    clearError();
    getCharacter(charId)
      .then(onCharLoaded);
  }

  const onCharLoaded = (char) => {
    setChar(char);
  }

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <Page404 /> : null;
  const items = (char && !loading && !error) ? <View char={char} /> : null;

  return (
    <>
      <AppBanner/>
      {errorMessage}
      {spinner}
      {items}
    </>
  );
}

const View = ({ char }) => {
  const { name, description, thumbnail } = char;

  return (
    <div className="single-char">
      <img src={thumbnail} alt={name} className="single-char__img" />
      <div className="single-char__info">
        <h2 className="single-char__name">{name}</h2>
        <p className="single-char__descr">{description}</p>
      </div>
      <Link to="/" className="single-char__back">Back to all</Link>
    </div>
  )
}

export default SingleCharPage;