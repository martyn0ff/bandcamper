import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { sha256 } from "../utils/hashing";
import useForm from "../hooks/useForm";
import { User } from "../models/entities/user";

const SignUp: React.FC = () => {
  // const [validated, setValidated] = useState(false);

  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [passwordSha256, setPasswordSha256] = useState("");
  // const [repeatPasswordSha256, setRepeatPasswordSha256] = useState("");

  // const handleSubmit: FormEventHandler = async (e: FormEvent) => {
  //   const form = e.currentTarget as HTMLFormElement;
  //   if (form.checkValidity() === false) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   }

  //   setValidated(true);
  // };

  const {
    handleSubmit,
    handleChange,
    formData: user,
    errors,
  } = useForm<User>({
    validations: {
      username: {
        required: {
          value: true,
          errorMessage: "This field is required",
        },
        pattern: {
          value: "^[A-Za-z][A-Za-z0-9-_]*$",
          errorMessage:
            "Username should start with a letter, and can contain only letters, underscores and hyphens",
        },
        custom: {
          isValid: (value: string) => value.length > 3,
          errorMessage: "Username should be longer than 3 characters",
        },
      },
      email: {
        required: {
          value: true,
          errorMessage: "This field is required",
        },
        pattern: {
          value:
            '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
          errorMessage: "Invalid email address",
        },
      },
      password: {
        required: {
          value: true,
          errorMessage: "This field is required",
        },
        pattern: {
          value: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
          errorMessage:
            "Your password should contain at least one uppercase letter, one lowercase letter, one digit and be at least 8 characters long",
        },
      },
      confirmPassword: {
        required: {
          value: true,
          errorMessage: "This field is required",
        },
        custom: {
          isValid: (value: string) => value === user.password,
          errorMessage: "Your passwords don't match",
        },
      },
    },
    onSubmit: () => alert("Submitted!"),
  });

  return (
    <div className="registration">
      <h1>Sign Up</h1>
      <Form
        noValidate
        onSubmit={handleSubmit}
      >
        <Form.Group
          className="mb-3"
          controlId="formRegUsername"
        >
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={user.username || ""}
            onChange={handleChange("username")}
            isInvalid={!!errors.username}
            required
          />
          {errors.username && (
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formRegEmail"
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={user.email || ""}
            onChange={handleChange("email")}
            isInvalid={!!errors.email}
            required
          />
          {errors.email && (
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formRegPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            onChange={handleChange("password")}
            value={user.password || ""}
            required
            isInvalid={!!errors.password}
          />
          {errors.password && (
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formRegRepeatPassword"
        >
          <Form.Label>Confirm your password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password again"
            onChange={handleChange("confirmPassword")}
            value={user.confirmPassword || ""}
            required
            isInvalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        {/* <LinkContainer to="success"> */}
        <Button
          variant="primary"
          type="submit"
        >
          Register
        </Button>
        {/* </LinkContainer> */}
      </Form>
    </div>
  );
};

export default SignUp;
