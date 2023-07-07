import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import RandomChar from "../randomChar/RandomChar";
import CharSearch from "../charSearch/CharSearch";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";

const MainPage = () => {
  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta name="description" content="Marvel information portal" />
          <title>Marvel information portal</title>
        </Helmet>
      </HelmetProvider>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <CharSearch />
      <div className="char__content">
        <CharList onCharSelected={onCharSelected} />
        <ErrorBoundary>
          <CharInfo charId={selectedChar} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
