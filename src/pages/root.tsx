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
import { PlayerProvider } from "../context/player-context";

export const loader = async () => {
  const releases = await getReleases();
  return releases;
};

// type PlaylistCtx = {
//   playlist: ITrack[] | null;
//   currentTrackId: number;
//   isPlaying: boolean;
//   setPlaylist: React.Dispatch<React.SetStateAction<ITrack[]>>;
//   setCurrentTrackId: React.Dispatch<React.SetStateAction<number>>;
//   setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
// };

const Root: React.FC = () => {
  useEffect(() => {
    resetLocalForage();
  }, []);

  const loadedReleases = useLoaderData() as IRelease[];
  // const [playlist, setPlaylist] = useState<ITrack[]>([]);
  // const [currentTrackId, setCurrentTrackId] = useState(0);
  // const [isPlaying, setIsPlaying] = useState(false);

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
          <PlayerProvider>
            <section className="col overflow-auto border-top border-dark border-opacity-25 content-wrapper p-0 h-100 d-flex flex-column justify-content-between">
              <Container
                fluid
                className="p-3 h-auto"
              >
                <Outlet
                // context={{
                //   playlist,
                //   setPlaylist,
                //   setCurrentTrackId,
                //   setIsPlaying,
                // }}
                />
              </Container>
              <BottomPlayer
              // playlist={playlist}
              // currentTrackId={currentTrackId}
              // isPlaying={isPlaying}
              // setIsPlaying={setIsPlaying}
              />
            </section>
          </PlayerProvider>
        </main>
      </Container>
    </>
  );
};

// export const usePlaylist = () => useOutletContext<PlaylistCtx>();
export default Root;
