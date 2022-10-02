import localforage from "localforage";
import fakeNetwork from "../utils/fake-network";
import IRelease from "../models/release";
import db from "../data/data.json";
import IPackage from "../models/package";
import ITrack from "../models/track";

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

  // We want to:
  // 0. Check if releases are stored in localforage
  // 1. If they are, then iterate through db
  //    1a. See if retrievedReleases has release with same id as db.release.
  //        id
  //    1b. If it does, check if they are are deep equal, EXCEPT their seen
  //        and .track.url values
  //    1c. If releases are not deep equal with said rules, db's release
  //        overwrites localforage entry of this release
  //    1d. If releases are deep equal with said rules, do nothing
  // 2. If they are not, simply push whole db to localforage's releases
  //    property

  // const { seen: seenDb, tracks: tracksDb, ...restDb } = db;
  // const { seen: seenRet, tracks: tracksRet, ...restRet } = retrievedReleases;

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
      };

      releaseObj.tracks.push(trackObj);
    });

    releases.push(releaseObj);
  });

  // return sorted releases instead
  return releases;
};
