import localforage from "localforage";
import fakeNetwork from "./fake-network";
import IRelease from "../models/ui/release";
import db from "../data/data.json";

const resetLocalForage = async () => {
  await localforage.setItem("releases", db);
};

export const storeVolume = async (volume: number) => {
  await localforage.setItem("volume", volume);
  console.log(`Stored vol: ${volume}`);
};

export const storeCurrentTime = async (time: number) => {
  await localforage.setItem("currentTrackTime", time);
  console.log(`Stored time: ${time}`);
};

export const retrieveVolume = async () => {
  const volume: number | null = await localforage.getItem("volume");
  console.log(`Retrieved vol: ${volume}`);
  return volume;
};

export const retrieveCurrentTime = async () => {
  const time: number | null = await localforage.getItem("currentTrackTime");
  console.log(`Retrieved time: ${time}`);
  return time;
};

export default resetLocalForage;
