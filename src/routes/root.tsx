import Navbar from "../widgets/navbar";
import Sidebar from "../widgets/sidebar";
import Content from "../widgets/content";
import Container from "react-bootstrap/Container";

const Root: React.FC = () => (
  <>
    <header>
      <Navbar />
    </header>
    <Container fluid>
      <main className="row">
        <aside className="sidebar d-none d-sm-block col-2 p-0">
          <Sidebar />
        </aside>
        <section className="col overflow-auto border-top border-dark border-opacity-25 px-2">
          <Content />
        </section>
      </main>
    </Container>
  </>
);

export default Root;
