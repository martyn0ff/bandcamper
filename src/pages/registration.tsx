import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Registration: React.FC = () => (
  <div className="registration">
    <h1>Sign Up</h1>
    <Form>
      <Form.Group
        className="mb-3"
        controlId="formRegUsername"
      >
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your username"
        />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formRegEmail"
      >
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
        />
        <Form.Text className="text-muted">
          We&apos;ll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formRegPassword"
      >
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password"
        />
      </Form.Group>
      <Form.Group
        className="mb-3"
        controlId="formRegRepeatPassword"
      >
        <Form.Label>Confirm Your Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password again"
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
      >
        Register
      </Button>
    </Form>
  </div>
);

export default Registration;
