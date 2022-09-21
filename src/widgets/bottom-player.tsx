import React, { useEffect, useState, useRef } from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  BsPlayFill,
  BsFillSkipStartFill,
  BsFillSkipEndFill,
  BsShuffle,
  BsArrowRepeat,
  BsFillVolumeDownFill,
  BsFillPauseFill,
} from "react-icons/bs";
import mp3file from "../assets/music.mp3";
import bandcampLogo from "../assets/bandcamp-logo-colored.svg";
import { secToTimestamp } from "../utils/player-utils";

const BottomPlayer: React.FC = () => {
  const [showVolume, setShowVolume] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const seekbarRef = useRef<HTMLDivElement>(null);
  const currentTimeRef = useRef<HTMLSpanElement>(null);
  const isMouseDownRef = useRef(false);
  const volumeBarRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current?.pause();
    } else {
      setIsPlaying(true);
      audioRef.current?.play();
    }
  };

  // SEEKBAR

  const changeSeekbar = (event: MouseEvent) => {
    if (seekbarRef.current && currentTimeRef.current && audioRef.current) {
      const seekbar = seekbarRef.current;
      const audio = audioRef.current;
      const currentTime = currentTimeRef.current;
      const percentage = (event.offsetX / seekbar.offsetWidth) * 100;
      seekbar.style.backgroundSize = `${percentage}% 100%`;
      currentTime.textContent = secToTimestamp(
        (audio.duration / 100) * percentage,
      );
    }
  };

  const handleMouseDownSeekbar = (event: MouseEvent) => {
    if (seekbarRef.current) {
      const seekbar = seekbarRef.current;
      const percentage = (event.offsetX / seekbar.offsetWidth) * 100;
      seekbar.style.backgroundSize = `${percentage}% 100%`;
      seekbar.addEventListener("mousemove", changeSeekbar);
      isMouseDownRef.current = true;
    }
  };

  const handleMouseUpSeekbar = (event: MouseEvent) => {
    if (seekbarRef.current && audioRef.current) {
      const seekbar = seekbarRef.current;
      const audio = audioRef.current;
      const percentage = (event.offsetX / seekbar.offsetWidth) * 100;
      seekbar.removeEventListener("mousemove", changeSeekbar, false);
      isMouseDownRef.current = false;
      audio.currentTime = (audio.duration / 100) * percentage;
    }
  };

  const handleTimeUpdate = () => {
    if (
      seekbarRef.current &&
      audioRef.current &&
      currentTimeRef.current &&
      isMouseDownRef.current === false
    ) {
      const seekbar = seekbarRef.current;
      const audio = audioRef.current;
      const currentTime = currentTimeRef.current;
      const percentage = (100 / audio.duration) * audio.currentTime;
      seekbar.style.backgroundSize = `${percentage}% 100%`;
      currentTime.textContent = secToTimestamp(audio.currentTime);
    }
  };

  const handleOnEnded = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  seekbarRef.current?.addEventListener("mousedown", handleMouseDownSeekbar);
  seekbarRef.current?.addEventListener("mouseup", handleMouseUpSeekbar);

  // VOLUME
  const changeVolume = (event: MouseEvent) => {
    if (volumeBarRef.current && audioRef.current) {
      console.log("Changing volume");
      const volumeBar = volumeBarRef.current;
      const audio = audioRef.current;
      const percentage =
        -((event.offsetY - volumeBar.offsetHeight) / volumeBar.offsetHeight) *
        100;
      volumeBar.style.backgroundSize = `100% ${100 - percentage}%`;
    }
  };

  const handleMouseDownVolume = (event: MouseEvent) => {
    if (volumeBarRef.current) {
      const volumeBar = volumeBarRef.current;
      const percentage =
        -((event.offsetY - volumeBar.offsetHeight) / volumeBar.offsetHeight) *
        100;
      volumeBar.style.backgroundSize = `100% ${100 - percentage}%`;
      volumeBar.addEventListener("mousemove", changeVolume);
      isMouseDownRef.current = true;
    }
  };

  const handleMouseUpVolume = (event: MouseEvent) => {
    if (volumeBarRef.current && audioRef.current) {
      const volumeBar = volumeBarRef.current;
      const audio = audioRef.current;
      const percentage =
        -((event.offsetY - volumeBar.offsetHeight) / volumeBar.offsetHeight) *
        100;
      volumeBar.removeEventListener("mousemove", changeVolume);
      isMouseDownRef.current = false;
      // audio.currentTime = (audio.duration / 100) * percentage;
    }
  };

  volumeBarRef.current?.addEventListener("mousedown", handleMouseDownVolume);
  volumeBarRef.current?.addEventListener("mouseup", handleMouseUpVolume);

  // ROOT LISTENER
  document.addEventListener("mouseup", () => {
    if (seekbarRef.current && volumeBarRef.current) {
      isMouseDownRef.current = false;
      seekbarRef.current.removeEventListener("mousemove", changeSeekbar);
      volumeBarRef.current.removeEventListener("mousemove", changeVolume);
    }
  });

  const displayVolume = showVolume ? "d-block" : "d-none";

  return (
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
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <BsFillPauseFill size="1.8rem" />
                ) : (
                  <BsPlayFill
                    size="1.8rem"
                    style={{ paddingLeft: "2px" }}
                  />
                )}
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
              <div
                className={`player-volume-control position-absolute bottom-100 end-25 shadow shadow-sm ${displayVolume}`}
                onMouseEnter={() => setShowVolume(true)}
                onMouseLeave={() => setShowVolume(false)}
              >
                <div
                  className="player-volume-control-container bg-light border d-flex p-2 rounded-1"
                  style={{ height: "130px", width: "30px" }}
                >
                  <div
                    className="player-volume-bar w-100 h-100"
                    style={{ cursor: "pointer" }}
                    ref={volumeBarRef}
                  />
                </div>
              </div>
              <BsFillVolumeDownFill
                size="1.8rem"
                onMouseEnter={() => setShowVolume(true)}
                onMouseLeave={() => setShowVolume(false)}
              />
            </div>
          </div>
          <div
            className="player-seekbar-control d-flex align-items-center"
            draggable={false}
          >
            <span
              className="player-seekbar-current-time disable-select"
              ref={currentTimeRef}
              draggable={false}
            >
              {secToTimestamp(audioRef.current?.currentTime || 0)}
            </span>
            <audio
              src={mp3file}
              preload="metadata"
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={() => {
                if (audioRef.current) {
                  setAudioDuration(audioRef.current.duration);
                }
              }}
              onEnded={handleOnEnded}
            />
            <div
              className="player-seekbar mx-2 disable-select w-100"
              ref={seekbarRef}
              style={{ cursor: "pointer" }}
              draggable={false}
            />
            {/* <div className="player-seekbar mx-2 d-flex">
              <div className="player-seekbar-current-position bg-primary w-25" />
            </div> */}
            <span
              className="player-seekbar-total-time disable-select"
              draggable={false}
            >
              {secToTimestamp(audioDuration || 0)}
            </span>
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
      </Container>
    </div>
  );
};

export default BottomPlayer;
