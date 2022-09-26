import { useState, createContext, useContext, useMemo } from "react";
import ITrack from "../models/ui/track";

export type PlayerCtx = {
  playlist: ITrack[] | null;
  currentTrackId: number;
  isPlaying: boolean;
  setPlaylist: React.Dispatch<React.SetStateAction<ITrack[]>>;
  setCurrentTrackId: React.Dispatch<React.SetStateAction<number>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlayerContext = createContext<PlayerCtx | null>(null);
export const usePlayerContext = () => useContext(PlayerContext);
export const PlayerProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [playlist, setPlaylist] = useState<ITrack[]>([]);
  const [currentTrackId, setCurrentTrackId] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const ctx = useMemo(
    () => ({
      playlist,
      currentTrackId,
      isPlaying,
      setPlaylist,
      setCurrentTrackId,
      setIsPlaying,
    }),
    [playlist, isPlaying, currentTrackId],
  );

  return (
    <PlayerContext.Provider value={ctx}>{children}</PlayerContext.Provider>
  );
};
