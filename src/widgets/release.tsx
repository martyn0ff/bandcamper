import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import mp3file from "../assets/music.mp3";
import IRelease from "../models/ui/release";
import { ReleaseProps } from "../models/ui/release-props";
import { sha256 } from "../utils/hashing";

export const exampleRelease1: IRelease = {
  id: 1000,
  artist: "Confluencia",
  title: "Resilencia EP",
  coverArt: "https://f4.bcbits.com/img/a2018247290_16.jpg",
  totalTracks: 1,
  previewUrls: 1,
  availableTracks: 1,
  audioPreviewUrls: [mp3file],
  releasedAt: new Date(),
  releaseUrl: "https://mord.bandcamp.com/album/resiliencia-ep-2",
  releasedBy: "mord",
  releaseDescription:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis, quia mollitia, id beatae nemo quibusdam ut illum doloremque itaque quaerat velit ipsum consequuntur omnis ad reiciendis obcaecati atque minus ea accusamus veritatis laborum! Aperiam blanditiis ex nisi vitae facilis corrupti porro sapiente sequi, quod consequatur? Provident dolores in blanditiis voluptatem.",
};

export const exampleRelease2: IRelease = {
  id: 1001,
  artist: "Pfirter",
  title: "Altered States",
  coverArt: "https://f4.bcbits.com/img/a2156897531_16.jpg",
  totalTracks: 2,
  previewUrls: 2,
  availableTracks: 2,
  audioPreviewUrls: [mp3file, mp3file],
  releasedAt: new Date(),
  releaseUrl: "https://pfirter.bandcamp.com/album/altered-states",
  releasedBy: "pfirter",
  releaseDescription:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit dolores omnis quod delectus dolorum dolore animi pariatur quibusdam? Possimus expedita repellendus aperiam. Reiciendis sunt laudantium quibusdam voluptates inventore saepe quasi quidem aliquam, a autem, nam repudiandae, debitis velit soluta.",
};

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
            {release.releasedAt.toDateString()}
          </span>
        </div>
      </div>
    </Accordion.Header>
    <Accordion.Body>
      <div className="release-description mb-3">
        <p>{release.releaseDescription}</p>
        <Button className="me-2">Buy Album</Button>
        <Button>Add to Wishlist</Button>
      </div>
      <ListGroup>
        {release.audioPreviewUrls.map((url) => (
          <ListGroup.Item
            key={sha256(Math.random().toString())}
            className="py-0"
          >
            <div className="d-flex align-items-center">
              <audio
                src={url}
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
