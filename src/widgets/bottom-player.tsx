import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsPlayFill,
  BsShuffle,
} from "react-icons/bs";
import bandcampLogo from "../assets/bandcamp-logo-colored.svg";
import VolumeIcon from "../components/VolumeIcon";
import {
  retrieveCurrentTime,
  retrieveVolume,
  retrieveCurrentTrack,
  retrievePlaylist,
  retrieveDuration,
  storeCurrentTime,
  storeVolume,
  storeCurrentTrack,
  storePlaylist,
  storeDuration,
} from "../utils/localforage-utils";
import { secToTimestamp } from "../utils/player-utils";
import { PlayerCtx, usePlayerContext } from "../context/player-context";

const BottomPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekbarRef = useRef<HTMLInputElement>(null);
  const volumeBarRef = useRef<HTMLInputElement>(null);
  const volumeBeforeMute = useRef(0);

  const [showVolume, setShowVolume] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(-1);
  const {
    playlistRef,
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
  } = usePlayerContext() as PlayerCtx;

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playlist = playlistRef.current;

  const toPrevTrack = () => {
    if (playlist && currentTrackIdx > 0) {
      const prevTrack = playlist[currentTrackIdx - 1];
      setCurrentTrack(prevTrack);
    }
  };

  const toNextTrack = () => {
    if (playlist && currentTrackIdx < playlist.length - 1) {
      const nextTrack = playlist[currentTrackIdx + 1];
      setCurrentTrack(nextTrack);
    }
  };

  const handleSeekbarPlaying = () => {
    if (seekbarRef.current && audioRef.current && !isSeeking) {
      seekbarRef.current.value = String(audioRef.current.currentTime);
      seekbarRef.current.style.setProperty(
        "--seekbar-progress",
        `${(Number(seekbarRef.current.value) / duration) * 100}%`,
      );
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeekbarSeeking = () => {
    setIsSeeking(true);
    if (seekbarRef.current && audioRef.current) {
      seekbarRef.current.style.setProperty(
        "--seekbar-progress",
        `${(Number(seekbarRef.current.value) / duration) * 100}%`,
      );
      setCurrentTime(Number(seekbarRef.current.value));
    }
  };

  // sync seekbar position and audio position
  const changeTime = () => {
    if (audioRef.current && seekbarRef.current) {
      audioRef.current.currentTime = Number(seekbarRef.current.value);
      setIsSeeking(false);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const changeVolume = () => {
    if (audioRef.current && volumeBarRef.current) {
      audioRef.current.volume = Number(volumeBarRef.current.value) / 100;
      volumeBarRef.current.style.setProperty(
        "--volume",
        `${Number(volumeBarRef.current.value)}%`,
      );
      setVolume(audioRef.current.volume);
      if (isMuted) {
        setIsMuted(false);
      }
    }
  };

  // play
  useEffect(() => {
    if (isPlaying) {
      audioRef?.current?.play();
    } else {
      audioRef?.current?.pause();
    }
  }, [isPlaying]);

  // load & restore volume
  useEffect(() => {
    retrieveVolume().then((vol) => {
      if ((vol || vol === 0) && volumeBarRef.current) {
        console.log(`Vol = ${vol}`);
        volumeBarRef.current.value = String(vol * 100);
        changeVolume();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // load & restore playback progress
  useLayoutEffect(() => {
    retrieveCurrentTime()
      .then((time) => {
        if (time) {
          setCurrentTime(time);
          console.log(`CurrentTime: ${currentTime}`);
          console.log(`Duration: ${duration}`);
          console.log(`AudioRef: ${audioRef.current}`);
          console.log(`SeekbarRef: ${seekbarRef.current}`);
          if (
            audioRef.current // &&
            // seekbarRef.current &&
            // currentTime &&
            // duration
          ) {
            audioRef.current.currentTime = currentTime;
            // seekbarRef.current.style.setProperty(
            //   "--seekbar-progress",
            //   `${(Number(seekbarRef.current.value) / duration) * 100}%`,
            // );
            // console.log(
            //   `${(Number(seekbarRef.current.value) / duration) * 100}%`,
            // );
          }
        }
      })
      .catch((e) => console.error(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // load & restore playlist
  useEffect(() => {
    retrievePlaylist().then((playlist_) => {
      if (playlist_) {
        playlistRef.current = playlist_;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // load & restore current track
  useEffect(() => {
    retrieveCurrentTrack().then((track) => {
      if (track) {
        setCurrentTrack(track);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // load & restore duration
  useEffect(() => {
    retrieveDuration().then((duration_) => {
      if (duration_) {
        setDuration(duration);
        if (seekbarRef.current) {
          seekbarRef.current.style.setProperty(
            "--seekbar-progress",
            `${(Number(seekbarRef.current.value) / duration) * 100}%`,
          );
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mute/unmute
  useEffect(() => {
    if (audioRef.current && volumeBarRef.current && volumeBeforeMute) {
      if (isMuted) {
        audioRef.current.muted = true;
        volumeBeforeMute.current = Number(volumeBarRef.current.value);
        volumeBarRef.current.value = "0";
      } else {
        audioRef.current.muted = false;
        volumeBarRef.current.value = String(volumeBeforeMute.current);
      }

      volumeBarRef.current.style.setProperty(
        "--volume",
        `${Number(volumeBarRef.current.value)}%`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMuted]);

  useEffect(() => {
    if (playlist && currentTrack) {
      const trackIdx = playlist?.findIndex(
        // (track) => track.id === currentTrackId,
        (track) => track === currentTrack,
      );
      if (trackIdx !== -1) {
        setCurrentTrackIdx(currentTrackIdx);
      }
      if (isPlaying && audioRef.current) {
        audioRef.current.play();
      }
      setDuration(currentTrack.duration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  useEffect(() => {
    if (seekbarRef.current) {
      seekbarRef.current.style.setProperty(
        "--seekbar-progress",
        `${(Number(seekbarRef.current.value) / duration) * 100}%`,
      );
    }
  }, [currentTime, duration]);

  window.onbeforeunload = (e) => {
    e.preventDefault();
    storeCurrentTime(currentTime);
    storeVolume(volume);
    if (currentTrack) {
      storeCurrentTrack(currentTrack);
    }
    storePlaylist(playlistRef.current);
    storeDuration(duration);
  };

  const displayVolume = showVolume ? "d-block" : "d-none";
  const isCurrentTrackIdxLast = (playlist &&
    currentTrackIdx === playlist.length - 1) as boolean;
  const isCurrentTrackIdxFirst = (playlist && currentTrackIdx === 0) as boolean;

  return (
    <div
      className="bottom-player border-top shadow shadow-sm"
      style={{ minHeight: "99px" }}
    >
      <Container
        fluid
        className="d-flex align-items-center h-100 justify-content-center px-3"
      >
        <div className="d-flex player-track-info">
          <Image
            src={currentTrack?.coverArt}
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
              {currentTrack?.artist}
            </p>
            <p
              className="mb-0"
              style={{ lineHeight: "1.0" }}
            >
              {currentTrack?.title}
            </p>
          </div>
        </div>

        <div className="player-controls d-flex flex-column flex-grow-1 px-4">
          <div className="player-controls-buttons d-flex justify-content-between align-items-center mb-0 pb-0">
            <div className="empty" />

            <div className="d-flex">
              <Button
                variant="link"
                className="player-control-button p-0 me-3 position-relative"
              >
                <span
                  className="py-0 px-1 position-absolute top-0 start-0 fw-bold lh-1"
                  style={{ fontSize: "9px" }}
                >
                  ON
                </span>
                <BsShuffle size="1.35rem" />
              </Button>

              <Button
                variant="link"
                className="player-control-button p-0 me-3"
                onClick={toPrevTrack}
                disabled={isCurrentTrackIdxFirst}
              >
                <BsFillSkipStartFill size="1.8rem" />
              </Button>
              <Button
                variant="primary"
                className="rounded-circle d-flex align-items-center justify-content-center p-1 me-3"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <BsFillPauseFill
                    size="1.8rem"
                    onClick={() => setIsPlaying(!isPlaying)}
                  />
                ) : (
                  <BsPlayFill
                    size="1.8rem"
                    style={{ paddingLeft: "2px" }}
                    onClick={() => setIsPlaying(!isPlaying)}
                  />
                )}
              </Button>
              <Button
                variant="link"
                className="player-control-button p-0 me-3"
                onClick={toNextTrack}
                disabled={isCurrentTrackIdxLast}
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
                  className="player-volume-control-container bg-light border d-flex justify-content-center p-2 rounded-1"
                  style={{ height: "130px", width: "30px" }}
                >
                  <input
                    type="range"
                    className="player-volume-bar d-flex"
                    style={{ width: "110px", cursor: "pointer" }}
                    onChange={changeVolume}
                    min="0"
                    max="100"
                    ref={volumeBarRef}
                    // defaultValue={volume}
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
          <div className="player-seekbar-control d-flex align-items-center">
            <span className="player-seekbar-current-time disable-select">
              {secToTimestamp(currentTime)}
            </span>
            <audio
              src={
                // playlist?.find((track) => track.id === currentTrackId)?.mp3Url
                currentTrack?.mp3Url
              }
              preload="metadata"
              ref={audioRef}
              onLoadedMetadata={() => {
                setDuration(
                  // playlist?.find((track) => track.id === currentTrackId)
                  //   ?.duration || 0,
                  currentTrack?.duration || 0,
                );
              }}
              onEnded={() => setIsPlaying(false)}
              onTimeUpdate={handleSeekbarPlaying}
            />
            <input
              type="range"
              value={currentTime}
              className="mx-2 player-seekbar"
              min="0"
              max={
                // playlist?.find((track) => track.id === currentTrackId)
                //   ?.duration || 0
                currentTrack?.duration || 0
              }
              ref={seekbarRef}
              onChange={handleSeekbarSeeking}
              onMouseUp={changeTime}
            />
            <span className="player-seekbar-total-time disable-select">
              {secToTimestamp(duration || 0)}
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
