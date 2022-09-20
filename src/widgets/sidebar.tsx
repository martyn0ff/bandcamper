import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { FiLogOut, FiInbox, FiUser, FiUserPlus, FiLogIn } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import SidebarProps from "../models/ui/sidebar-props";
import IRelease from "../models/ui/release";
import { getUniqueReleasedBy } from "../utils/array-utils";

const Sidebar: React.FC<SidebarProps> = ({
  releases = [] as IRelease[],
}: SidebarProps) => (
  <div className="text-bg-light border-end h-100 border-dark border-opacity-10 shadow shadow-sm">
    <Container
      fluid
      className="pt-2 px-0"
    >
      <Nav
        className="flex-column mt-3 ps-0"
        variant="light"
        defaultActiveKey="/me"
      >
        <LinkContainer
          to="/me"
          key={uuidv4()}
        >
          <Nav.Link
            className="mb-2 d-flex align-items-center justify-content-start"
            eventKey="myProfile"
            href="/me"
          >
            <FiUser
              className="me-3"
              size="1.5rem"
            />
            My Profile
          </Nav.Link>
        </LinkContainer>

        <LinkContainer
          to="sign-out"
          key={uuidv4()}
        >
          <Nav.Link
            eventKey="sign-out"
            className="mb-2 justify-content-start"
          >
            <FiLogOut
              className="me-3"
              size="1.5rem"
            />
            Sign Out
          </Nav.Link>
        </LinkContainer>

        <LinkContainer
          to="/sign-in"
          key={uuidv4()}
        >
          <Nav.Link
            eventKey="sign-in"
            className="mb-2 justify-content-start"
          >
            <FiLogIn
              className="me-3"
              size="1.5rem"
            />
            Sign In
          </Nav.Link>
        </LinkContainer>

        <LinkContainer
          to="inbox"
          key={uuidv4()}
        >
          <Nav.Link
            eventKey="inbox"
            className="mb-2 justify-content-start"
          >
            <FiInbox
              className="me-3"
              size="1.5rem"
            />
            Inbox
          </Nav.Link>
        </LinkContainer>

        <LinkContainer
          to="/sign-up"
          key={uuidv4()}
        >
          <Nav.Link
            eventKey="sign-up"
            className="mb-2 justify-content-start"
          >
            <FiUserPlus
              className="me-3"
              size="1.5rem"
            />
            Sign Up
          </Nav.Link>
        </LinkContainer>
        <Form className="d-flex px-3 my-3">
          <Form.Control
            type="search"
            placeholder="Search watch..."
            aria-label="Search"
          />
        </Form>
        <div className="text-muted small mx-3 d-flex flex-row align-items-center">
          <span className="text-nowrap">
            {getUniqueReleasedBy(releases).length} watches, 18 new
          </span>
          <div
            style={{ width: "100%", height: "1px" }}
            className="bg-dark bg-opacity-10 ms-2"
          />
        </div>
        <div className="flex-column flex-nowrap mt-2 overflow-auto watches">
          {getUniqueReleasedBy(releases).map((releasedBy) => (
            <LinkContainer
              to={`watch/${releasedBy}`}
              key={uuidv4()}
            >
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
        </div>
      </Nav>
    </Container>
  </div>
);

export default Sidebar;
