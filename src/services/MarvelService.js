import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, setError, clearError, process, setProcess } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=44039d56cf17118765d33ccf69718672";
  const _baseCharOffset = 210;
  const _baseComicOffset = 171;

  const getAllCharacters = async (offset = _baseCharOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getCharacterByName = async (charName) => {
    const res = await request(`${_apiBase}characters?name=${charName}&${_apiKey}`);
    if (!res.data.results.length) {
      setError(`No valid results by fetching ${_apiBase}characters?name=${charName}&${_apiKey}`);
      return;
    }
    return _transformCharacter(res.data.results[0]);
  };

  const getCharactersByPartialName = async (partialCharName) => {
    const res = await request(`${_apiBase}characters?nameStartsWith=${partialCharName}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const getAllComics = async (offset = _baseComicOffset) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformComic);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComic(res.data.results[0]);
  };

  const _transformComic = (comic) => {
    return {
      id: comic.id,
      title: comic.title,
      price: comic.prices[0].price,
      description: comic.description
        ? `${comic.description.slice(0, 175)}...`
        : "There is no information about this comic...",
      pageCount: `${comic.pageCount} page(s)`,
      language: comic.textObjects.length > 0 ? comic.textObjects[0].language : "no info",
      thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
    };
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 175)}...`
        : "There is no information about this hero...",
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items.length > 10 ? char.comics.items.slice(10) : char.comics.items,
    };
  };

  return {
    loading,
    error,
    process,
    setProcess,
    getAllCharacters,
    getCharacter,
    getCharacterByName,
    getCharactersByPartialName,
    getAllComics,
    getComic,
    clearError,
  };
};

export default useMarvelService;
