import api, { handleAxiosError } from "@/api";

export const getClientes = async () => {
    try {
      let response = await api.get("/clientes")
      console.log(response.data);
    
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
}

export const getCliente = async (id: string | number) => {
    try {
      const response = await api.get(`/cliente/${id}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
}