import localforage from "localforage";
import fakeNetwork from "../utils/fake-network";
import IRelease from "../models/release";

export const getRelease = async (id: number) => {
  await fakeNetwork(`release:${id}`);
  const releases = await localforage.getItem<IRelease[]>("releases");
  const release = releases?.find((release_) => release_.id === id);
  return release ?? null;
};

export const getReleases = async (query?: string) => {
  await fakeNetwork(`releases:${query}`);
  const releases: IRelease[] =
    (await localforage.getItem<IRelease[]>("releases")) || [];
  if (query) {
    // sort releases by date
  }
  // return sorted releases instead
  return releases;
};
