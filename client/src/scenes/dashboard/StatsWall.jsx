import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { getTopBuyers, getTopServices, getTurnosByExtra } from "../../services/turnos";
import { fetchClienteById } from "../../services/clientes";
import { fetchProductoById } from "../../services/productos";

const StatsWall = () => {

  const [topClientes, setTopClientes] = useState([]);
  const [topProductos, setTopProductos] = useState([]);
  const [turnosStatusCount, setTurnosStatusCount] = useState({ finalizados: 0, cancelados: 0 });

  useEffect(() => {
    const getStats = async () => {
      try {
        const topBuyers = await getTopBuyers();
        const topProducts = await getTopServices();
        const turnosByFinalizado = await getTurnosByExtra("Finalizado");
        const turnosByCancelado = await getTurnosByExtra("Cancelado");

        // Mapeado nombres
        const resolvedClientes = await Promise.all(
          topBuyers.map(async (item) => {
            const cliente = await fetchClienteById(item._id);
            return { nombre: cliente?.nombre ?? "Unknown", count: item.count };
          })
        );

        const resolvedProductos = await Promise.all(
          topProducts.map(async (item) => {
            const producto = await fetchProductoById(item._id);
            return { nombre: producto?.nombre ?? "Unknown", count: item.count };
          })
        );

        setTopClientes(resolvedClientes);
        setTopProductos(resolvedProductos);
        setTurnosStatusCount({
          finalizados: turnosByFinalizado.length,
          cancelados: turnosByCancelado.length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    getStats();
  }, []);

  return (
    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
      <Card>
        <CardContent>
          <Typography variant="h6">Top 3 Clientes</Typography>
          {topClientes.map((cliente, index) => (
            <Typography key={index}>{cliente.nombre} - {cliente.count} turnos</Typography>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6">Top 3 Productos</Typography>
          {topProductos.map((producto, index) => (
            <Typography key={index}>{producto.nombre} - {producto.count} veces</Typography>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6">Turnos Status</Typography>
          <Typography>Finalizados: {turnosStatusCount.finalizados}</Typography>
          <Typography>Cancelados: {turnosStatusCount.cancelados}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};


export default StatsWall;