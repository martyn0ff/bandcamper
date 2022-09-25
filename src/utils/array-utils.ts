import IRelease from "../models/ui/release";
import ITrack from "../models/ui/track";

export const getUniqueBandName = (releases: IRelease[]) => {
  const uniqueBandName: string[] = [];

  releases.forEach((release) => {
    if (!uniqueBandName.includes(release.bandName)) {
      uniqueBandName.push(release.bandName);
    }
  });

  return uniqueBandName;
};

export const getTracks = (releases: IRelease[]) => {
  const tracks: ITrack[] = [];
  releases.forEach((release) => {
    release.tracks.forEach((track) => {
      tracks.push(track);
    });
  });
  return tracks;
};
