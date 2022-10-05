import { useEffect, useState } from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router";
import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import Release from "../widgets/release";
import ReleasesSortSearch from "../widgets/releases-sort-search";
import { getReleases } from "../dao/releases";
import IWatch from "../models/watch";
import IRelease from "../models/release";
import ITrack from "../models/track";
import { usePlayerContext, PlayerCtx } from "../context/player-context";
import { storePlaylist } from "../utils/localforage-utils";
import bandPhotoPlaceholder from "../assets/band_photo_placeholder.svg";
import { getTracks, newReleasesNum, searchReleases } from "../utils/misc-utils";

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

  return {
    releases: filteredReleases,
    bandName: params.watchId as string,
    bandPhoto: bandPhoto || bandPhotoPlaceholder,
  };
};

const Watch: React.FC = () => {
  const { releases, bandName, bandPhoto } = useLoaderData() as IWatch;
  const { releasesRef, playlistRef } = usePlayerContext() as PlayerCtx;
  const [currentPage, setCurrentPage] = useState(1);
  const [releasesPerPage] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");

  const indexOfLastRelease = currentPage * releasesPerPage;
  const indexOfFirstRelease = indexOfLastRelease - releasesPerPage;
  const [currentReleases, setCurrentReleases] = useState<IRelease[]>([]);

  const keysRelease: (keyof IRelease)[] = ["title", "artist", "bandName"];
  const keysTrack: (keyof ITrack)[] = ["artist", "title"];

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
  }, [searchQuery, bandName]);

  useEffect(() => {
    // setPlaylist(getTracks(releases));
    playlistRef.current = getTracks(releases);
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
            {releasesRef.current.length}{" "}
            {releasesRef.current.length === 1 ? "release" : "releases"}
            <span className="mx-2">&middot;</span>
            {newReleasesNum(releasesRef.current)} new
          </p>
        </div>
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
        style={{ height: "565px" }}
      >
        {currentReleases.map((release) => (
          <Release release={release} />
        ))}
      </Accordion>
    </>
  );
};
export default Watch;
