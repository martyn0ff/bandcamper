import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";
import errorIcon from "../assets/error.svg";

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    return (
      <Container
        fluid
        className="d-flex h-100 justify-content-center align-items-center"
      >
        <div className="w-50 mb-5">
          <Image
            src={errorIcon}
            height={100}
            className="mb-3"
          />
          <h1>Yikes, that&apos;s an error.</h1>
          <h2 className="mb-3">
            {error.status}
            {" - "}
            {error.statusText}
          </h2>
          {error.data?.message && <p>Additional info: {error.data.message}</p>}
          <p>
            We have been notified about it and are working on a fix. There is
            nothing you can do but to go back and resume your journey.
          </p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </Container>
    );
  }
  return <div>Oops</div>;
};

export default ErrorPage;
