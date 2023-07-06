import { useEffect, useState } from "react";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import useMarvelService from "../../services/MarvelService";
import { Link } from "react-router-dom";

import "./charInfo.scss";
import CharForm from "../charForm/CharForm";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const { process, setProcess, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.charId]);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'));
  };

  const setContent = (process, View, data) => {
    switch (process) {
      case 'waiting':
        return <Skeleton />;
      case 'loading':
        return <Spinner />;
      case 'error':
        return <ErrorMessage />;
      case 'confirmed':
        return <View data={data} />;
      default:
        throw new Error("Unhandled process error");
    }
  }

  return (
    <div className="char__aside">
      <div className="char__info">
        {setContent(process, View, char)}
      </div>
      <CharForm />
    </div>
  );
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;
  const imgStyle = thumbnail.indexOf("image_not_available") > -1 ? { objectFit: "contain" } : { objectFit: "cover" };

  const getComicIdFromQueryString = (queryString) => queryString.split("/").reverse()[0];

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} style={imgStyle} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length ? null : "There is no information about comics..."}
        {comics.map((item, i) => {
          return (
            <li key={i} className="char__comics-item">
              <Link to={`/comics/${getComicIdFromQueryString(item.resourceURI)}`}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
