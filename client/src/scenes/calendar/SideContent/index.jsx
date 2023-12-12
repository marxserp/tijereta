import { useState } from "react";
import { useSelector } from "react-redux";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "../../../theme";

const SideContent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [currentEvents, setCurrentEvents] = useState([]);

  return (
    <Box
      flex="1 1 32%"
      backgroundColor={colors.primary[400]}
      p="15px"
      borderRadius="4px"
    >
      <Box></Box>
      <Typography variant="h5">Próximos</Typography>
      <List>
        {currentEvents.map((event) => (
          <ListItem
            key={event.id}
            sx={{
              backgroundColor: colors.greenAccent[500],
              margin: "10px 0",
              borderRadius: "6px",
            }}
          >
            <ListItemText
              primary={event.title}
              secondary={
                <Typography>
                  {formatDate(event.start, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideContent;
