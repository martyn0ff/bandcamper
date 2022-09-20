import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { TbSortAscending2, TbSortDescending2 } from "react-icons/tb";

const WatchSortSearch: React.FC = () => (
  <div className="d-flex justify-content-between align-items-end search-sort-wrapper mb-3">
    <Form className="d-flex me-3 w-50 flex-grow-0">
      <Form.Control
        type="search"
        placeholder="What release are you looking for?"
        aria-label="Search"
      />
    </Form>
    <Form className="d-flex align-items-end">
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

export default WatchSortSearch;
