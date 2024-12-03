import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Typography, Box, Button, Card, CardContent, CircularProgress, useTheme } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BalanceIcon from '@mui/icons-material/Balance';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { tokens } from "../../theme";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Box position="relative" display="flex" justifyContent="center" height="92vh" overflow="hidden">
      <Box width="100%" m="20px 10px 10px 10px">
        <Box display="flex" justifyContent="start" alignItems="center" p="0 0 20px 0">
          <Typography variant="h2" fontWeight="bold" m="0 30px 2px 0">Inicio</Typography>
        </Box>


      </Box>
    </Box>
  );
};

export default Dashboard;