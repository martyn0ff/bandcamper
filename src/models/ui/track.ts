export default interface ITrack {
  id: number;
  trackNum: number;
  mp3Url: string;
  artist: string | null;
  title: string;
  duration: number;
  coverArt: string;
}
