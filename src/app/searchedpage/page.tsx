import { Suspense } from "react";

import { SearchResultsPage } from "../_components/SearchResultsPage";

const SearchedPage = () => {
  return (
    <Suspense fallback={null}>
      <SearchResultsPage />
    </Suspense>
  );
};

export default SearchedPage;
