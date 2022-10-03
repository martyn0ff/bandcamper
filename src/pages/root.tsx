import { useEffect, useState } from "react";
import { Outlet, useLoaderData, useOutletContext } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "../widgets/navbar";
import Sidebar from "../widgets/sidebar";
import BottomPlayer from "../widgets/bottom-player";
import resetLocalForage from "../utils/localforage-utils";
import { getReleases } from "../dao/releases";
import IRelease from "../models/release";
import { PlayerProvider } from "../context/player-context";

export const loader = async () => {
  const releases = await getReleases();
  return releases;
};

const Root: React.FC = () => {
  // useEffect(() => {
  //   resetLocalForage();
  // }, []);

  const loadedReleases = useLoaderData() as IRelease[];

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
          <PlayerProvider>
            <aside className="sidebar d-none d-lg-block col-2 p-0">
              <Sidebar releases={loadedReleases} />
            </aside>
            <section className="col overflow-auto border-top border-dark border-opacity-25 content-wrapper p-0 h-100 d-flex flex-column justify-content-between">
              <Container
                fluid
                className="p-3 h-auto"
              >
                <Outlet />
              </Container>
              <BottomPlayer />
            </section>
          </PlayerProvider>
        </main>
      </Container>
    </>
  );
};

// export const usePlaylist = () => useOutletContext<PlaylistCtx>();
export default Root;
