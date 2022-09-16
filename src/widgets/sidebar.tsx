import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import { BsCircleFill } from "react-icons/bs";

const Sidebar: React.FC = () => (
  <div className="text-bg-light border-end h-100 border-dark border-opacity-25">
    <Container
      fluid
      className="pt-2"
    >
      <Button
        variant="primary"
        className="w-100 mb-2"
      >
        Add new watch
      </Button>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </Form>
      <hr className="mt-3" />
      <Nav
        variant="pills"
        defaultActiveKey="/home"
        className="flex-column mt-3"
      >
        <Nav.Link
          href="/home"
          className="mb-2 d-flex align-items-center justify-content-between"
        >
          MORD
          <BsCircleFill color="red" />
        </Nav.Link>
        <Nav.Link
          eventKey="link-1"
          className="mb-2"
        >
          Link
        </Nav.Link>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav>
    </Container>
  </div>
);

export default Sidebar;
