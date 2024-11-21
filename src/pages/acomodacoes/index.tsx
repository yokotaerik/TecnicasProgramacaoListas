import Link from "next/link";
import React from "react";

const Acomodacoes: React.FC = () => {
  const acomodacoes = [
    {
      tipoAcomodacao: "SolteiroSimples",
      dataEntrada: "2021-09-01",
      dataSaida: "2021-09-10",
      hospedes: [
        { nome: "João" },
        { nome: "Maria" },
        { nome: "José" },
      ],
    },
    {
      tipoAcomodacao: "CasalSimples",
      dataEntrada: "2021-09-01",
      dataSaida: "2021-09-10",
      hospedes: [
        { nome: "João" },
        { nome: "Maria" },
      ],
    },
  ];

  return (
    <div>
      <div>
        <h1 className="titulo_formulario">Acomodações ocupadas</h1>
        <div className="flex gap-2">
          <button className="botao_comum">
            <Link href={"/acomodacoes/cadastro"}>Cadastrar hospedagem</Link>
          </button>
          <button className="botao_comum">
            <Link href={"/acomodacoes/historico"}>
              Histórico de acomodações
            </Link>
          </button>
        </div>
      </div>
      {acomodacoes.map((a, index) => (
        <div key={index} className="flex flex-col gap-2 bg-slate-200 rounded-md p-2 mt-5">
          <div className="flex gap-5">
            <p className="texto_comum">{a.tipoAcomodacao}</p>
            <p className="texto_comum">Data check-in: {new Date(a.dataEntrada).toLocaleDateString()}</p>
            <p className="texto_comum">Data check-out:{new Date(a.dataSaida).toLocaleDateString()}</p>
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

