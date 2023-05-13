import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCharsLoaded = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }

    setChars(chars => [...chars, ...newChars]);
    setNewItemLoading(() => false);
    setOffset(offset => offset + 9);
    setCharEnded(charEnded => ended);
  }

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset)
      .then(onCharsLoaded);
  }

  const itemRefs = useRef([]);

  const onItemFocus = (id) => {
    itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  }

  function renderItems(chars) {
    const items = chars.map((char, i) => {
      const imgStyle = char.thumbnail.indexOf('image_not_available') > -1 ? { 'objectFit': 'contain' } : { 'objectFit': 'cover' };

      return (
        <li
          className="char__item"
          key={char.id}
          tabIndex="0"
          ref={el => itemRefs.current[i] = el}
          onFocus={() => {
            props.onCharSelected(char.id);
            onItemFocus(i);
          }
          }>
          <img src={char.thumbnail} style={imgStyle} alt="hero" />
          <div className="char__name">{char.name}</div>
        </li>
      );
    });

    return (
      <ul className="char__grid">
        {items}
      </ul>
    );
  }

  const items = renderItems(chars);
  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <div className="char__list">
      {errorMessage}
      {items}
      {spinner}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ 'display': charEnded ? 'none' : 'block' }}
        onClick={() => onRequest(offset)}>
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
}

export default CharList;