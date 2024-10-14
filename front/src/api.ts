import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});


const handleAxiosError = (error: any) => {
    if(error.response.status != 500){
        alert(error.response.data);
      } else {
        alert("Erro interno do sistema");
      }
}


export { handleAxiosError };
export default api;