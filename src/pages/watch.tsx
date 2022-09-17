import { LoaderFunctionArgs, useLoaderData } from "react-router";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Release from "../widgets/release";
import { getReleases } from "../dao/releases";
import IWatch from "../models/watch";

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<IWatch> => {
  const releases = await getReleases();
  const filteredReleases = releases.filter(
    (release) => release.releasedBy === params.watchId,
  );
  return {
    releases: filteredReleases,
    releasedBy: params.watchId || "UNKNOWN",
  };
};

const Watch: React.FC = () => {
  const { releases, releasedBy } = useLoaderData() as IWatch;

  return (
    <>
      <div>
        <h1 className="fw-bold mb-0">{releasedBy}</h1>
        <p># new items</p>
      </div>
      <Accordion alwaysOpen>
        {releases.map((release) => (
          <Release release={release} />
        ))}
      </Accordion>
    </>
  );
};
export default Watch;
