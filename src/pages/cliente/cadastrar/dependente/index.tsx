import { Cliente, Telefone } from "@/types/clienteTypes";
import { useRouter } from "next/router";
import React, { useState } from "react";

const CadastroCliente: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nome: "",
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

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(cliente);
    router.push("/cliente/documentos");
  };

  return (
    <form action="">
      <h1 className="titulo_formulario">Cadastro de Cliente</h1>

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
            value={cliente.dataNascimento.toLocaleDateString()}
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
