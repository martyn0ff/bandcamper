import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { FiLogOut, FiInbox, FiUser, FiUserPlus, FiLogIn } from "react-icons/fi";
import SidebarProps from "../models/sidebar-props";
import IRelease from "../models/release";
import { getUniqueReleasedBy } from "../utils/array-utils";

const Sidebar: React.FC<SidebarProps> = ({
  releases = [] as IRelease[],
}: SidebarProps) => (
  <div className="text-bg-light border-end h-100 border-dark border-opacity-10">
    <Container
      fluid
      className="pt-2 px-0"
    >
      <Nav className="flex-column mt-3 ps-0">
        <LinkContainer to="/me">
          <Nav.Link
            className="mb-2 d-flex align-items-center justify-content-start fw-semibold"
            eventKey="myProfile"
          >
            <FiUser
              className="me-3"
              size="1.5rem"
            />
            My Profile
          </Nav.Link>
        </LinkContainer>

        <Nav.Link
          eventKey="logout"
          className="mb-2 justify-content-start fw-semibold"
        >
          <FiLogOut
            className="me-3"
            size="1.5rem"
          />
          Sign Out
        </Nav.Link>
        <LinkContainer to="/sign-in">
          <Nav.Link
            eventKey="sign-in"
            className="mb-2 justify-content-start fw-semibold"
          >
            <FiLogIn
              className="me-3"
              size="1.5rem"
            />
            Sign In
          </Nav.Link>
        </LinkContainer>

        <LinkContainer to="inbox">
          <Nav.Link
            eventKey="inbox"
            className="mb-2 justify-content-start fw-semibold"
          >
            <FiInbox
              className="me-3"
              size="1.5rem"
            />
            Inbox
          </Nav.Link>
        </LinkContainer>

        <LinkContainer to="/sign-up">
          <Nav.Link
            eventKey="sign-up"
            className="mb-2 justify-content-start fw-semibold"
          >
            <FiUserPlus
              className="me-3"
              size="1.5rem"
            />
            Sign Up
          </Nav.Link>
        </LinkContainer>
      </Nav>
      <Form className="d-flex px-3 my-3">
        <Form.Control
          type="search"
          placeholder="Search watch..."
          aria-label="Search"
        />
      </Form>
      <div className="text-muted small mx-3 mt-2 d-flex flex-row align-items-center mb-2">
        <span className="text-nowrap">42 watches, 18 new</span>
        <div
          style={{ width: "100%", height: "1px" }}
          className="bg-dark bg-opacity-10 ms-2"
        />
      </div>
      <Nav className="flex-column flex-nowrap mt-3 overflow-auto watches">
        {getUniqueReleasedBy(releases).map((releasedBy) => (
          <LinkContainer to={`watch/${releasedBy}`}>
            <Nav.Link
              className="mb-2 py-0 d-flex align-items-center justify-content-between"
              eventKey={`${releasedBy}`}
            >
              {releasedBy}
              {/* <BsCircleFill
                color="red"
                size="0.5rem"
              /> */}
            </Nav.Link>
          </LinkContainer>
        ))}
      </Nav>
    </Container>
  </div>
);

export default Sidebar;
