import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { TbSortAscending2, TbSortDescending2 } from "react-icons/tb";
import Pagination from "./pagination";
import ReleaseSortSearchProps from "../models/release-sort-search-props";

const ReleasesSortSearch: React.FC<ReleaseSortSearchProps> = ({
  releasesPerPage,
  totalReleasesNum,
  setCurrentPage,
  currentPage,
  currentReleasesNum,
  setSearchQuery,
}: ReleaseSortSearchProps) => (
  <div className="d-flex justify-content-between align-items-end search-sort-wrapper mb-3">
    <Form className="d-flex me-3 w-50 flex-grow-0">
      <Form.Control
        type="search"
        placeholder="Search for release title, artist, track name..."
        aria-label="Search"
        onChange={(e) => setSearchQuery(e.currentTarget.value.toLowerCase())}
      />
    </Form>
    <Form className="d-flex align-items-end">
      <Pagination
        releasesPerPage={releasesPerPage}
        totalReleasesNum={totalReleasesNum}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        currentReleasesNum={currentReleasesNum}
      />
      <ButtonGroup className="me-2">
        <Button
          variant="outline-primary"
          className="sort-btn"
        >
          <TbSortAscending2 size="1.35rem" />
        </Button>
        <Button
          variant="outline-primary"
          className="sort-btn"
        >
          <TbSortDescending2 size="1.35rem" />
        </Button>
      </ButtonGroup>
      <Form.Group>
        <Form.Select>
          <option defaultChecked>Sort by</option>
          <option>Artist Name</option>
          <option>Release Name</option>
          <option>Release Date</option>
          <option>Seen</option>
        </Form.Select>
      </Form.Group>
    </Form>
  </div>
);

export default ReleasesSortSearch;
