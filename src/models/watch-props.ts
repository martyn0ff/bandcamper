import ITrack from "./track";

export default interface WatchProps {
  setPlaylist: React.Dispatch<React.SetStateAction<ITrack[]>>;
}
