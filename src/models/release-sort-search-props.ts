export default interface ReleaseSortSearchProps {
  releasesPerPage: number;
  totalReleasesNum: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  currentReleasesNum: number;
}
