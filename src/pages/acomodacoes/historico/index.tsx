import Link from "next/link";
import React, { useEffect, useState } from "react";

type AcomodacoesInfos = {
  tipoAcomodacao: string;
  dataEntrada: string;
  dataSaida: string;
  hospedes: Hospede[];
};

type Hospede = {
  nome: string;
};

const Acomodacoes: React.FC = () => {
  const [acomodacoes, setAcomodacoes] = useState<AcomodacoesInfos[]>([]);

  // Mocke os dados
  useEffect(() => {
    setAcomodacoes([
      {
        tipoAcomodacao: "SolteiroSimples",
        dataEntrada: "2021-09-01",
        dataSaida: "2021-09-10",
        hospedes: [{ nome: "João" }, { nome: "Maria" }, { nome: "José" }],
      },
      {
        tipoAcomodacao: "CasalSimples",
        dataEntrada: "2021-09-01",
        dataSaida: "2021-09-10",
        hospedes: [{ nome: "João" }, { nome: "Maria" }],
      },
    ]);
  }, []);

  return (
    <div>
      <div>
        <h1 className="titulo_formulario">Histórico de acomodações </h1>
        <div className="flex gap-2 justify-center">
          <button className="botao_comum">
            <Link href={"/acomodacoes/cadastro"}>Cadastrar hospedagem</Link>
          </button>
          <button className="botao_comum">
            <Link href={"/acomodacoes"}>Acomodações ocupadas</Link>
          </button>
        </div>
      </div>
      {acomodacoes.map((a, index) => (
        <div
          key={index}
          className="flex flex-col bg-slate-200 rounded-md p-2 mt-5"
        >
          <div className="flex gap-2">
            <p className="texto_comum">{a.tipoAcomodacao}</p>
            <p className="texto_comum">
              Data check-in: {new Date(a.dataEntrada).toLocaleDateString()}
            </p>
            <p className="texto_comum">
              Data check-out:{new Date(a.dataSaida).toLocaleDateString()}
            </p>
          </div>
          <ul className="flex gap-2">
            {a.hospedes.map((hospede, index) => (
              <li key={index} className="texto_comum">
                {hospede.nome}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Acomodacoes;
