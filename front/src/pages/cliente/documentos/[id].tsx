import api, { handleAxiosError } from "@/api";
import { getCliente } from "@/hooks/clienteHooks";
import { Cliente, Documento } from "@/types/clienteTypes";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const DocumentosDoCliente = () => {
  const router = useRouter();
  const { id } = router.query;
  const [cliente, setCliente] = useState<Cliente>();
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const [idDocumento, setIdDocumento] = useState("");
  const [tipo, setTipo] = useState("");
  const [numero, setNumero] = useState("");
  const [dataExpedicao, setDataExpedicao] = useState(new Date());

  useEffect(() => {
    var cliente = getCliente(id as string).then((cliente) => {
      setCliente(cliente);
    });
  }, [id, updateTrigger]);

  const handleCreateDoc = async () => {
    try {
      await api.post(`/documento/cadastro`, {
        tipo,
        numero,
        dataExpedicao,
        clienteId: cliente!.id,
      });
      setUpdateTrigger((prev) => !prev);
    } catch (error) {
      handleAxiosError(error);
   }
  };

  const handleDeleteDoc = async (idDoc: string) => {
    try {
      const response = await api.delete(`/documento/excluir/${idDoc}`);
      if (response.status === 200) {
        setUpdateTrigger((prev) => !prev);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleClickEditDoc = (id: string) => {
    cliente?.documentos.map((documento) => {
      if (documento.id === id) {
        setIdDocumento(documento.id as string);
        setTipo(documento.tipo);
        setNumero(documento.numero);
        setDataExpedicao(new Date(documento.dataExpedicao));
      }
    });
  }

  const handleEditDoc = async () => {
    try {
      const response = await api.put(`/documento/atualizar`, {
        id: idDocumento,
        tipo,
        numero,
        dataExpedicao,
      });
      if (response.status === 200) {
        setUpdateTrigger((prev) => !prev);
        setIdDocumento("");
        setNumero("");
        setTipo("");
        setDataExpedicao(new Date());
      } else {
        alert("Erro ao editar documento");
      }
    } catch (error) {
      handleAxiosError(error)
    }
  }


  if (!cliente) {
    return <h1>Carregando... se o problema persistir volte para pagina anterior!</h1>;
  }

  return (
    <div className="flex justify-around w-full">
      <div>
        <h1 className="titulo_formulario">{cliente.nome}</h1>
        <h2 className="subtitulo">Documentos: </h2>
        <ul className="flex flex-wrap gap-5 ">
          {cliente.documentos.map((documento, index) => (
            <li key={index} className="bg-slate-300 p-2 rounded">
              <div className="texto_comum">
                {documento.tipo}: {documento.numero} -{" "}
                {new Date(cliente.dataNascimento).toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <button className="botao_editar"
                  onClick={() => handleClickEditDoc(documento.id as string)}
                >Editar</button>
                <button
                  className="botao_deletar"
                  onClick={() => handleDeleteDoc(documento.id as string)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="">
        {/* Formulario Documento */}
        <p className="subtitulo">{idDocumento ? "Editar" : "Adicionar novo documento"} </p>
        <form>
          <div>
            <label htmlFor="tipo" className="span_formulario">
              Tipo:
            </label>
            <input
              type="text"
              className="input_formulario"
              id="tipo"
              value={tipo}
              onChange={(event) => setTipo(event.target.value)}
            />
            <label htmlFor="numero" className="span_formulario">
              Numero:
            </label>
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
              value={new Date(dataExpedicao).toISOString().split("T")[0]}
              onChange={(event) =>
                setDataExpedicao(new Date(event.target.value))
              }
            />
          </div>
        </form>

        <button onClick={idDocumento != "" ? handleEditDoc : handleCreateDoc} className="botao_comum">
            {idDocumento != "" ? "Editar Documento" : "Criar Documento"} 
        </button>

        {/* Navegacao outras paginas cliente */}
        <div className="flex gap-2">
          <button className="botao_comum">
            <Link href={`/cliente/${cliente.id}`}>
              Dados basicos do cliente
            </Link>
          </button>
          <button className="botao_comum">
            <Link href={`/cliente/telefones/${cliente.id}`}>Telefones</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentosDoCliente;
