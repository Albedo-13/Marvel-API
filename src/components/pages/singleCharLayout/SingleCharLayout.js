import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import "./singleCharLayout.scss";

const SingleCharLayout = ({ data }) => {
  const { name, description, thumbnail } = data;

  return (
    <div className="single-char">
      <HelmetProvider>
        <Helmet>
          <meta name="description" content={`${name} - marvel hero information page`} />
          <title>{name + " - Marvel Hero information page"}</title>
        </Helmet>
      </HelmetProvider>
      <img src={thumbnail} alt={name} className="single-char__img" />
      <div className="single-char__info">
        <h2 className="single-char__name">{name}</h2>
        <p className="single-char__descr">{description}</p>
      </div>
      <Link to="/" className="single-char__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleCharLayout;
