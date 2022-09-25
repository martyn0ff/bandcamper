import IRelease from "../models/ui/release";

export const getUniqueBandName = (releases: IRelease[]) => {
  const uniqueBandName: string[] = [];

  releases.forEach((release) => {
    if (!uniqueBandName.includes(release.bandName)) {
      uniqueBandName.push(release.bandName);
    }
  });

  return uniqueBandName;
};
