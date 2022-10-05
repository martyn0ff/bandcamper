import { useLayoutEffect, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { FiLogOut, FiInbox, FiUser, FiUserPlus, FiLogIn } from "react-icons/fi";
import { BsCircleFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import SidebarProps from "../models/sidebar-props";
import IRelease from "../models/release";
import IWatch from "../models/watch";
import {
  calcWatchSeenTracks,
  calcWatchTotalAvailableTracks,
  getWatches,
  searchWatches,
  truncateString,
} from "../utils/misc-utils";
import { PlayerCtx, usePlayerContext } from "../context/player-context";

const Sidebar: React.FC<SidebarProps> = ({
  releases = [] as IRelease[],
}: SidebarProps) => {
  const { setAllReleases, allReleases } = usePlayerContext() as PlayerCtx;
  const [watches, setWatches] = useState<IWatch[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const keysWatch: (keyof IWatch)[] = ["bandName"];

  useLayoutEffect(() => {
    setAllReleases(releases);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    setWatches(getWatches(allReleases));
    console.log(`All Releases Triggered`);
  }, [allReleases]);

  const newWatches = () => {
    let count = 0;
    watches.forEach((watch) => {
      if (calcWatchSeenTracks(watch) === 0) {
        count += 1;
      }
    });
    return count;
  };

  useEffect(() => {
    const allWatches = getWatches(allReleases);
    if (searchQuery) {
      setWatches(searchWatches(allWatches, keysWatch, searchQuery));
    } else {
      setWatches(allWatches);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <div className="text-bg-light border-end h-100 border-dark border-opacity-10 shadow shadow-sm">
      <Container
        fluid
        className="pt-2 px-0"
      >
        <Nav
          className="flex-column mt-3 ps-0"
          variant="light"
          defaultActiveKey="inbox"
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
              aria-label="Search watch"
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
          </Form>
          <div className="text-muted small mx-3 d-flex flex-row align-items-center">
            <span className="text-nowrap">
              {watches.length} watches, {newWatches()} new
            </span>
            <div
              style={{ width: "100%", height: "1px" }}
              className="bg-dark bg-opacity-10 ms-2"
            />
          </div>
          <div className="flex-column flex-nowrap mt-2 overflow-auto watches">
            {watches.map((watch) => (
              <LinkContainer
                to={`watch/${watch.bandName}`}
                key={uuidv4()}
              >
                <Nav.Link
                  className={`py-2 d-flex align-items-center ${
                    calcWatchSeenTracks(watch) === 0 ? "bg-unseen" : ""
                  }`}
                  eventKey={`${watch.bandName}`}
                >
                  {calcWatchTotalAvailableTracks(watch) -
                    calcWatchSeenTracks(watch) >
                    0 && (
                    <BsCircleFill
                      color="red"
                      size="0.4rem"
                      className="me-2"
                    />
                  )}
                  {truncateString(watch.bandName, 22)}
                </Nav.Link>
              </LinkContainer>
            ))}
          </div>
        </Nav>
      </Container>
    </div>
  );
};

export default Sidebar;
