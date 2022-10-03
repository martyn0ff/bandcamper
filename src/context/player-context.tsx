import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  useRef,
} from "react";
import IRelease from "../models/release";
import ITrack from "../models/track";

export type PlayerCtx = {
  playlistRef: React.MutableRefObject<ITrack[]>;
  currentTrack: ITrack | null;
  currentRelease: IRelease | null;
  isPlaying: boolean;
  setCurrentTrack: React.Dispatch<React.SetStateAction<ITrack | null>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentRelease: React.Dispatch<React.SetStateAction<IRelease | null>>;
  releasesRef: React.MutableRefObject<IRelease[]>;
  allReleases: IRelease[];
  setAllReleases: React.Dispatch<React.SetStateAction<IRelease[]>>;
};

export const PlayerContext = createContext<PlayerCtx | null>(null);
export const usePlayerContext = () => useContext(PlayerContext);
export const PlayerProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRelease, setCurrentRelease] = useState<IRelease | null>(null);
  const [allReleases, setAllReleases] = useState<IRelease[]>([]);

  const releasesRef = useRef<IRelease[]>([]);
  const playlistRef = useRef<ITrack[]>([]);

  const ctx = useMemo(
    () => ({
      playlistRef,
      currentTrack,
      isPlaying,
      setCurrentTrack,
      setIsPlaying,
      releasesRef,
      currentRelease,
      setCurrentRelease,
      allReleases,
      setAllReleases,
    }),
    [
      isPlaying,
      currentTrack,
      playlistRef,
      releasesRef,
      currentRelease,
      allReleases,
    ],
  );

  return (
    <PlayerContext.Provider value={ctx}>{children}</PlayerContext.Provider>
  );
};
