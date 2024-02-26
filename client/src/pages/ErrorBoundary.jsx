import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();

  let content;
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      content = <div>This page does not exist!</div>;
    } else if (error.status === 401) {
      content = <div>You are not authorized to see this</div>;
    } else if (error.status === 503) {
      content = <div>Looks like our API is down</div>;
    } else if (error.status === 418) {
      content = <div>🫖</div>;
    } else content = <div>Something went wrong</div>;
  }
  return <div>{content}</div>;
};

export default ErrorBoundary;
