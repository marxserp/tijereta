import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import InputBase from "@mui/material/InputBase";
//import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
// import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const Topbar = () => {
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/*	SEARCHBAR	*/}
      <Box display="flex">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}></IconButton>
      </Box>

      {/*	SEARCHBAR	*/}
      <Box display="flex">
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
