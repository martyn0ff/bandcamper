import BsNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { FaBandcamp } from "react-icons/fa";
import logo from "../assets/logo.svg";

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
        <Image
          src={logo}
          height={38}
          className="ps-1"
        />
      </BsNavbar.Brand>
    </Container>
  </BsNavbar>
);

export default Navbar;
