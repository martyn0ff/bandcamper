import { useEffect } from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router";
import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import Release from "../widgets/release";
import WatchSortSearch from "../widgets/releases-sort-search";
import { getReleases } from "../dao/releases";
import IWatch from "../models/ui/watch";
import { usePlaylist } from "./root";
import { getTracks } from "../utils/array-utils";

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
  return {
    releases: filteredReleases,
    bandName: params.watchId as string,
  };
};

const Watch: React.FC = () => {
  const { releases, bandName } = useLoaderData() as IWatch;
  const { setPlaylist } = usePlaylist();

  useEffect(() => {
    setPlaylist(getTracks(releases));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releases]);

  return (
    <>
      <div className="d-flex">
        <Image
          src="https://f4.bcbits.com/img/0024816791_10.jpg"
          width={100}
          className="rounded-circle me-3 mb-3"
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
        style={{ height: "555px" }}
      >
        {releases.map((release) => (
          <Release release={release} />
        ))}
      </Accordion>
    </>
  );
};
export default Watch;
