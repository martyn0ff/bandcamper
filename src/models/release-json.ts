import PackageJson from "./package-json";
import TrackJson from "./track-json";

export default interface ReleaseJson {
  total_tracks: number;
  title: string;
  release_date: string;
  artist: string;
  band_name: string;
  about: string | null;
  credits: string | null;
  band_id: number;
  selling_band_id: number;
  art_id: number;
  type: string;
  url: string;
  band_photo: string | null;
  packages: PackageJson[] | null;
  has_audio: boolean;
  id: number;
  default_price: number;
  is_purchased?: null;
  is_preorder: boolean;
  tracks: TrackJson[] | null;
  tracks_seen: number;
  available_tracks: number;
}
