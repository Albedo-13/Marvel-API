import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router-dom";

import "./comicsList.scss";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(171);
  const [newComicLoading, setNewComicLoading] = useState(false);
  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRequest = (offset) => {
    setNewComicLoading(true);
    getAllComics(offset).then(onComicsLoaded);
  };

  const onComicsLoaded = (newComics) => {
    setComics((comics) => [...comics, ...newComics]);
    setOffset((offset) => offset + 8);
    setNewComicLoading(false);
  };

  const renderComics = (comics) => {
    const items = comics.map((comic, i) => {
      const price = comic.price > 0 ? comic.price + "$" : "NOT AVAILABLE";

      return (
        <li className="comics__item" key={i}>
          <Link to={`${comic.id}`}>
            <img src={comic.thumbnail} alt="comic" className="comics__item-img" />
            <div className="comics__item-name">{comic.title}</div>
            <div className="comics__item-price">{price}</div>
          </Link>
        </li>
      );
    });

    return <ul className="comics__grid">{items}</ul>;
  };

  const items = renderComics(comics);
  const spinner = loading || newComicLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}
      <button onClick={() => onRequest(offset)} className="button button__main button__long" disabled={newComicLoading}>
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
