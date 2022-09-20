import localforage from "localforage";
import fakeNetwork from "./fake-network";
import { exampleRelease1, exampleRelease2 } from "../widgets/release";
import IRelease from "../models/ui/release";

const resetLocalForage = async () => {
  await localforage.clear();
  const exampleReleases: IRelease[] = [
    exampleRelease1,
    exampleRelease2,
    {
      ...exampleRelease1,
      id: 999,
    },
  ];
  await localforage.setItem("releases", exampleReleases);
};

export default resetLocalForage;
