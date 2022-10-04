import { useLayoutEffect, useState } from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";
import PaginationProps from "../models/pagination-props";

const Pagination: React.FC<PaginationProps> = ({
  releasesPerPage,
  totalReleasesNum,
  setCurrentPage,
  currentPage,
  currentReleasesNum,
}: PaginationProps) => {
  const pages = Math.ceil(totalReleasesNum / releasesPerPage);
  const [releasesNums, setReleasesNums] = useState(currentReleasesNum);

  useLayoutEffect(() => {
    setReleasesNums((currentPage - 1) * releasesPerPage + currentReleasesNum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentReleasesNum]);

  return (
    <ButtonToolbar aria-label="Toolbar with Button groups">
      <ButtonGroup
        className="me-2"
        aria-label="First group"
      >
        <div className="h-100 d-flex align-items-center me-2 text-nowrap">
          {releasesNums} of {totalReleasesNum}
        </div>
        <Button
          variant="outline-primary"
          className="pagination-btn"
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
              setReleasesNums(releasesNums - currentReleasesNum);
            }
          }}
        >
          <TbArrowLeft size="1.35rem" />
        </Button>
        <Button
          variant="outline-primary"
          className="pagination-btn"
          onClick={() => {
            if (currentPage < pages) {
              setCurrentPage(currentPage + 1);
              setReleasesNums(releasesNums + currentReleasesNum);
            }
          }}
        >
          <TbArrowRight size="1.35rem" />
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
};

export default Pagination;
