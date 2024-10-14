import api, { handleAxiosError } from "@/api";
import IsLoading from "@/componentes/isLoading/isLoading";
import { getCliente } from "@/hooks/clienteHooks";
import { Cliente, Telefone } from "@/types/clienteTypes";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const TelefonesCadastro = () => {
  const router = useRouter();
  const { id } = router.query;
  const [cliente, setCliente] = useState<Cliente>();
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const [idTelefone, setIdtelefone] = useState("");
  const [ddd, setDdd] = useState("");
  const [numero, setNumero] = useState("");

  useEffect(() => {
    getCliente(id as string).then((cliente) => {
      setCliente(cliente);
    });
  }, [id, updateTrigger]);

  const handleCreateTelefone = async () => {
    try {
      if (ddd === "" || numero === "") return alert("Preencha todos os campos");

      await api.post(`/telefone/cadastro`, {
        ddd,
        numero,
        clienteId: cliente!.id,
      });
      setUpdateTrigger((prev) => !prev);
    } catch(error) {
      handleAxiosError(error)
    }
  };

  const handleDeleteTelefone = async (idTelefone: string) => {
    try {
      const response = await api.delete(`/telefone/excluir/${idTelefone}`);
      if (response.status === 200) {
        setUpdateTrigger((prev) => !prev);
      } else {
        alert("Erro ao deletar telefone");
      }
    } catch (error) {
      handleAxiosError(error)
    }
  };

  const handleClickEditTelefone = (id: string) => {
    cliente?.telefones.map((telefone) => {
      if (telefone.id === id) {
        setIdtelefone(telefone.id as string);
        setDdd(telefone.ddd);
        setNumero(telefone.numero);
      }
    });
  };

  const handleEditTelefone = async () => {
    try {
      const response = await api.put(`/telefone/atualizar`, {
        id: idTelefone,
        ddd,
        numero,
      });
      if (response.status === 200) {
        setUpdateTrigger((prev) => !prev);
        setIdtelefone("");
        setNumero("");
        setDdd("");
      } else {
        alert("Erro ao editar telefone");
      }
    } catch (error) {
      handleAxiosError(error)
    }
  };

  if (cliente === undefined) {
    return <IsLoading />;
  }

  return (
    <div className="flex justify-around w-full">
      {cliente.titular == undefined ? (
        <div>
          <h1 className="titulo_formulario">{cliente.nome}</h1>
          <h2 className="subtitulo">Telefones</h2>
          <ul>
            {cliente.telefones.map((telefone, index) => (
              <li key={index} className="flex items-center gap-4">
                <div className="texto_comum">
                  ({telefone.ddd}) {telefone.numero}
                </div>
                <div className="flex gap-2">
                  <button
                    className="botao_editar"
                    onClick={() =>
                      handleClickEditTelefone(telefone.id as string)
                    }
                  >
                    Editar
                  </button>
                  <button
                    className="botao_deletar"
                    onClick={() => handleDeleteTelefone(telefone.id as string)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <h1 className="titulo_formulario">{cliente.nome}</h1>
          <h2 className="subtitulo mt-2">Telefones</h2>
          <ul>
            {cliente.titular.telefones.map((telefone, index) => (
              <li key={index} className="flex items-center gap-4">
                <div className="texto_comum">
                  ({telefone.ddd}) {telefone.numero}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={cliente.titular == undefined ? "" : "hidden"}>
        <p className="subtitulo">
          {idTelefone ? "Editar telefone" : "Adicionar novo número"}
        </p>
        <form>
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
            onClick={
              idTelefone === "" ? handleCreateTelefone : handleEditTelefone
            }
          >
            {idTelefone === "" ? "Adicionar" : "Editar"}
          </button>
        </form>
        <div className="flex gap-2">
          <button className="botao_comum">
            <Link href={`/cliente/${id}`}>Dados basicos</Link>
          </button>
          <button className="botao_comum">
            <Link href={`/cliente/documentos/${id}`}>Documentos</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelefonesCadastro;
