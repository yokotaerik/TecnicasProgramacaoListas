import api, { handleAxiosError } from "@/api";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Dependente = {
  nome: string;
  dataNascimento: Date;
  titularDocumento: string;
};

const CadastroCliente: React.FC = () => {
  const [cliente, setCliente] = useState<Dependente>({
    nome: "",
    dataNascimento: new Date(),
    titularDocumento: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(cliente);

    try {
      let response = await api.post("/cliente/cadastro/dependente", cliente);

      if (response.status === 201) {
        router.push(`/cliente/documentos/${response.data.id}`);
      }
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  return (
    <form action="">
      <h1 className="titulo_formulario">Cadastro de Cliente</h1>

      <div>
        <label htmlFor="titularDocumento" className="span_formulario">
          Documento do titular
        </label>
        <input
          type="text"
          id="titularDocumento"
          value={cliente.titularDocumento}
          onChange={(e) =>
            setCliente({ ...cliente, titularDocumento: e.target.value })
          }
          className="input_formulario"
        />
      </div>

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
      </div>

      <button onClick={handleSubmit} className="submit_formulario">
        Cadastrar
      </button>
    </form>
  );
};

export default CadastroCliente;
