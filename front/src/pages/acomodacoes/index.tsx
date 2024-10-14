import api, { handleAxiosError } from "@/api";
import { AcomodacoesInfos } from "@/types/clienteTypes";
import Link from "next/link";
import React, { useEffect, useState } from "react";



const Acomodacoes: React.FC = () => {
  const [acomodacoes, setAcomodacoes] = useState<AcomodacoesInfos[]>([]);

  const getAcomodacoes = async () => {
    try {
      const response = await api.get("/hospedagem/get/ocupadas");
      console.log(response.data);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    const fetchAcomodacoes = async () => {
      const data = await getAcomodacoes();
      setAcomodacoes(data);
    };

    fetchAcomodacoes();
  }, []);

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
        <div key={index} className="flex gap-4 bg-slate-200 rounded-md p-2 mt-5">
            <p className="texto_comum">{a.tipoAcomodacao}</p>
            <p className="texto_comum">Data check-in: {new Date(a.dataEntrada).toLocaleDateString()}</p>
            <p className="texto_comum">Data check-out:{new Date(a.dataSaida).toLocaleDateString()}</p>
          <div className="">
            <ul>
              {a.hospedes.map((hospede, index) => (
                <li key={index} className="texto_comum">
                  {hospede.nome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Acomodacoes;
