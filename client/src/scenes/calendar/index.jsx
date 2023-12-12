import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTurnos } from "../../state";

import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import SideContent from "./SideContent";
import AdminTurnos from "./Form";

const Agenda = () => {
  return (
    <Box position="relative" display="flex" justifyContent="center">
      <Sidebar isSidebar={isSidebar} />
      <Box width="100%" m="20px">
        <Header
          title="Clientes"
          subtitle="Adminstrá, creá, editá y borrá tus clientes."
        />
        <Box
          width="100%"
          padding="0.6rem"
          display="flex"
          justifyContent="space-between"
        >
          <Box flexBasis="38%" mr="2rem">
            <AdminTurnos />
          </Box>
          <Box flexBasis="60%">
            <SideContent />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Agenda;
