import React, { useEffect, useState, useRef } from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {
  BsPlayFill,
  BsFillSkipStartFill,
  BsFillSkipEndFill,
  BsShuffle,
  BsArrowRepeat,
  BsFillPauseFill,
} from "react-icons/bs";
import mp3file from "../assets/music.mp3";
import bandcampLogo from "../assets/bandcamp-logo-colored.svg";
import { secToTimestamp } from "../utils/player-utils";
import VolumeIcon from "../components/VolumeIcon";
import {
  retrieveVolume,
  retrieveCurrentTime,
  storeVolume,
  storeCurrentTime,
} from "../utils/localforage-utils";

const BottomPlayer: React.FC = () => {
  const [showVolume, setShowVolume] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState<number | null>(null);

  const seekbarOnMouseMoveEventAttachedRef = useRef(false);
  const volumeBarOnMouseMoveEventAttachedRef = useRef(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const seekbarRef = useRef<HTMLDivElement>(null);
  const currentTimeRef = useRef<HTMLSpanElement>(null);
  const isMouseDownRef = useRef(false);
  const volumeBarRef = useRef<HTMLDivElement>(null);

  // PLAY

  const togglePlay = () => {
    if (audioRef.current) {
      const audio = audioRef.current;
      if (isPlaying) {
        setIsPlaying(false);
        setCurrentTime(audio.currentTime);
        audio.pause();
      } else {
        setIsPlaying(true);
        audio.play();
      }
    }
  };

  // SEEKBAR

  const changeSeekbar = (event: MouseEvent) => {
    if (seekbarRef.current && currentTimeRef.current && audioRef.current) {
      const seekbar = seekbarRef.current;
      const audio = audioRef.current;
      const currentTimeSpan = currentTimeRef.current;
      setCurrentTime(audio.currentTime);
      const percentage = (event.offsetX / seekbar.offsetWidth) * 100;
      seekbar.style.backgroundSize = `${percentage}% 100%`;
      currentTimeSpan.textContent = secToTimestamp(
        (audio.duration / 100) * percentage,
      );
    }
  };

  const handleMouseDownSeekbar = (event: MouseEvent) => {
    if (seekbarRef.current) {
      const seekbar = seekbarRef.current;
      const percentage = (event.offsetX / seekbar.offsetWidth) * 100;
      seekbar.style.backgroundSize = `${percentage}% 100%`;
      if (!seekbarOnMouseMoveEventAttachedRef.current) {
        seekbar.addEventListener("mousemove", changeSeekbar);
        seekbarOnMouseMoveEventAttachedRef.current = true;
      }
      isMouseDownRef.current = true;
    }
  };

  const handleMouseUpSeekbar = (event: MouseEvent) => {
    if (seekbarRef.current && audioRef.current) {
      const seekbar = seekbarRef.current;
      const audio = audioRef.current;
      const percentage = (event.offsetX / seekbar.offsetWidth) * 100;
      if (seekbarOnMouseMoveEventAttachedRef.current) {
        seekbar.removeEventListener("mousemove", changeSeekbar);
        seekbarOnMouseMoveEventAttachedRef.current = false;
      }
      isMouseDownRef.current = false;
      audio.currentTime = (audio.duration / 100) * percentage;
      setCurrentTime(audio.currentTime);
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
      const currentTimeSpan = currentTimeRef.current;
      const percentage = (100 / audio.duration) * audio.currentTime;
      seekbar.style.backgroundSize = `${percentage}% 100%`;
      currentTimeSpan.textContent = secToTimestamp(audio.currentTime);
    }
  };

  const handleOnEnded = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  // VOLUME
  const changeVolume = (event: MouseEvent) => {
    if (volumeBarRef.current && audioRef.current) {
      const volumeBar = volumeBarRef.current;
      const percentage =
        ((volumeBar.offsetHeight - event.offsetY) / volumeBar.offsetHeight) *
        100;
      volumeBar.style.backgroundSize = `100% ${100 - percentage}%`;
      setVolume(percentage / 100);
    }
  };

  const handleMouseDownVolume = (event: MouseEvent) => {
    if (volumeBarRef.current && audioRef.current) {
      const volumeBar = volumeBarRef.current;
      const percentage =
        ((volumeBar.offsetHeight - event.offsetY) / volumeBar.offsetHeight) *
        100;
      volumeBar.style.backgroundSize = `100% ${100 - percentage}%`;
      if (!volumeBarOnMouseMoveEventAttachedRef.current) {
        volumeBar.addEventListener("mousemove", changeVolume);
        volumeBarOnMouseMoveEventAttachedRef.current = true;
      }
      isMouseDownRef.current = true;
    }
  };

  const handleMouseUpVolume = (event: MouseEvent) => {
    if (volumeBarRef.current && audioRef.current) {
      const volumeBar = volumeBarRef.current;
      const percentage =
        -((event.offsetY - volumeBar.offsetHeight) / volumeBar.offsetHeight) *
        100;
      if (volumeBarOnMouseMoveEventAttachedRef.current) {
        volumeBar.removeEventListener("mousemove", changeVolume);
        volumeBarOnMouseMoveEventAttachedRef.current = false;
      }
      isMouseDownRef.current = false;
      setVolume(percentage / 100);
    }
  };

  // BODY HANDLERS

  const handleMouseMove = () => {
    if (seekbarRef.current && volumeBarRef.current) {
      isMouseDownRef.current = false;
      seekbarRef.current.removeEventListener("mousemove", changeSeekbar);
      volumeBarRef.current.removeEventListener("mousemove", changeVolume);
    }
  };

  // FX

  // Change volumebar visually with mouse click
  useEffect(() => {
    volumeBarRef.current?.addEventListener("mousedown", handleMouseDownVolume);
    volumeBarRef.current?.addEventListener("mouseup", handleMouseUpVolume);

    const oldCurrent = volumeBarRef.current;

    return () => {
      oldCurrent?.removeEventListener("mousedown", handleMouseDownVolume);
      oldCurrent?.removeEventListener("mouseup", handleMouseUpVolume);
    };
  });

  // Store volume to localforage every time it changes
  useEffect(() => {
    storeVolume(volume);
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Store current time to localforage every time it changes
  useEffect(() => {
    storeCurrentTime(currentTime);
  }, [currentTime]);

  // Seekbar visual representation
  useEffect(() => {
    seekbarRef.current?.addEventListener("mousedown", handleMouseDownSeekbar);
    seekbarRef.current?.addEventListener("mouseup", handleMouseUpSeekbar);

    const oldCurrent = seekbarRef.current;

    return () => {
      oldCurrent?.removeEventListener("mousedown", handleMouseDownSeekbar);
      oldCurrent?.removeEventListener("mouseup", handleMouseUpSeekbar);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redraw volume bar after first render and update its state
  useEffect(() => {
    if (audioRef.current) {
      retrieveVolume()
        .then((vol) => {
          if (vol && volumeBarRef.current) {
            const volumeBar = volumeBarRef.current;
            setVolume(vol);
            console.log(`Vol set to ${vol}`);
            volumeBar.style.backgroundSize = `100% ${(1 - vol) * 100}%`;
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, []);

  // Restore current position on seekbar
  useEffect(() => {
    retrieveCurrentTime().then((time) => {
      if (time && audioRef.current) {
        const audio = audioRef.current;
        setCurrentTime(time);
        audio.currentTime = time;
        console.log(`Time set to ${time}`);
      }
    });
  }, []);

  // Mute/unmute
  useEffect(() => {
    if (volumeBarRef.current && audioRef.current) {
      const volumeBar = volumeBarRef.current;
      if (isMuted) {
        audioRef.current.muted = true;
        volumeBar.style.backgroundSize = `100% 100%`;
      } else {
        audioRef.current.muted = false;
        console.log("Unmuted");
        volumeBar.style.backgroundSize = `100% ${
          (1 - audioRef.current.volume) * 100
        }%`;
      }
    }
  }, [isMuted]);

  // Don't react on mouse move inside seekbar or volume bar if user clicks and navigates away from either while holding mouse button
  document.addEventListener("mouseup", handleMouseMove);

  // Persist volume and current time on seekbar on reload
  // useEffect(() => {
  //   window.addEventListener("beforeunload", () => {
  //     console.log(`Will store: ${volume} volume`);
  //     storeVolume(volume);
  //     storeCurrentTime(currentTime);
  //     console.log("Persist");
  //   });
  // });

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
            <div
              className="align-self-center position-relative"
              style={{ cursor: "pointer" }}
            >
              <div
                className={`player-volume-control position-absolute bottom-100 end-25 shadow shadow-sm ${displayVolume}`}
                onMouseEnter={() => setShowVolume(true)}
                onMouseLeave={() => setShowVolume(false)}
              >
                <div
                  className="player-volume-control-container bg-light border d-flex justify-content-center p-2 rounded-1"
                  style={{ height: "130px", width: "30px" }}
                >
                  {/* <div
                    className="player-volume-bar w-100 h-100"
                    style={{ cursor: "pointer" }}
                    ref={volumeBarRef}
                  /> */}
                  <input
                    type="range"
                    className="player-volume-bar-real d-flex"
                    style={{ width: "110px" }}
                  />
                </div>
              </div>
              <VolumeIcon
                volume={volume}
                muted={isMuted}
                setShowVolume={setShowVolume}
                setMuted={setIsMuted}
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
            <input
              type="range"
              defaultValue="0"
              className="w-100 mx-2 player-seekbar-real"
            />
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
