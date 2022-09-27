import { useState, createContext, useContext, useMemo, useRef } from "react";
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
};

export const PlayerContext = createContext<PlayerCtx | null>(null);
export const usePlayerContext = () => useContext(PlayerContext);
export const PlayerProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
    }),
    [isPlaying, currentTrack],
  );

  return (
    <PlayerContext.Provider value={ctx}>{children}</PlayerContext.Provider>
  );
};
