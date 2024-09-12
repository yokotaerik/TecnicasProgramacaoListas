import Link from "next/link";
import React from "react";

const Acomodacoes: React.FC = () => {
  const hospedagens = [1, 2, 3];
  const tiposAcomodacao = [
    "SolteiroSimples",
    "CasalSimples",
    "FamiliaSimples",
    "FamiliaMais",
    "SolteiroMais",
    "FamiliaSuper",
  ];
  return (
    <div>
      <h1 className="titulo_formulario">Acomodações</h1>
      {tiposAcomodacao.map((tipo, index) => (
        <div key={index}>
          <div className="flex gap-5 items-center">
            <h2 className="subtitulo">{tipo}</h2>
            <button className="botao_comum">
              <Link href={"/acomodacoes/cadastro"}>Cadastrar hospedagem</Link>
            </button>
          </div>
          <ul>
            {hospedagens.map((hospedagem, index) => (
              <li key={index}>
                <span className="texto_normal">{hospedagem}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Acomodacoes;
