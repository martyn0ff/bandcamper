import { useState, createContext, useContext, useMemo, useRef } from "react";
import IRelease from "../models/ui/release";
import ITrack from "../models/ui/track";

export type PlayerCtx = {
  // playlist: ITrack[] | null;
  playlistRef: React.MutableRefObject<ITrack[]>;
  // currentTrackId: number;
  currentTrack: ITrack | null;
  isPlaying: boolean;
  // setPlaylist: React.Dispatch<React.SetStateAction<ITrack[]>>;
  // setCurrentTrackId: React.Dispatch<React.SetStateAction<number>>;
  setCurrentTrack: React.Dispatch<React.SetStateAction<ITrack | null>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  releasesRef: React.MutableRefObject<IRelease[]>;
};

export const PlayerContext = createContext<PlayerCtx | null>(null);
export const usePlayerContext = () => useContext(PlayerContext);
export const PlayerProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const releasesRef = useRef<IRelease[]>([]);
  const playlistRef = useRef<ITrack[]>([]);

  const ctx = useMemo(
    () => ({
      // playlist,
      playlistRef,
      currentTrack,
      // currentTrackId,
      isPlaying,
      // setPlaylist,
      setCurrentTrack,
      // setCurrentTrackId,
      setIsPlaying,
      releasesRef,
    }),
    [isPlaying, currentTrack, playlistRef, releasesRef],
  );

  return (
    <PlayerContext.Provider value={ctx}>{children}</PlayerContext.Provider>
  );
};
