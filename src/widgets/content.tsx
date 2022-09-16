import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import mp3file from "../assets/music.mp3";

const Content: React.FC = () => (
  <div className="p-3">
    <div>
      <h1 className="fw-bold mb-0">MORD</h1>
      <p>4 unseen releases</p>
    </div>
    <Accordion alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div className="d-flex">
            <Image
              src="https://f4.bcbits.com/img/a2018247290_16.jpg"
              width={48}
              className="rounded-2 me-1"
            ></Image>
            <div className="d-flex flex-column justify-content-start ps-2">
              <p className="fw-bold mb-1">Confluencia</p>
              <div>
                Resilencia EP{" "}
                <span className="text-muted">
                  (announced 1h ago, 6/6 previews available)
                </span>
              </div>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="track-description mb-2">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Deserunt, quidem et. Optio quod aliquam laboriosam, ipsum
              distinctio tempore nostrum reprehenderit. Magnam, iste est
              exercitationem quae ducimus repellendus labore corporis quisquam!
              Optio repudiandae cumque dolor, maxime repellendus facere tenetur
              numquam non! Magnam harum tenetur nesciunt odit porro enim! Quasi,
              eos fuga?
            </p>
            <Button className="me-2">Buy Album</Button>
            <Button>Add to Wishlist</Button>
          </div>
          <ListGroup variant="flush">
            <ListGroup.Item className="px-0">
              <div className="d-flex align-items-center">
                <audio
                  src={mp3file}
                  controls
                  controlsList="nodownload noplaybackspeed"
                  className="w-100 me-3"
                ></audio>
                <Button className="text-nowrap px-4">Buy</Button>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0 mt-2">
              <div className="d-flex align-items-center">
                <audio
                  src={mp3file}
                  controls
                  controlsList="nodownload noplaybackspeed"
                  className="w-100 me-3"
                ></audio>
                <Button className="text-nowrap px-4">Buy</Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <div className="d-flex">
            <Image
              src="https://f4.bcbits.com/img/a2018247290_16.jpg"
              width={48}
              className="rounded-2 me-1"
            ></Image>
            <div className="d-flex flex-column justify-content-start ps-2">
              <p className="fw-bold mb-1">Confluencia</p>
              Resilencia EP
            </div>
          </div>
        </Accordion.Header>{" "}
        <Accordion.Body>
          <ListGroup variant="flush">
            <ListGroup.Item className="px-0">
              <div className="d-flex align-items-center">
                <audio
                  src={mp3file}
                  controls
                  controlsList="nodownload noplaybackspeed"
                  className="w-100 me-3"
                ></audio>
                <Button className="text-nowrap px-4">Buy</Button>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0 mt-2">
              <div className="d-flex align-items-center">
                <audio
                  src={mp3file}
                  controls
                  controlsList="nodownload noplaybackspeed"
                  className="w-100 me-3"
                ></audio>
                <Button className="text-nowrap px-4">Buy</Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
);
export default Content;
