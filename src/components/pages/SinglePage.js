import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";

import Page404 from "./404";
import Spinner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { loading, error, getComic, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateData = () => {
    clearError();

    switch (dataType) {
      case "character":
        getCharacter(id).then(onDataLoaded);
        break;
      case "comic":
        getComic(id).then(onDataLoaded);
        break;
      default:
        throw new Error(`HOC gets unknown dataType param (was ${dataType})`);
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <Page404 /> : null;
  const items = data && !loading && !error ? <Component data={data} /> : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {items}
    </>
  );
};

export default SinglePage;
