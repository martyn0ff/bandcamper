import { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "../widgets/navbar";
import Sidebar from "../widgets/sidebar";
import resetLocalForage from "../utils/localforage-utils";
import { getReleases } from "../dao/releases";
import IRelease from "../models/release";

export const loader = async () => {
  const releases = await getReleases();
  return releases;
};

const Root: React.FC = () => {
  useEffect(() => {
    resetLocalForage();
  }, []);

  const releases = useLoaderData() as IRelease[];

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
          <aside className="sidebar d-none d-sm-block col-2 p-0">
            <Sidebar releases={releases} />
          </aside>
          <section className="col overflow-auto border-top border-dark border-opacity-25 px-2 content-wrapper h-100">
            <Container
              fluid
              className="p-3 h-100"
            >
              <Outlet />
            </Container>
          </section>
        </main>
      </Container>
    </>
  );
};

export default Root;
