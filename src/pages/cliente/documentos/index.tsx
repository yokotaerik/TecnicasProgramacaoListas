import { Cliente, Documento } from "@/types/clienteTypes";
import Link from "next/link";
import { useRouter } from "next/router";
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
      id: "",
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

  const [id, setId] = useState("");
  const [tipo, setTipo] = useState("");
  const [numero, setNumero] = useState("");
  const [dataExpedicao, setDataExpedicao] = useState(new Date());
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex justify-around w-full">
      <div>
        <h1 className="titulo_formulario">{cliente.nome}</h1>
        <h2 className="subtitulo">Documentos: </h2>
        <ul>
          {documentos.map((documento, index) => (
            <li key={index} className="bg-slate-300 p-2 rounded-md">
              <div className="texto_comum">
                {documento.tipo}: {documento.numero} -{" "}
                {documento.dataExpedicao.toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <button className="botao_editar">Editar</button>
                <button className="botao_deletar">Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

        <div>
            {/* Formulario Documento */}
            <p className="subtitulo">Adicionar novo documento</p>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="tipo" className="span_formulario">Tipo:</label>
                <input
                  type="text"
                  className="input_formulario"
                  id="tipo"
                  value={tipo}
                  onChange={(event) => setTipo(event.target.value)}
                />
                <label htmlFor="numero" className="span_formulario">Numero:</label>
                <input
                  type="text"
                  id="numero"
                  className="input_formulario"
                  value={numero}
                  onChange={(event) => setNumero(event.target.value)}
                />
                <span className="span_formulario">Data expedição</span>
                <input
                  type="date"
                  id="dataExpedicao"
                  className="input_formulario"
                  value={dataExpedicao.toLocaleTimeString()}
                  onChange={(event) => setDataExpedicao(new Date(event.target.value))}
                />
              </div>
              <button
                className="submit_formulario"
                type="submit"
                onClick={() => {
                  setDocumentos([...documentos, { id: null, tipo, numero, dataExpedicao }]);
                  setTipo("");
                  setNumero("");
                }}
              >
                Cadastrar
              </button>
            </form>

            {/* Navegacao outras paginas cliente */}
            <div className="flex gap-2">
              <button className="botao_comum">
                <Link href={"/cliente/gerson"}>Dados basicos do cliente</Link>
              </button>
              <button className="botao_comum">
                <Link href={"/cliente/telefones"}>Telefones</Link>
              </button>
            </div>
        </div>
    </div>
  );
};

export default DocumentosDoCliente;
