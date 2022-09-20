import { useLoaderData } from "react-router";
import Accordion from "react-bootstrap/Accordion";
import { v4 as uuidv4 } from "uuid";
import Release from "../widgets/release";
import ReleasesSortSearch from "../widgets/releases-sort-search";
import { getReleases } from "../dao/releases";
import IRelease from "../models/ui/release";

export const loader = async (): Promise<IRelease[]> => {
  const releases = await getReleases();
  return releases;
};

const Inbox: React.FC = () => {
  const releases = useLoaderData() as IRelease[];

  return (
    <>
      <div>
        <h1 className="mb-0">Inbox</h1>
        <p>{releases.length} items, # new</p>
      </div>
      <ReleasesSortSearch />
      <Accordion alwaysOpen>
        {releases.map((release) => (
          <Release
            release={release}
            key={uuidv4()}
          />
        ))}
      </Accordion>
    </>
  );
};
export default Inbox;
