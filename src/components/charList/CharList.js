import { useState, useEffect, useRef, useMemo } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import useMarvelService from "../../services/MarvelService";
import { setContentWithLoading } from "../../utils/setContent";

import "./charList.scss";

const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { process, setProcess, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCharsLoaded = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }

    setChars((chars) => [...chars, ...newChars]);
    setNewItemLoading(() => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset)
      .then(onCharsLoaded)
      .then(() => setProcess("confirmed"));
  };

  const itemRefs = useRef([]);

  const onItemFocus = (id) => {
    itemRefs.current.forEach((item) => item.classList.remove("char__item_selected"));
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function renderItems(chars) {
    const items = chars.map((char, i) => {
      const imgStyle = char.thumbnail.indexOf("image_not_available") > -1 ? { objectFit: "contain" } : { objectFit: "cover" };

      return (
        <CSSTransition key={char.id} timeout={500} classNames="char__item">
          <li
            className="char__item"
            tabIndex="0"
            ref={(el) => (itemRefs.current[i] = el)}
            onFocus={() => {
              props.onCharSelected(char.id);
              onItemFocus(i);
            }}
          >
            <img src={char.thumbnail} style={imgStyle} alt="hero" />
            <div className="char__name">{char.name}</div>
          </li>
        </CSSTransition>
      );
    });

    return (
      <ul className="char__grid">
        <TransitionGroup component={null}>{items}</TransitionGroup>
      </ul>
    );
  }

  const elements = useMemo(() => {
    return setContentWithLoading(process, () => renderItems(chars), newItemLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [process]);

  return (
    <div className="char__list">
      {elements}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
