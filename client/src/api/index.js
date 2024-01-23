import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080" });

// Verifiy localStorage !!!
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
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

export const createProcedimiento = (newProcedimiento) =>
  API.post("/procedimientos", newProcedimiento);
export const fetchAllProcedimientos = () => API.get("/procedimientos");
export const fetchSingleProcedimiento = (id) =>
  API.get(`/procedimientos/${id}`);
export const updateProcedimiento = (id, updatedProcedimiento) =>
  API.patch(`/procedimientos/${id}`, updatedProcedimiento);
export const deleteProcedimiento = (id) => API.delete(`/procedimientos/${id}`);

export const createTurno = (newTurno) => API.post("/turnos", newTurno);
export const fetchAllTurnos = () => API.get("/turnos");
export const fetchSingleTurno = (id) => API.get(`/turnos/${id}`);
export const updateTurno = (id, updatedTurno) =>
  API.patch(`/turnos/${id}`, updatedTurno);
export const deleteTurno = (id) => API.delete(`/turnos/${id}`);

export const register = (formData) => API.post("/auth/register", formData);
export const login = (formData) => API.post("/auth/login", formData);
