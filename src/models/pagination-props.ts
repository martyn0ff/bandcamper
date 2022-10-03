export default interface PaginationProps {
  releasesPerPage: number;
  totalReleasesNum: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  currentReleasesNum: number;
}
