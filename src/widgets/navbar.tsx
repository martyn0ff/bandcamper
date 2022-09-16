import BsNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

const Navbar: React.FC = () => (
  <BsNavbar
    bg="dark"
    variant="dark"
    expand="lg"
  >
    <Container fluid>
      <BsNavbar.Brand
        href="#home"
        className="me-0"
      >
        WATCHR
      </BsNavbar.Brand>
      <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BsNavbar.Collapse
        id="basic-navbar-nav"
        className="justify-content-end"
      >
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-primary"
            id="dropdown-basic"
          >
            Roman Martynoff
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </BsNavbar.Collapse>
    </Container>
  </BsNavbar>
);

export default Navbar;
