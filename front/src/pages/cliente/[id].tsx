import api, { handleAxiosError } from "@/api";
import IsLoading from "@/componentes/isLoading/isLoading";
import { Cliente, Telefone } from "@/types/clienteTypes";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CadastroCliente: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [cliente, setCliente] = useState<Cliente>();

  useEffect(() => {
    if(id == undefined){
      router.push("/cliente");
    }
    getCliente();
  }, [id]);

  const getCliente = async () => {
    try {
      const response = await api.get(`/cliente/${id}`);
      setCliente(response.data);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let response = await api.put(`/cliente/atualizar`, cliente);
      if (response.status == 200) {
        alert("Cliente editado com sucesso");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleDelete = async () => {
    try {
      router.push("/cliente");
      let response = await api.delete(`/cliente/excluir/${id}`);
      if (response.status == 200) {
        alert("Cliente deletado com sucesso");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  if (!cliente) {
    return <IsLoading />;
  }

  return (
    <form action="">
      <h1 className="titulo_formulario">Informações do Cliente</h1>

      <div id="form-cliente">
        {/* DADOS BASICOS */}
        <div>
          <label htmlFor="nome" className="span_formulario">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            value={cliente.nome}
            className="input_formulario"
            onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
          />

          <label htmlFor="dataNascimento" className="span_formulario">
            Data nascimento
          </label>
          <input
            type="date"
            id="dataNasc"
            value={new Date(cliente.dataNascimento).toISOString().split("T")[0]}
            onChange={(e) =>
              setCliente({
                ...cliente,
                dataNascimento: new Date(e.target.value),
              })
            }
            className="input_formulario"
          />
        </div>

        <label htmlFor="rua" className="span_formulario">
          Rua
        </label>
        <input
          type="text"
          id="rua"
          value={cliente.endereco.rua}
          onChange={(e) =>
            setCliente({
              ...cliente,
              endereco: { ...cliente.endereco, rua: e.target.value },
            })
          }
          className="input_formulario"
          disabled={cliente.titular == undefined ? false : true}
        />
        <label htmlFor="bairro" className="span_formulario">
          Bairro
        </label>
        <input
          type="text"
          id="bairro"
          value={cliente.endereco.bairro}
          onChange={(e) =>
            setCliente({
              ...cliente,
              endereco: { ...cliente.endereco, bairro: e.target.value },
            })
          }
          disabled={cliente.titular == undefined ? false : true}
          className="input_formulario"
        />
        <label htmlFor="cidade" className="span_formulario">
          Cidade
        </label>
        <input
          type="text"
          id="cidade"
          value={cliente.endereco.cidade}
          onChange={(e) =>
            setCliente({
              ...cliente,
              endereco: { ...cliente.endereco, cidade: e.target.value },
            })
          }
          disabled={cliente.titular == undefined ? false : true}
          className="input_formulario"
        />
        <label htmlFor="estado" className="span_formulario">
          Estado
        </label>
        <input
          type="text"
          id="estado"
          value={cliente.endereco.estado}
          onChange={(e) =>
            setCliente({
              ...cliente,
              endereco: { ...cliente.endereco, estado: e.target.value },
            })
          }
          disabled={cliente.titular == undefined ? false : true}
          className="input_formulario"
        />
        <label htmlFor="pais" className="span_formulario">
          País
        </label>
        <input
          type="text"
          id="pais"
          value={cliente.endereco.pais}
          onChange={(e) =>
            setCliente({
              ...cliente,
              endereco: { ...cliente.endereco, pais: e.target.value },
            })
          }
          disabled={cliente.titular == undefined ? false : true}
          className="input_formulario"
        />
        <label htmlFor="codigoPostal" className="span_formulario">
          Código Postal
        </label>
        <input
          type="text"
          id="codigoPostal"
          value={cliente.endereco.codigoPostal}
          onChange={(e) =>
            setCliente({
              ...cliente,
              endereco: { ...cliente.endereco, codigoPostal: e.target.value },
            })
          }
          disabled={cliente.titular == undefined ? false : true}
          className="input_formulario"
        />
      </div>

      <div className="flex flex-col">
        <Link className="botao_comum" href={`/cliente/telefones/${cliente.id}`}>
          Telefones
        </Link>
        <Link
          className="botao_comum"
          href={`/cliente/documentos/${cliente.id}`}
        >
          Documentos
        </Link>
      </div>

      <div className="flex gap-5 w-full justify-between">
        <button onClick={handleSubmit} className="botao_editar">
          Editar
        </button>
        <button onClick={handleDelete} className="botao_deletar">
          Deletar
        </button>
      </div>
    </form>
  );
};

export default CadastroCliente;
