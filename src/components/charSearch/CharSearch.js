
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import './charSearch.scss';

const CharSearch = () => {
  const { loading, error, getCharactersByPartialName } = useMarvelService();
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (input === '') {
      setData([]);
    }
    onRequest(input);
  }, [input]);

  const onRequest = (name) => {
    if(!name) {
      return;
    }

    getCharactersByPartialName(name)
      .then(onCharactersLoaded);
  }

  const onCharactersLoaded = (data) => setData(data);

  return (
    <>
      <form action="">
        <input
          value={input}
          type="text" />
      </form>
    </>
  );
}

export default CharSearch;