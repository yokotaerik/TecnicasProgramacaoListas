import { Cliente, Documento } from "@/types/clienteTypes";
import Link from "next/link";
import React, { useState } from "react";

const DocumentosDoCliente = () => {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
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

  const [tipo, setTipo] = useState("");
  const [numero, setNumero] = useState("");
  const [dataExpedicao, setDataExpedicao] = useState(new Date());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>{cliente.nome}</h1>
      <h2>Documentos</h2>
      <ul>
        {documentos.map((documento, index) => (
          <li key={index}>
            <div>
              {documento.tipo}: {documento.numero} -{" "}
              {documento.dataExpedicao.toLocaleDateString()}
            </div>
            <div>
              <button>Editar</button>
              <button>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
      <p>Adicionar novo documento</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tipo">Tipo:</label>
          <input
            type="text"
            id="tipo"
            value={tipo}
            onChange={(event) => setTipo(event.target.value)}
          />
          <label htmlFor="numero">Numero:</label>
          <input
            type="text"
            id="numero"
            value={numero}
            onChange={(event) => setNumero(event.target.value)}
          />
          <span>Data expedição</span>
          <input
            type="date"
            id="dataExpedicao"
            value={dataExpedicao.toLocaleTimeString()}
            onChange={(event) => setDataExpedicao(new Date(event.target.value))}
          />
        </div>
        <button
          type="submit"
          onClick={() => {
            setDocumentos([...documentos, { tipo, numero, dataExpedicao }]);
            setTipo("");
            setNumero("");
          }}
        >
          Cadastrar
        </button>
      </form>
      <button>
        <Link href={"/cliente/gerson"}>Dados basicos do cliente</Link>
      </button>
      <button>
        <Link href={"/cliente/telefones"}>Telefones</Link>
      </button>
    </div>
  );
};

export default DocumentosDoCliente;
