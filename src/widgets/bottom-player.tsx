import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {
  BsPlayFill,
  BsFillSkipStartFill,
  BsFillSkipEndFill,
  BsShuffle,
  BsArrowRepeat,
  BsFillVolumeDownFill,
} from "react-icons/bs";
import mp3file from "../assets/music.mp3";
import bandcampLogo from "../assets/bandcamp-logo-colored.svg";

const BottomPlayer: React.FC = () => (
  <div className="bottom-player border-top shadow shadow-sm">
    <Container
      fluid
      className="d-flex align-items-center h-100 justify-content-center px-3"
    >
      <div className="d-flex">
        <Image
          src="https://f4.bcbits.com/img/0024816791_10.jpg"
          width={56}
          height={56}
          style={{ objectFit: "cover" }}
          className="player-album rounded-3 shadow shadow-sm me-2"
        />
        <div className="d-flex flex-column">
          <p
            className="fw-bold"
            style={{ lineHeight: "1.0", marginBottom: "0.3rem" }}
          >
            Artist
          </p>
          <p
            className="mb-0"
            style={{ lineHeight: "1.0" }}
          >
            Track Name Which Is Long
          </p>
        </div>
      </div>

      <div className="player-controls d-flex flex-column flex-grow-1 px-4">
        <div className="player-controls-buttons d-flex justify-content-between align-items-center mb-0 pb-0">
          <div className="empty" />

          <div className="d-flex">
            <Button
              variant="link"
              className="player-control-button p-0 me-3"
            >
              <BsShuffle size="1.35rem" />
            </Button>
            <Button
              variant="link"
              className="player-control-button p-0 me-3"
            >
              <BsFillSkipStartFill size="1.8rem" />
            </Button>
            <Button
              variant="primary"
              className="rounded-circle d-flex align-items-center justify-content-center p-1 me-3"
              // style={{ width: "40px", height: "40px" }}
            >
              <BsPlayFill
                size="1.8rem"
                style={{ paddingLeft: "2px" }}
              />
            </Button>
            <Button
              variant="link"
              className="player-control-button p-0 me-3"
            >
              <BsFillSkipEndFill size="1.8rem" />
            </Button>
            <Button
              variant="link"
              className="player-control-button p-0"
            >
              <BsArrowRepeat size="1.45rem" />
            </Button>
          </div>
          <div className="align-self-center position-relative">
            <div className="position-absolute bottom-100 end-25 shadow shadow-sm mb-1">
              <div
                className="bg-light border d-flex p-2 rounded-1"
                style={{ height: "130px", width: "30px" }}
              >
                <div className="player-volume-bar w-100 h-100 d-flex flex-column-reverse">
                  <div className="player-volume-current-position bg-primary h-50" />
                </div>
              </div>
            </div>
            <BsFillVolumeDownFill size="1.8rem" />
          </div>
        </div>
        <div className="player-seekbar-control d-flex align-items-center">
          <span>00:00</span>
          <div className="player-seekbar mx-2 d-flex">
            <div className="player-seekbar-current-position bg-primary w-25" />
          </div>
          <span>99:99</span>
        </div>
      </div>
      <div className="streaming-service-logo d-flex flex-column justify-content-center h-100 align-items-end">
        <Image
          src={bandcampLogo}
          height={16}
          className="mb-3"
        />
        <Button
          size="sm"
          variant="outline-primary"
        >
          Get on Bandcamp
        </Button>
      </div>

      {/* <audio
      src={mp3file}
      controls
      controlsList="nodownload"
      className="flex-grow-1"
    /> */}
    </Container>
  </div>
);

export default BottomPlayer;
