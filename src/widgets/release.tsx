import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";
import { ReleaseProps } from "../models/ui/release-props";

const Release: React.FC<ReleaseProps> = ({ release }: ReleaseProps) => (
  <Accordion.Item eventKey={release.id.toString()}>
    <Accordion.Header>
      <div className="d-flex w-100">
        <Image
          src={release.coverArt}
          width={48}
          className="rounded-2 me-1"
        />
        <div className="d-flex flex-row w-100 justify-content-between ps-2">
          <div>
            <p className="fw-bold mb-1">{release.artist}</p>
            <div>{release.title}</div>
          </div>
          <span className="text-muted">
            {release.releaseDate.toDateString()}
          </span>
        </div>
      </div>
    </Accordion.Header>
    <Accordion.Body>
      <div className="release-description mb-3">
        <p>{release.description}</p>
        {release.about && <p>{release.about}</p>}
        {release.credits && <p>{release.credits}</p>}
        <Button className="me-2">Buy Album</Button>
        <Button>Add to Wishlist</Button>
      </div>
      <ListGroup>
        {release.tracks.map((track) => (
          <ListGroup.Item
            key={uuidv4()}
            className="py-0"
          >
            <div className="d-flex align-items-center">
              <audio
                src={track.mp3Url}
                controls
                controlsList="nodownload"
                className="w-100 me-3"
              />
              <Button className="text-nowrap px-3 py-1">Buy</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Accordion.Body>
  </Accordion.Item>
);

export default Release;
