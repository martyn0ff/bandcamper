export default interface IRelease {
  id: number;
  artist: string;
  title: string;
  coverArt: string;
  totalTracks: number;
  availableTracks: number;
  previewUrls: number;
  audioPreviewUrls: string[];
  releasedAt: Date;
  releaseUrl: string;
  releasedBy: string;
  releaseDescription: string;
}
