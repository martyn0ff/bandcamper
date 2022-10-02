import { useEffect } from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router";
import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import Release from "../widgets/release";
import WatchSortSearch from "../widgets/releases-sort-search";
import { getReleases } from "../dao/releases";
import IWatch from "../models/watch";
import { usePlayerContext, PlayerCtx } from "../context/player-context";
import { storePlaylist } from "../utils/localforage-utils";
import bandPhotoPlaceholder from "../assets/band_photo_placeholder.svg";

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<IWatch> => {
  const releases = await getReleases();
  const filteredReleases = releases.filter(
    (release) => String(release.bandName) === (params.watchId as string),
  );
  if (filteredReleases.length === 0) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  const { bandPhoto } = filteredReleases[0];
  // TODO from filteredReleases if its length > 0, we shall obtain
  // band_photo property, add it to return statement, destructure it from
  // useLoaderData() and use it to render band photo on Watch's page.
  return {
    releases: filteredReleases,
    bandName: params.watchId as string,
    bandPhoto: bandPhoto || bandPhotoPlaceholder,
  };
};

const Watch: React.FC = () => {
  const { releases, bandName, bandPhoto } = useLoaderData() as IWatch;
  const { releasesRef, playlistRef } = usePlayerContext() as PlayerCtx;

  useEffect(() => {
    // setPlaylist(getTracks(releases));
    // playlistRef.current = getTracks(releases);
    storePlaylist(playlistRef.current);
    releasesRef.current = releases;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releases]);

  return (
    <>
      <div className="d-flex">
        <Image
          src={bandPhoto}
          className="rounded-circle band-photo me-3 mb-3"
        />
        <div className="watch-info">
          <h1 className="mb-0">{bandName}</h1>
          <p className="m-0">
            {releases.length} {releases.length === 1 ? "item" : "items"}, # new
          </p>
        </div>
      </div>
      <WatchSortSearch />
      <Accordion
        alwaysOpen
        className="overflow-auto"
        style={{ height: "565px" }}
      >
        {releases.map((release) => (
          <Release release={release} />
        ))}
      </Accordion>
    </>
  );
};
export default Watch;
