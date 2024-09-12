import Button from "@/componentes/ui";
import { Cliente } from "@/types/clienteTypes";
import Link from "next/link";
import { useState } from "react";

const ClientePage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: 1,
      nome: "Gerson Penha",
      dataNascimento: new Date(1985, 5, 15),
      dataCadastro: new Date(2021, 1, 10),
      documentos: [],
      endereco: {
        id: null,
        rua: "Rua 1",
        bairro: "Bairro 1",
        cidade: "Cidade 1",
        estado: "Estado 1",
        pais: "Pais 1",
        codigoPostal: "12345-678",
      },
      telefones: [],
      dependentes: [],
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      dataNascimento: new Date(1990, 8, 22),
      dataCadastro: new Date(2021, 3, 12),
      documentos: [],
      endereco: {
        id: null,
        rua: "Rua 1",
        bairro: "Bairro 1",
        cidade: "Cidade 1",
        estado: "Estado 1",
        pais: "Pais 1",
        codigoPostal: "12345-678",
      },
      telefones: [],
      dependentes: [],
    },
  ]);

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
              {cliente.nome} - {cliente.dataNascimento?.toLocaleDateString()}
            </div>
            <button className="botao_editar"><Link href={"cliente/gerson"}>Acessar detalhes</Link></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientePage;
