import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import "./singleComicLayout.scss";

const SingleComicLayout = ({ data }) => {
  const { title, description, pageCount, thumbnail, language, price } = data;
  const inStock = price ? `${price}$` : "not available";

  return (
    <div className="single-comic">
      <HelmetProvider>
        <Helmet>
          <meta name="description" content={`${title} - Marvel Comic information page`} />
          <title>{title + "- Marvel Comic information page"}</title>
        </Helmet>
      </HelmetProvider>
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{inStock}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicLayout;
