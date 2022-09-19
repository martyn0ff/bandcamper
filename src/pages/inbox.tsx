import { useLoaderData } from "react-router";
import Accordion from "react-bootstrap/Accordion";
import Release from "../widgets/release";
import BottomPlayer from "../widgets/bottom-player";
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
        <p># items, # new</p>
      </div>
      <ReleasesSortSearch />
      <Accordion alwaysOpen>
        {releases.map((release) => (
          <Release release={release} />
        ))}
      </Accordion>
    </>
  );
};
export default Inbox;
