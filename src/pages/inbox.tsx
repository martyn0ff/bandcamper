import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import Accordion from "react-bootstrap/Accordion";
import { v4 as uuidv4 } from "uuid";
import Release from "../widgets/release";
import ReleasesSortSearch from "../widgets/releases-sort-search";
import { getReleases } from "../dao/releases";
import IRelease from "../models/release";
import ITrack from "../models/track";
import { usePlayerContext, PlayerCtx } from "../context/player-context";
import { getTracks, newReleasesNum, searchReleases } from "../utils/misc-utils";

export const loader = async (): Promise<IRelease[]> => {
  const releases = await getReleases();
  return releases;
};

const Inbox: React.FC = () => {
  const releases = useLoaderData() as IRelease[];
  const [currentPage, setCurrentPage] = useState(1);
  const [releasesPerPage] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");
  const { playlistRef, releasesRef } = usePlayerContext() as PlayerCtx;

  const keysRelease: (keyof IRelease)[] = ["title", "artist", "bandName"];
  const keysTrack: (keyof ITrack)[] = ["artist", "title"];

  const indexOfLastRelease = currentPage * releasesPerPage;
  const indexOfFirstRelease = indexOfLastRelease - releasesPerPage;
  const [currentReleases, setCurrentReleases] = useState<IRelease[]>([]);

  useEffect(() => {
    if (searchQuery) {
      releasesRef.current = searchReleases(
        releases,
        keysRelease,
        keysTrack,
        searchQuery,
      );
    } else {
      releasesRef.current = releases;
    }
    setCurrentReleases(
      releasesRef.current.slice(indexOfFirstRelease, indexOfLastRelease),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    releasesRef.current = releases;
    playlistRef.current = getTracks(releases);
    // setPlaylist(getTracks(releases));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releases]);

  return (
    <>
      <div>
        <h1 className="mb-0">Inbox</h1>
        <p>
          {releasesRef.current.length}{" "}
          {releasesRef.current.length === 1 ? "release" : "releases"}
          <span className="mx-2">&middot;</span>
          {newReleasesNum(releasesRef.current)} new
        </p>
      </div>
      <ReleasesSortSearch
        releasesPerPage={releasesPerPage}
        totalReleasesNum={releasesRef.current.length}
        setCurrentPage={setCurrentPage}
        setSearchQuery={setSearchQuery}
        currentPage={currentPage}
        currentReleasesNum={currentReleases.length}
      />
      <Accordion
        alwaysOpen
        className="overflow-auto"
        style={{ height: "586px" }}
      >
        {currentReleases.map((release) => (
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
