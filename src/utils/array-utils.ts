import IRelease from "../models/release";
import ITrack from "../models/track";

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

export const getReleaseByTrack = (track: ITrack, releases: IRelease[]) => {
  const release = releases.find((rel) => rel.tracks.includes(track));
  if (release) {
    return release;
  }
  return null;
};
