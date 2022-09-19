import { LoaderFunctionArgs, useLoaderData } from "react-router";
import Accordion from "react-bootstrap/Accordion";
import Release from "../widgets/release";
import WatchSortSearch from "../widgets/releases-sort-search";
import { getReleases } from "../dao/releases";
import IWatch from "../models/ui/watch";

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<IWatch> => {
  const releases = await getReleases();
  const filteredReleases = releases.filter(
    (release) => release.releasedBy === params.watchId,
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
    releasedBy: params.watchId as string,
  };
};

const Watch: React.FC = () => {
  const { releases, releasedBy } = useLoaderData() as IWatch;

  return (
    <>
      <div>
        <h1 className="mb-0">{releasedBy}</h1>
        <p># items, # new</p>
      </div>
      <WatchSortSearch />
      <Accordion alwaysOpen>
        {releases.map((release) => (
          <Release release={release} />
        ))}
      </Accordion>
    </>
  );
};
export default Watch;
