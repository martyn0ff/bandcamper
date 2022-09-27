import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";

const Profile = () => (
  <div className="profile">
    <h1>mf&apos;s Profile</h1>
    <Form>
      <Form.Group
        className="mb-3"
        controlId="formAccountEmail"
      >
        <Form.Label>Your account email</Form.Label>
        <Form.Control
          type="email"
          value="roman@martynoff.dev"
        />
        <Form.Text className="text-muted">
          If you change your email, we will send you confirmation to your new
          email address.
        </Form.Text>
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formBandcamperEmail"
      >
        <Form.Label>Your Bandcamper email</Form.Label>
        <Form.Control
          type="email"
          value="mf-04cf9a1@bandcamper.co"
          className="bg-light"
          style={{ cursor: "pointer" }}
          disabled
        />
        <Form.Text className="text-muted">
          Forward your Bandcamp emails to this address to receive updates.
        </Form.Text>
      </Form.Group>

      <hr className="my-3" />

      <Form.Group
        className="mb-3"
        controlId="formBandcampUsername"
      >
        <Form.Label>Your Bandcamp username</Form.Label>
        <InputGroup>
          <InputGroup.Text id="bandcampUsername">bandcamp.com/</InputGroup.Text>
          <Form.Control
            type="text"
            value="perfec"
            aria-describedby="bandcampUsername"
          />
        </InputGroup>
        <Form.Text className="text-muted">
          We will use it to synchronize artists &amp; labels you follow as your
          watches.
        </Form.Text>
      </Form.Group>

      <hr className="my-3" />

      <Form.Group
        className="mb-3"
        controlId="formNewPassword"
      >
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your new password"
          className="mb-2"
        />
      </Form.Group>
      <Form.Group
        className="mb-3"
        controlId="formRepeatNewPassword"
      >
        <Form.Label>Repeat New Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your new password again"
        />
        <Form.Text className="text-muted">
          If you change your password, we will send you confirmation email.
        </Form.Text>
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
      >
        Save Changes
      </Button>
    </Form>
  </div>
);

export default Profile;
