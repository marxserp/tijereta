import axios from "axios";

const API = axios.create({ baseURL: "https://tijereta-server.onrender.com" });
//const API = axios.create({ baseURL: "http://localhost:8080" });

// Verifiy localStorage !!!
API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }
  return req;
});

API.defaults.timeout = 10000;

export const createCliente = (newCliente) => API.post("/clientes", newCliente);
export const fetchAllClientes = () => API.get("/clientes");
export const fetchSingleCliente = (id) => API.get(`/clientes/cliente/${id}`);
export const updateCliente = (id, updatedCliente) =>
  API.patch(`/clientes/${id}`, updatedCliente); // Chequear si es conveniente usar PUT o PATCH!
export const deleteCliente = (id) => API.delete(`/clientes/${id}`);
export const searchCliente = (query) => API.get(`/clientes/search?query=${query}`);

export const createProducto = (newProducto) =>
  API.post("/productos", newProducto);
export const fetchAllProductos = () => API.get("/productos");
export const fetchSingleProducto = (id) =>
  API.get(`/productos/${id}`);
export const updateProducto = (id, updatedProducto) =>
  API.patch(`/productos/${id}`, updatedProducto);
export const deleteProducto = (id) => API.delete(`/productos/${id}`);
export const searchProducto = (query) => API.get(`/productos/search?query=${query}`);

export const createTurno = (newTurno) => API.post("/turnos", newTurno);
export const fetchAllTurnos = () => API.get("/turnos");
export const fetchSingleTurno = (id) => API.get(`/turnos/turno/${id}`);
export const updateTurno = (id, updatedTurno) =>
  API.patch(`/turnos/${id}`, updatedTurno);
export const deleteTurno = (id) => API.delete(`/turnos/${id}`);
export const getTopBuyers = () => API.get("/turnos/top");
export const getTopServices = () => API.get("/turnos/topservice");
export const getTurnosByExtra = (query) => API.get(`/turnos/filterget?query=${query}`);

export const register = (formData) => API.post("/auth/register", formData);
export const login = (formData) => API.post("/auth/login", formData);
export const verify = (formData) => API.post("/auth/verification", formData);
export const adm = (formData) => API.post("/auth/novaUAuth", formData);
export const fetchSingleUsuario = (id) => API.get(`/auth/usuario/${id}`);
