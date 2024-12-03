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

import UsuarioCard from "./UsuarioCard";
import { fetchSingleUsuario } from "../../services/auth"

const Dashboard = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const userId = useSelector((state) => state.auth.usuario._id);

  useEffect(() => {
    const getUsuarioData = async () => {
      const data = await fetchSingleUsuario(userId);
      setUsuario(data);
    };
    getUsuarioData();
  }, [userId]);

  return (
    <Box position="relative" display="flex" justifyContent="center" height="92vh" overflow="hidden">
      <Box width="100%" m="20px 10px 10px 10px">
        <Box display="flex" justifyContent="start" alignItems="center" p="0 0 20px 0">
          <Typography variant="h2" fontWeight="bold" m="0 30px 2px 0">Inicio</Typography>
        </Box>

        {usuario ? <UsuarioCard usuario={usuario} /> : <p>Loading...</p>}
      </Box>
    </Box>
  );
};

export default Dashboard;