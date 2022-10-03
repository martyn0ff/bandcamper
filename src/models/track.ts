export default interface ITrack {
  mp3Url: string;
  id: BigInt;
  artist: string;
  title: string;
  trackNum: number;
  titleLink: string;
  duration: number;
  seen: boolean;
}
