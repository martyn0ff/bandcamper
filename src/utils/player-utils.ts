export const secToTimestamp = (secs: number) => {
  const date = new Date(secs * 1000);
  if (secs >= 60 * 60) {
    return date.toISOString().substring(11, 19);
  }
  return date.toISOString().substring(14, 19);
};

// export const releasesToPlaylist = (releases: IRelease[]) => {
//   let playlist = [];
//   releases.forEach((release) => {
//     const track: ITrack[] = {
//       id: release.id,
//       artist: release.artist,
//       title:
//     };
//   });
// };

// export default interface ITrack {
//   id: number;
//   artist: string;
//   title: string;
//   coverArt: string;
//   audioPreviewUrl: string;
//   releasedAt: Date;
//   releaseUrl: string;
//   releasedBy: string; // bandcamp account username
//   duration: number; // seconds
// }
