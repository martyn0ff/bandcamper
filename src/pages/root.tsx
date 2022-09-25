import { useEffect, useState } from "react";
import { Outlet, useLoaderData, useOutletContext } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "../widgets/navbar";
import Sidebar from "../widgets/sidebar";
import BottomPlayer from "../widgets/bottom-player";
import resetLocalForage from "../utils/localforage-utils";
import { getReleases } from "../dao/releases";
import IRelease from "../models/ui/release";
import ITrack from "../models/ui/track";

export const loader = async () => {
  const releases = await getReleases();
  return releases;
};

type PlaylistCtx = {
  playlist: ITrack[] | null;
  currentTrackNum: number;
  setPlaylist: React.Dispatch<React.SetStateAction<ITrack[]>>;
  setCurrentTrackNum: React.Dispatch<React.SetStateAction<number>>;
};

const Root: React.FC = () => {
  useEffect(() => {
    resetLocalForage();
  }, []);

  const loadedReleases = useLoaderData() as IRelease[];
  const [playlist, setPlaylist] = useState<ITrack[]>([]);
  const [currentTrackNum, setCurrentTrackNum] = useState(0);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <Container
        fluid
        className="content-wrapper"
      >
        <main className="row">
          <aside className="sidebar d-none d-lg-block col-2 p-0">
            <Sidebar releases={loadedReleases} />
          </aside>
          <section className="col overflow-auto border-top border-dark border-opacity-25 content-wrapper p-0 h-100 d-flex flex-column justify-content-between">
            <Container
              fluid
              className="p-3 h-auto"
            >
              <Outlet context={{ playlist, setPlaylist, setCurrentTrackNum }} />
            </Container>
            <BottomPlayer
              playlist={playlist}
              currentTrackNum={currentTrackNum}
            />
          </section>
        </main>
      </Container>
    </>
  );
};

export const usePlaylist = () => useOutletContext<PlaylistCtx>();
export default Root;
