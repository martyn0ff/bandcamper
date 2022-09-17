import Container from "react-bootstrap/Container";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div className="d-flex">
        <Container
          fluid
          className="h-100"
        >
          <div>
            <h1>{error.status}</h1>
            <p>{error.statusText}</p>
            {error.data?.message && <p>{error.data.message}</p>}
          </div>
        </Container>
      </div>
    );
  }
  return <div>Oops</div>;
};

export default ErrorPage;
