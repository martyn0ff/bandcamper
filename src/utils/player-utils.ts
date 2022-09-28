export const secToTimestamp = (secs: number) => {
  const date = new Date(secs * 1000);
  if (secs >= 60 * 60) {
    return date.toISOString().substring(11, 19);
  }
  return date.toISOString().substring(14, 19);
};

export const repeatModeToString = (repeatMode: number) => {
  if (repeatMode === 0) {
    return "";
  }
  if (repeatMode === 1) {
    return "TRK";
  }
  return "RLS";
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
