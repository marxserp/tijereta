import { useCallback, useEffect, useState } from "react";
import { Box, TextField, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import { debounce } from "lodash";
import SearchResults from "./SearchResults";

/*function debounce(func, tiemp) {
  let temp;
  return function (...args) {
    const esperar = () => {
      clearTimeout(temp);
      func(...args)
    };
    clearTimeout(temp);
    temp = setTimeout(esperar, tiemp);
  };
}*/

const SearchBar = ({ searchFunction, label, getResult }) => {
  const [term, setTerm] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleSearch = async (query) => {
    if (!query) {
      setResultados([]);
      return;
    }
    try {
      // It get's the search function (e.g.: searchProductos) as props
      const response = await searchFunction(query);
      setResultados(response);
    } catch (error) {
      console.log("Sin resultados", error);
    }
  };

  const debouncedSearch = useCallback(
    debounce((q) => handleSearch(q), 1500),
    []
  );

  const handleBlur = () => {
    if (!term) {
      setResultados([]);
    }
  };

  useEffect(() => {
    if (term) {
      debouncedSearch(term);
    } else {
      setResultados([]);
    }
  }, [term, debouncedSearch]);

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        label={label}
        value={term}
        onBlur={handleBlur}
        onChange={(e) => setTerm(e.target.value)}
      />
      <Box sx={{ position: "absolute", top: "110%", borderRadius: "8px", left: 0, right: 0, zIndex: 10, backgroundColor: "white" }}>
        <SearchResults resultados={resultados} selectResult={getResult} />
      </Box>
    </Box>
  );
};

export default SearchBar;