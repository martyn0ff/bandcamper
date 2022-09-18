import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SignIn: React.FC = () => (
  <div className="registration">
    <h1>Sign In</h1>
    <Form>
      <Form.Group
        className="mb-3"
        controlId="formLoginUsername"
      >
        <Form.Label>Username or email</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your username or email"
        />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formLoginPassword"
      >
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password"
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
      >
        Log In
      </Button>
    </Form>
  </div>
);

export default SignIn;
