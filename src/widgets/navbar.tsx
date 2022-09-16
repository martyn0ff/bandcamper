import BsNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import { FaBandcamp } from "react-icons/fa";

const Navbar: React.FC = () => (
  <BsNavbar
    bg="dark"
    variant="dark"
    expand="lg"
  >
    <Container fluid>
      <BsNavbar.Brand
        href="#home"
        className="me-0 d-flex align-items-center"
      >
        <FaBandcamp size="2rem" />
        <span className="ms-2 fw-bold">Bandcamper</span>
      </BsNavbar.Brand>
    </Container>
  </BsNavbar>
);

export default Navbar;
