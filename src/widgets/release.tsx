import { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { v4 as uuidv4 } from "uuid";
import { BsFillPlayFill, BsCircleFill } from "react-icons/bs";
import { ReleaseProps } from "../models/release-props";
import { secToTimestamp } from "../utils/player-utils";
import { PlayerCtx, usePlayerContext } from "../context/player-context";
import { getTracks } from "../utils/array-utils";
import { storeCurrentRelease, storeReleases } from "../utils/localforage-utils";

const Release: React.FC<ReleaseProps> = ({ release }: ReleaseProps) => {
  const {
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    releasesRef,
    playlistRef,
    setCurrentRelease,
    currentRelease,
    allReleases,
    setAllReleases,
  } = usePlayerContext() as PlayerCtx;

  // useEffect(() => {
  //   storeReleases({ ...allReleasesRef.current });
  // }, [release, allReleasesRef]);

  return (
    <Accordion.Item eventKey={release.id.toString()}>
      <Accordion.Header>
        <div className="d-flex w-100">
          <Image
            src={`https://f4.bcbits.com/img/a${release.artId}_16.jpg`}
            width={48}
            className="rounded-2 me-1"
          />
          <div className="d-flex flex-row w-100 justify-content-between ps-2">
            <div>
              <p className="fw-bold mb-1">{release.artist}</p>
              <div>{release.title}</div>
            </div>
            <div>
              {release.availableTracks - release.tracksSeen > 0 && (
                <span className="text-danger me-1">
                  {`(${release.availableTracks - release.tracksSeen})`}
                </span>
              )}
              <span className="text-muted">
                {release.releaseDate.toDateString()}
              </span>
            </div>
          </div>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <div className="release-description mb-3">
          {release.about && <p>{release.about}</p>}
          {release.credits && <p>{release.credits}</p>}
        </div>
        <Button
          className="me-2"
          href={release.url}
        >
          Get Album
        </Button>
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
                      if (currentRelease !== release) {
                        setCurrentRelease(release);
                        storeCurrentRelease(release);
                      }
                      if (!isPlaying) {
                        setIsPlaying(true);
                      }
                      if (!track.seen) {
                        // eslint-disable-next-line no-param-reassign
                        track.seen = true;
                        // eslint-disable-next-line no-param-reassign
                        release.tracksSeen += 1;
                        const idx = allReleases.findIndex(
                          (rel) => rel.id === release.id,
                        );
                        if (idx !== -1) {
                          allReleases[idx] = release;
                        }
                        setAllReleases([...allReleases]);
                        storeReleases([...allReleases]);
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td>{track.trackNum}</td>
                <td>{track.artist}</td>
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
                <td>
                  <BsCircleFill
                    color="red"
                    size="0.3rem"
                    className={!track.seen ? "opacity-100" : "opacity-0"}
                  />
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
