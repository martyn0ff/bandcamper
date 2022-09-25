import localforage from "localforage";
import fakeNetwork from "../utils/fake-network";
import IRelease from "../models/ui/release";
import db from "../data/data.json";

export const getRelease = async (id: number) => {
  await fakeNetwork(`release:${id}`);
  const releases = await localforage.getItem<IRelease[]>("releases");
  const release = releases?.find((release_) => release_.id === id);
  return release ?? null;
};

const replaceNullArtists = (releases: {}[]) => {};

export const getReleases = async (query?: string) => {
  await fakeNetwork(`releases:${query}`);
  if (query) {
    // sort releases by date
  }
  const releases: IRelease[] = [];
  db.forEach((release) => {
    const releaseObj = {
      ...release,
      availableTracks: release.tracks.length,
      releaseDate: new Date(release.releaseDate),
    };
    releases.push(releaseObj);
  });

  releases.forEach((release) => {
    release.tracks.forEach((track) => {
      if (track.artist === null) {
        const trk = track;
        trk.artist = release.artist;
      }
    });
  });
  // return sorted releases instead
  return releases;
};
