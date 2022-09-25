import ITrack from "./track";

export default interface IRelease {
  id: number;
  bandId: number;
  bandName: string; // parsed from url
  isPreorder: boolean;
  coverArt: string;
  type: string;
  artist: string;
  title: string;
  totalTracks: number;
  availableTracks: number;
  releaseDate: Date;
  about: string | null;
  credits: string | null;
  description: string | null;
  tracks: ITrack[];
}
