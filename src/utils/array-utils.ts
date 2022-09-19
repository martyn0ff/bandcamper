import IRelease from "../models/ui/release";

export const getUniqueReleasedBy = (releases: IRelease[]) => {
  const uniqueReleasedBy: string[] = [];

  releases.forEach((release) => {
    if (!uniqueReleasedBy.includes(release.releasedBy)) {
      uniqueReleasedBy.push(release.releasedBy);
    }
  });

  return uniqueReleasedBy;
};
