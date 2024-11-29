import { useCallback } from "react";
import debounce from "lodash.debounce";

const useDebouncedSearch = (searchFunction, delay = 500) => {
  return useCallback(
    debounce(async (query, callback) => {
      const results = await searchFunction(query);
      callback(results);
    }, delay),
    [searchFunction, delay]
  );
};

export default useDebouncedSearch;