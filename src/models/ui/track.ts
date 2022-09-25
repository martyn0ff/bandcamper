export default interface ITrack {
  id: number;
  mp3Url: string;
  artist: string | null;
  title: string;
  duration: number;
}
