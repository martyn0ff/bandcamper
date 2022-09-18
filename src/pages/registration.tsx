import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { FormEvent, FormEventHandler, useState } from "react";
import { sha256 } from "../utils/hashing";

const Registration: React.FC = () => {
  const [validated, setValidated] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordSha256, setPasswordSha256] = useState("");
  const [repeatPasswordSha256, setRepeatPasswordSha256] = useState("");

  const handleSubmit: FormEventHandler = async (e: FormEvent) => {
    const form = e.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="registration">
      <h1>Sign Up</h1>
      <Form
        noValidate
        onSubmit={handleSubmit}
        validated={validated}
      >
        <Form.Group
          className="mb-3"
          controlId="formRegUsername"
        >
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Erroneous username
          </Form.Control.Feedback>
          <Form.Control.Feedback>
            {`${username} is available`}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formRegEmail"
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Erroneous email
          </Form.Control.Feedback>
          <Form.Control.Feedback>
            {`${email} is valid email`}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formRegPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPasswordSha256(sha256(e.target.value))}
            required
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
            onChange={(e) => setRepeatPasswordSha256(sha256(e.target.value))}
            required
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
};

export default Registration;
