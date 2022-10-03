export default interface ReleaseSortSearchProps {
  releasesPerPage: number;
  totalReleasesNum: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  currentReleasesNum: number;
}
