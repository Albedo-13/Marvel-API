import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";

import "./charSearch.scss";

const CharSearch = () => {
  const { loading, error, clearError, getCharactersByPartialName } = useMarvelService();
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [dnone, setDnone] = useState(true);

  useEffect(() => {
    if (input === "") {
      setData([]);
    }
    onRequest(input);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const onRequest = (name) => {
    if (!name) {
      return;
    }

    clearError();
    getCharactersByPartialName(name).then(onCharactersLoaded);
  };

  const onCharactersLoaded = (data) => setData(data);

  function renderItems() {
    return data.map((char, index) => {
      return index === data.length - 1 ? (
        <ViewItem char={char} onBlur={() => setDnone(true)} />
      ) : (
        <ViewItem char={char} />
      );
    });
  }

  return (
    <section className="char-search">
      <div className="container">
        <form onSubmit={(e) => e.preventDefault()} onFocus={() => setDnone(false)}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name="search"
            type="text"
            autoComplete="off"
            placeholder="Or find a character by name"
            className="char-search__search-input"
          />
          {dnone ? null : <div className="char-search-items">{loading ? <Spinner /> : renderItems()}</div>}
        </form>
        {error ? <div className="char-search__error">ERROR: Invalid symbols. Try to search again</div> : null}
      </div>
      {dnone ? null : <div className="char-search__overlay" onClick={() => setDnone(true)}></div>}
    </section>
  );
};

const ViewItem = (props) => {
  const { char } = props;
  return (
    <Link to={`characters/${char.id}`} key={char.id} tabIndex={0} className="char-search-item" onBlur={props.onBlur}>
      <div className="char-search-item__wrapper">
        <img src={char.thumbnail} alt={char.name} className="char-search-item__thumbnail" />
        <div className="char-search-item__name">{char.name}</div>
      </div>
    </Link>
  );
};

export default CharSearch;
