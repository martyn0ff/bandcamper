import IRelease from "../models/release";
import ITrack from "../models/track";
import IWatch from "../models/watch";
import bandPhotoPlaceholder from "../assets/band_photo_placeholder.svg";

export const getUniqueBandNames = (releases: IRelease[]) => {
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

export const getWatches = (releases: IRelease[]) => {
  const watches: IWatch[] = [];
  // const returnedWatches: IWatch[] = [];
  releases.forEach((release) => {
    const maybeWatch = watches.find(
      (watch) => watch.bandName === release.bandName,
    );
    if (maybeWatch) {
      maybeWatch.releases.push(release);
    } else {
      const newWatch: IWatch = {
        bandName: release.bandName,
        bandPhoto: release.bandPhoto || bandPhotoPlaceholder,
        releases: [release],
        // seen: false,
      };
      watches.push(newWatch);
    }
  });

  // watches.forEach((watch) => {
  //   const returnedWatch = {
  //     ...watch,
  //     seen: determineWatchSeen(watch.releases),
  //   };
  //   returnedWatches.push(returnedWatch);
  // });

  return watches;
};

export const calcWatchTotalAvailableTracks = (watch: IWatch) => {
  let totalAvailableTracks = 0;
  watch.releases.forEach((release) => {
    totalAvailableTracks += release.availableTracks;
  });
  console.log(`Total Tracks for this watch: ${totalAvailableTracks}`);
  return totalAvailableTracks;
};

export const calcWatchSeenTracks = (watch: IWatch) => {
  let totalSeenTracks = 0;
  watch.releases.forEach((release) => {
    totalSeenTracks += release.tracksSeen;
  });
  console.log(`Total Seen Tracks for this watch: ${totalSeenTracks}`);
  return totalSeenTracks;
};
