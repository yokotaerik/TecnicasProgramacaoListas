import api, { handleAxiosError } from "@/api";
import Button from "@/componentes/ui";
import { Cliente } from "@/types/clienteTypes";
import Link from "next/link";
import { useEffect, useState } from "react";

const ClientePage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  // Use effect para bsucar os clientes
  useEffect(() => {
    // Buscar os clientes
    getClientes();
  }, []); 

  let getClientes = async () => {
    try {
      let response = await api.get("/clientes")
      console.log(response.data);

    setClientes(response.data);
    } catch (error) {
      handleAxiosError(error);
    }
  }

  return (
    <div>
      <div className="flex justify-between gap-2 items-center">
        <h1 className="text-4xl font-bold">Lista de Clientes</h1>
        <button className="font-bold text-white p-2 bg-green-500 rounded-md">
          <Link href={"/cliente/cadastrar/titular"}>Novo Cliente titular</Link>
        </button>
        <button className="font-bold text-white p-2 bg-green-500 rounded-md">
          <Link href={"/cliente/cadastrar/dependente"}>
            Novo Cliente depdendete
          </Link>
        </button>
      </div>
      <ul className="flex flex-col gap-3 mt-5">
        {clientes.map((cliente) => (
          <li
            key={cliente.id}
            className="bg-slate-200 rounded-md p-2 flex justify-between items-center"
          >
            <div>
            {cliente.nome} - {new Date(cliente.dataNascimento).toLocaleDateString()}
            </div>
            <button className="botao_editar"><Link href={`cliente/${cliente.id}`}>Acessar detalhes</Link></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientePage;
