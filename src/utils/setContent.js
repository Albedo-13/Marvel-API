import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Skeleton from "../components/skeleton/Skeleton";
import Page404 from "../components/pages/404";

const setContent = (process, Component, data) => {
  switch (process) {
    case "waiting":
      return <Skeleton />;
    case "loading":
      return <Spinner />;
    case "error":
      return <ErrorMessage />;
    case "confirmed":
      return <Component data={data} />;
    default:
      throw new Error("Unexpected process state");
  }
};

const setPageContent = (process, Component, data) => {
  switch (process) {
    case "waiting":
      return <Skeleton />;
    case "loading":
      return <Spinner />;
    case "error":
      return <Page404 />;
    case "confirmed":
      return <Component data={data} />;
    default:
      throw new Error("Unexpected process state");
  }
};

const setContentWithLoading = (process, Component, newItemLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return newItemLoading ? <Component /> : <Spinner />;
    case "error":
      return <ErrorMessage />;
    case "confirmed":
      return <Component />;
    default:
      throw new Error("Unexpected process state");
  }
};

export default setContent;
export { setPageContent, setContentWithLoading };
