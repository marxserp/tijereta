import { Box, List, ListItem, ListItemButton, ListItemText, ListSubheader, Typography, useTheme } from "@mui/material";

const SearchResults = ({ resultados, selectResult }) => {
  if (!resultados.length) {
    return null;
  }
  return (
    <List>
      <ListSubheader>
        Resultados
      </ListSubheader>
      {resultados.map((result) => (
        <ListItem key={result._id} onClick={selectResult(result._id)}>
          <ListItemButton>
            <ListItemText primary={result.nombre} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SearchResults;