import { Cliente, Telefone } from "@/types/clienteTypes";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const CadastroCliente: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({
    id: 1,
    nome: "Gerson Penha",
    dataNascimento: new Date(1985, 5, 15),
    dataCadastro: new Date(2021, 1, 10),
    documentos: [],
    endereco: {
      id: null,
      rua: "Rua 1",
      bairro: "Bairro 1",
      cidade: "Cidade 1",
      estado: "Estado 1",
      pais: "Pais 1",
      codigoPostal: "12345-678",
    },
    telefones: [],
    dependentes: [],
    titular: undefined
  });

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

      <div className="flex flex-col">
        <button className="botao_comum"><Link href={"/cliente/telefones"}> Telefones </Link></button>
        <button className="botao_comum"><Link href={"/cliente/documentos"}> Documentos </Link></button>
      </div>


      <div className="flex gap-5 w-full justify-between">
            <button onClick={handleSubmit} className="botao_editar">
              Editar
            </button>
            <button onClick={handleSubmit} className="botao_deletar">
              Deletar
            </button>
      </div>
    </form>
  );
};

export default CadastroCliente;
