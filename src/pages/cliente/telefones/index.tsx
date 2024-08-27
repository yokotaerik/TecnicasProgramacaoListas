import { Cliente, Telefone } from "@/types/clienteTypes";
import Link from "next/link";
import React, { useState } from "react";

const TelefonesCadastro = () => {
  const [telefones, setTelefones] = useState<Telefone[]>([]);
  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nome: "Gerson Penha",
    dataNascimento: new Date(),
    dataCadastro: new Date(),
    documentos: [],
    endereco: {
      rua: "",
      bairro: "",
      cidade: "",
      estado: "",
      pais: "",
      codigoPostal: "",
    },
    telefones: [],
    dependentes: [],
  });
  const [ddd, setDdd] = useState("");
  const [numero, setNumero] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>{cliente.nome}</h1>
      <h2>Telefones</h2>
      <ul>
        {telefones.map((telefone, index) => (
          <li key={index}>
            <div>
              {telefone.ddd} {telefone.numero}
            </div>
            <div>
                <button>Editar</button>
                <button>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
      <p>Adicionar novo número</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="numero">DDD e numero:</label>
          <input
            type="text"
            id="ddd"
            value={ddd}
            onChange={(event) => setDdd(event.target.value)}
          />
          <input
            type="text"
            id="numero"
            value={numero}
            onChange={(event) => setNumero(event.target.value)}
          />
        </div>
        <button
          type="submit"
          onClick={() => {
            setTelefones([...telefones, { ddd, numero }]);
            setDdd("");
            setNumero("");
          }}
        >
          Cadastrar
        </button>
      </form>
      <button>Dados basicos do cliente</button>
      <button>
        <Link href={"/cliente/documentos"}>
        Documentos
        </Link>
        </button>
    </div>
  );
};

export default TelefonesCadastro;
