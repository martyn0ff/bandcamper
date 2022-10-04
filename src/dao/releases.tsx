import localforage from "localforage";
import fakeNetwork from "../utils/fake-network";
import IRelease from "../models/release";
import db from "../data/data.json";
import IPackage from "../models/package";
import ITrack from "../models/track";
import { storeReleases } from "../utils/localforage-utils";
import ReleaseJson from "../models/release-json";

export const getRelease = async (id: BigInt) => {
  await fakeNetwork(`release:${id}`);
  const releases = await localforage.getItem<IRelease[]>("releases");
  const release = releases?.find((release_) => release_.id === id);
  return release ?? null;
};

const parseReleases = (releasesJson: ReleaseJson[]) => {
  const parsedReleases: IRelease[] = [];
  releasesJson.forEach((release) => {
    if (release) {
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

      if (release.packages) {
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
      }

      if (release.tracks) {
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
      }

      parsedReleases.push(releaseObj);
    }
  });
  return parsedReleases;
};

export const getReleases = async (query?: string) => {
  await fakeNetwork(`releases:${query}`);
  if (query) {
    // sort releases by date
  }

  const myReleases = await localforage.getItem<IRelease[]>("releases");
  const parsedReleases: IRelease[] = parseReleases(db);

  if (myReleases) {
    parsedReleases.forEach((parsedRelease) => {
      const myReleaseWithSameId = myReleases.find(
        (myRelease) => myRelease.id === parsedRelease.id,
      );
      // If there is an update in already existing release, e.g. it's no
      // longer a preorder, then we have to bump it to the top of the list
      if (myReleaseWithSameId) {
        if (
          parsedRelease.availableTracks > myReleaseWithSameId.availableTracks
        ) {
          const idx = myReleases.indexOf(myReleaseWithSameId);
          myReleases.splice(idx, 1);
          // filter tracks with same id
          const missingTracks: ITrack[] = parsedRelease.tracks.filter(
            (parsedTrack) =>
              myReleaseWithSameId.tracks.find(
                (myReleaseTrack) => myReleaseTrack.id !== parsedTrack.id,
              ),
          );
          myReleaseWithSameId.tracks.push(...missingTracks);
          myReleaseWithSameId.tracks.sort((a, b) => a.trackNum - b.trackNum);
          myReleaseWithSameId.availableTracks = parsedRelease.availableTracks;
          myReleases.unshift(myReleaseWithSameId);
        }
      } else {
        myReleases.unshift(parsedRelease);
      }
    });
    storeReleases(myReleases);
    return myReleases;
  }

  storeReleases(parsedReleases);
  return parsedReleases;

  // return sorted releases instead
  // return releases;
};
