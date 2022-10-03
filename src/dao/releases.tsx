import localforage from "localforage";
import fakeNetwork from "../utils/fake-network";
import IRelease from "../models/release";
import db from "../data/data.json";
import IPackage from "../models/package";
import ITrack from "../models/track";
import { storeReleases } from "../utils/localforage-utils";

export const getRelease = async (id: BigInt) => {
  await fakeNetwork(`release:${id}`);
  const releases = await localforage.getItem<IRelease[]>("releases");
  const release = releases?.find((release_) => release_.id === id);
  return release ?? null;
};

export const getReleases = async (query?: string) => {
  await fakeNetwork(`releases:${query}`);
  if (query) {
    // sort releases by date
  }

  const retrievedReleases = await localforage.getItem<IRelease[]>("releases");

  if (retrievedReleases) {
    return retrievedReleases;
  }

  const releases: IRelease[] = [];
  db.forEach((release) => {
    const releaseObj: IRelease = {
      totalTracks: release.total_tracks,
      title: release.title,
      releaseDate: new Date(release.release_date),
      artist: release.artist,
      bandName: release.band_name,
      about: release.about,
      credits: release.credits,
      bandId: BigInt(release.band_id),
      sellingBandId: BigInt(release.selling_band_id),
      artId: BigInt(release.art_id),
      type: release.type,
      packages: [],
      id: BigInt(release.id),
      defaultPrice: release.default_price,
      isPreorder: release.is_preorder,
      tracks: [],
      url: release.url,
      bandPhoto: release.band_photo,
      tracksSeen: release.tracks_seen,
      availableTracks: release.available_tracks,
    };

    release.packages.forEach((pkg) => {
      const pkgObj: IPackage = {
        url: pkg.url,
        typeName: pkg.type_name,
        typeTitle: pkg.type_title,
        description: pkg.description,
        price: pkg.price,
        currency: pkg.currency,
        downloadReleaseDate: new Date(pkg.download_release_date),
        quantityAvailable: pkg.quantity_available,
      };
      releaseObj.packages.push(pkgObj);
    });

    release.tracks.forEach((track) => {
      const trackObj: ITrack = {
        mp3Url: track.mp3_url,
        id: BigInt(track.id),
        artist: track.artist,
        title: track.title,
        trackNum: track.track_num,
        titleLink: track.title_link,
        duration: track.duration,
        seen: track.seen,
      };

      releaseObj.tracks.push(trackObj);
    });

    releases.push(releaseObj);
  });

  storeReleases(releases);

  // return sorted releases instead
  return releases;
};
