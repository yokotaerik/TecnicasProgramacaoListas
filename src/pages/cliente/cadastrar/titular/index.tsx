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
          className="input_formulario"
        />
      </div>

      <button onClick={handleSubmit} className="submit_formulario">
        Cadastrar
      </button>
    </form>
  );
};

export default CadastroCliente;
