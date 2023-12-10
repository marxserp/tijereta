import { CREATE, FETCH_ALL } from "../constants/actionTypes";

export default (state = { clientes: [] }, action) => {
  switch (action.type) {
    case CREATE:
      console.log(
        `This should only show up when creating a new client${action}`
      );
      return { ...state, clientes: [...state.clientes, action.payload] };
    case FETCH_ALL:
      console.log(
        `This should be data from the payload gotten from getAllClientes ${action}`
      );
      return { ...state, clientes: action.payload.data };
    default:
      return state;
  }
};
