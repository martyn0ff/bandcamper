import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import mp3file from "../assets/music.mp3";

const Content: React.FC = () => (
  <>
    <h1>MORD</h1>
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
              Resilencia EP
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush">
            <ListGroup.Item className="px-0">
              <audio
                src={mp3file}
                controls
                controlsList="nodownload noplaybackspeed"
                className="w-100"
              ></audio>
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </>
);
export default Content;
