import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { v4 as uuidv4 } from "uuid";
import { BsFillPlayFill } from "react-icons/bs";
import { ReleaseProps } from "../models/ui/release-props";
import { secToTimestamp } from "../utils/player-utils";
import { PlayerCtx, usePlayerContext } from "../context/player-context";
import { getTracks } from "../utils/array-utils";

const Release: React.FC<ReleaseProps> = ({ release }: ReleaseProps) => {
  const { setCurrentTrack, isPlaying, setIsPlaying, releasesRef, playlistRef } =
    usePlayerContext() as PlayerCtx;

  return (
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
        <Table
          // striped
          // bordered
          // hover
          responsive
          // borderless
        >
          <thead>
            <tr>
              <th style={{ width: "10px" }}> </th>
              <th>#</th>
              <th>Artist</th>
              <th>Title</th>
              <th>Length</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {release.tracks.map((track) => (
              <tr>
                <td>
                  <BsFillPlayFill
                    size="1.2rem"
                    onClick={() => {
                      setCurrentTrack(track);
                      playlistRef.current = getTracks(releasesRef.current);
                      if (!isPlaying) {
                        setIsPlaying(true);
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td>{track.trackNum}</td>
                <td>{track.artist || release.artist}</td>
                <td>{track.title}</td>
                <td>{secToTimestamp(track.duration)}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    className="py-0"
                    size="sm"
                  >
                    Get on Bandcamp
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Release;
