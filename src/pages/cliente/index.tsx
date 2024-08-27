import { Cliente } from "@/types/clienteTypes";
import Link from "next/link";
import { useState } from "react";

const ClientePage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  return (
    <div>
      <div>
        <h1>Lista de Clientes</h1>
        <button>
          <Link href={"/cliente/cadastrar"}>Novo Cliente</Link>
        </button>
      </div>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            {cliente.nome} - {cliente.dataNascimento?.toLocaleDateString()}
            <button> Editar </button>
            <button>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientePage;
