import useMarvelService from '../../../services/MarvelService';
import { useState, useEffect } from 'react';
import Spinner from '../../spinner/Spinner';
import { useParams, Link } from 'react-router-dom';
import './singleComicPage.scss';
import Page404 from '../404';
import AppBanner from '../../appBanner/AppBanner';

const SingleComicPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);
  const { loading, error, getComic, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comicId]);

  const updateComic = () => {
    clearError();
    getComic(comicId)
      .then(onComicLoaded);
  }

  const onComicLoaded = (comic) => {
    setComic(comic);
  }

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <Page404 /> : null;
  const items = (comic && !loading && !error) ? <View comic={comic} /> : null;

  return (
    <>
      <AppBanner/>
      {errorMessage}
      {spinner}
      {items}
    </>
  );
}

const View = ({ comic }) => {
  const { title, description, pageCount, thumbnail, language, price } = comic;
  const inStock = price ? `${price}$` : 'not available';

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{inStock}</div>
      </div>
      <Link to="/comics" className="single-comic__back">Back to all</Link>
    </div>
  )
}

export default SingleComicPage;