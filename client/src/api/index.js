import axios from "axios";

const API = axios.create({ baseURL: "https://tijereta-server.onrender.com" });

// Verifiy localStorage !!!
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
      }`;
  }
  return req;
});

export const createCliente = (newCliente) => API.post("/clientes", newCliente);
export const fetchAllClientes = () => API.get("/clientes");
export const fetchSingleCliente = (id) => API.get(`/clientes/${id}`);
export const updateCliente = (id, updatedCliente) =>
  API.patch(`/clientes/${id}`, updatedCliente); // Chequear si es conveniente usar PUT o PATCH!
export const deleteCliente = (id) => API.delete(`/clientes/${id}`);

export const createProducto = (newProducto) =>
  API.post("/productos", newProducto);
export const fetchAllProductos = () => API.get("/productos");
export const fetchSingleProducto = (id) =>
  API.get(`/productos/${id}`);
export const updateProducto = (id, updatedProducto) =>
  API.patch(`/productos/${id}`, updatedProducto);
export const deleteProducto = (id) => API.delete(`/productos/${id}`);

export const createTurno = (newTurno) => API.post("/turnos", newTurno);
export const fetchAllTurnos = () => API.get("/turnos");
export const fetchSingleTurno = (id) => API.get(`/turnos/${id}`);
export const updateTurno = (id, updatedTurno) =>
  API.patch(`/turnos/${id}`, updatedTurno);
export const deleteTurno = (id) => API.delete(`/turnos/${id}`);

export const register = (formData) => API.post("/auth/register", formData);
export const login = (formData) => API.post("/auth/login", formData);
