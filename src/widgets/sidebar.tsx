import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import { BsCircleFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { FiInbox } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiRefreshCw } from "react-icons/fi";

const Sidebar: React.FC = () => (
  <div className="text-bg-light border-end h-100 border-dark border-opacity-10">
    <Container
      fluid
      className="pt-2 px-0"
    >
      <Nav className="flex-column mt-3 ps-0">
        <Nav.Link
          href="/a"
          className="mb-2 d-flex align-items-center justify-content-start"
        >
          <FiUser
            className="me-2"
            size="1.5rem"
          />
          My Profile
        </Nav.Link>
        <Nav.Link
          eventKey="link-1"
          className="mb-2 justify-content-start"
        >
          <FiLogOut
            className="me-2"
            size="1.5rem"
          />
          Logout
        </Nav.Link>
        <Nav.Link
          eventKey="link-1"
          className="mb-2 justify-content-start"
        >
          <FiInbox
            className="me-2"
            size="1.3rem"
          />
          Inbox
        </Nav.Link>
        <Button
          variant="outline-primary"
          className="d-flex align-items-center justify-content-center mx-3"
        >
          <FiRefreshCw
            className="me-2"
            size="1.3rem"
          />
          Refresh Watches
        </Button>
      </Nav>
      <hr className="border-dark border-opacity-25 mt-3 mx-3" />
      <Form className="d-flex px-3">
        <Form.Control
          type="search"
          placeholder="Search watch..."
          aria-label="Search"
        />
      </Form>
      <Nav
        defaultActiveKey="/home"
        className="flex-column flex-nowrap mt-3 overflow-auto watches"
      >
        <Nav.Link
          href="/home"
          className="mb-2 d-flex align-items-center justify-content-between"
        >
          MORD
          <BsCircleFill
            color="red"
            size="0.5rem"
          />
        </Nav.Link>
        <Nav.Link
          eventKey="link-1"
          className="mb-2"
        >
          Link
        </Nav.Link>
        <Nav.Link
          eventKey="link-2"
          className="mb-2"
        >
          Link
        </Nav.Link>
        <Nav.Link
          eventKey="link-2"
          className="mb-2"
        >
          Link
        </Nav.Link>
        <Nav.Link
          eventKey="link-2"
          className="mb-2"
        >
          Link
        </Nav.Link>
        <Nav.Link
          eventKey="link-2"
          className="mb-2"
        >
          Link
        </Nav.Link>
        <Nav.Link
          eventKey="link-2"
          className="mb-2"
        >
          Link
        </Nav.Link>
        <Nav.Link
          eventKey="link-2"
          className="mb-2"
        >
          Link
        </Nav.Link>
        <Nav.Link
          eventKey="link-2"
          className="mb-2"
        >
          Link
        </Nav.Link>
        <Nav.Link
          eventKey="link-2"
          className="mb-2"
        >
          Link
        </Nav.Link>
        <Nav.Link
          eventKey="link-2"
          className="mb-2"
        >
          Link
        </Nav.Link>
        <Nav.Link
          eventKey="link-2"
          className="mb-2"
        >
          Link
        </Nav.Link>
        <Nav.Link
          eventKey="link-2"
          className="mb-2"
        >
          Link
        </Nav.Link>
        <Nav.Link
          eventKey="link-2"
          className="mb-2"
        >
          Link
        </Nav.Link>
        <Nav.Link
          eventKey="link-2"
          className="mb-2"
        >
          Link
        </Nav.Link>
        <Nav.Link
          eventKey="link-2"
          className="mb-2"
        >
          Link
        </Nav.Link>
        <Nav.Link
          eventKey="link-2"
          className="mb-2"
        >
          Link
        </Nav.Link>
      </Nav>
    </Container>
  </div>
);

export default Sidebar;
