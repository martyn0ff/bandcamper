import localforage from "localforage";
import fakeNetwork from "./fake-network";
import IRelease from "../models/ui/release";
import db from "../data/data.json";
import ITrack from "../models/ui/track";

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

export const storeCurrentTrack = async (track: ITrack) => {
  await localforage.setItem("currentTrack", track);
  console.log(`Stored track: ${track}`);
};

export const storeDuration = async (duration: number) => {
  await localforage.setItem("duration", duration);
  console.log(`Stored duration: ${duration}`);
};

export const storePlaylist = async (playlist: ITrack[]) => {
  await localforage.setItem("playlist", playlist);
  console.log("Stored Playlist:");
  console.log(playlist);
};

export const retrieveVolume = async () => {
  const volume: number | null = await localforage.getItem("volume");
  console.log(`Retrieved vol: ${volume}`);
  return volume;
};

export const retrieveDuration = async () => {
  const duration: number | null = await localforage.getItem("duration");
  console.log(`Retrieved duration: ${duration}`);
  return duration;
};

export const retrieveCurrentTime = async () => {
  const time: number | null = await localforage.getItem("currentTrackTime");
  console.log(`Retrieved time: ${time}`);
  return time;
};

export const retrieveCurrentTrack = async () => {
  const track: ITrack | null = await localforage.getItem("currentTrack");
  console.log(`Retrieved track: ${track}`);
  return track;
};

export const retrievePlaylist = async () => {
  const playlist: ITrack[] | null = await localforage.getItem("playlist");
  console.log("Retrieved Playlist:");
  console.log(playlist);
  return playlist;
};

export default resetLocalForage;
