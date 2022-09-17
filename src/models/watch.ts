import IRelease from "./release";

export default interface IWatch {
  releases: IRelease[];
  releasedBy: string;
}
