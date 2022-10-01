import ITrack from "./track";
import IPackage from "./package";

export default interface IRelease {
  totalTracks: number;
  title: string;
  releaseDate: Date;
  artist: string;
  bandName: string;
  about: string | null;
  credits: string | null;
  bandId: BigInt;
  sellingBandId: BigInt;
  artId: BigInt;
  type: string;
  packages: IPackage[];
  id: BigInt;
  defaultPrice: number;
  isPreorder: boolean;
  tracks: ITrack[];
  url: string;
}
