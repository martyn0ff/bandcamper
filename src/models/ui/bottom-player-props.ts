import ITrack from "./track";

export interface BottomPlayerProps {
  playlist: ITrack[];
  currentTrackId: number;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}
