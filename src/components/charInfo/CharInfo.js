import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';

import './charInfo.scss';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const {loading, error, getCharacter, clearError} = useMarvelService();

  useEffect(() => {
    updateChar();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.charId]);

  const onCharLoaded = (char) => {
    setChar(char);
  }

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
  }

  const skeleton = (char || loading || error) ? null : <Skeleton />;
  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(error || loading || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {spinner}
      {errorMessage}
      {content}
    </div>
  )
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  const imgStyle = thumbnail.indexOf('image_not_available') > -1 ? { 'objectFit': 'contain' } : { 'objectFit': 'cover' };

  const getComicIdFromQueryString = (queryString) => queryString.split('/').reverse()[0];

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
      <div className="char__descr">
        {description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length ? null : 'There is no information about comics...'}
        {
          comics.map((item, i) => {
            return (
              <li key={i} className="char__comics-item">
                <Link to={`/comics/${getComicIdFromQueryString(item.resourceURI)}`}>
                  {item.name}
                </Link>
              </li>
            );
          })
        }
      </ul>
    </>
  );
}

CharInfo.propTypes = {
  charId: PropTypes.number
}

export default CharInfo;