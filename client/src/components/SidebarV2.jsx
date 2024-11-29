import { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import HelpCenterRoundedIcon from "@mui/icons-material/HelpCenterRounded";

const SidebarItem = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const isSelected = selected === title;

  return (
    <ListItem
      button
      component={Link}
      to={to}
      onClick={() => setSelected(title)}
      sx={{
        color: isSelected ? theme.palette.primary.main : theme.palette.text.primary,
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      }}
    >
      <ListItemIcon
        sx={{
          color: isSelected ? theme.palette.primary.main : theme.palette.text.secondary,
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      open={!isCollapsed}
      sx={{
        width: isCollapsed ? "54px" : "200px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isCollapsed ? "54px" : "200px",
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        bgcolor={theme.palette.background.default}
        overflow="hidden"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          p={1}
          borderBottom={`1px solid ${theme.palette.divider}`}
        >
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <MenuRoundedIcon /> : <MenuOpenRoundedIcon />}
          </IconButton>
          {!isCollapsed && (
            <Typography variant="h6" color="textPrimary" m="0 0 0 30px">
              Menú
            </Typography>
          )}
        </Box>

        <List>
          <SidebarItem
            title="Agenda"
            to="/agenda"
            icon={<CalendarTodayRoundedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="Clientes"
            to="/clientes"
            icon={<ContactsRoundedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="Productos"
            to="/productos"
            icon={<LocalMallRoundedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="Ayuda"
            to="/ayuda"
            icon={<HelpCenterRoundedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
