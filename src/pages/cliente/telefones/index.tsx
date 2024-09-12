import { Cliente, Telefone } from "@/types/clienteTypes";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const TelefonesCadastro = () => {
  const [telefones, setTelefones] = useState<Telefone[]>([{ id: "12321", ddd: "11", numero: "999999999" }, { id: "12322", ddd: "11", numero: "999999999" }]);
  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nome: "Gerson Penha",
    dataNascimento: new Date(),
    dataCadastro: new Date(),
    documentos: [],
    endereco: {
      id: "",
      rua: "",
      bairro: "",
      cidade: "",
      estado: "",
      pais: "",
      codigoPostal: "",
    },
    telefones: [  ],
    dependentes: [],
  });
  const [ddd, setDdd] = useState("");
  const [numero, setNumero] = useState("");
  9;
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  if (cliente.titular == undefined) {
    return (
      <div>
        <h1 className="titulo_formulario">{cliente.nome}</h1>
        <h2 className="subtitulo">Telefones</h2>
        <ul>
          {telefones.map((telefone, index) => (
            <li key={index} className="flex items-center gap-4">
              <div className="texto_comum">
                ({telefone.ddd}) {telefone.numero}
              </div>
              <div className="flex gap-2">
                <button className="botao_editar">Editar</button>
                <button className="botao_deletar">Excluir</button>
              </div>
            </li>
          ))}
        </ul>
        <p className="subtitulo">Adicionar novo número</p>
        <form onSubmit={handleSubmit}>
          <label className="span_formulario" htmlFor="numero">
            DDD e numero:
          </label>
          <div className="flex">
            <input
              className="input_formulario"
              type="text"
              id="ddd"
              value={ddd}
              onChange={(event) => setDdd(event.target.value)}
            />
            <input
              className="input_formulario"
              type="text"
              id="numero"
              value={numero}
              onChange={(event) => setNumero(event.target.value)}
            />
          </div>
          <button
            className="submit_formulario"
            type="submit"
            onClick={() => {
              setTelefones([...telefones, { id: null, ddd, numero }]);
              setDdd("");
              setNumero("");
            }}
          >
            Salvar
          </button>
        </form>
        <div className="flex gap-2">
          <button className="botao_comum">
            <Link href={"/cliente/gerson"}>Dados basicos</Link>
          </button>
          <button className="botao_comum">
            <Link href={"/cliente/documentos"}>Documentos</Link>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Clientes não titulares não podem alterar os telefones</h1>
      </div>
    );
  }
};

export default TelefonesCadastro;
