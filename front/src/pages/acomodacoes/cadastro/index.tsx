import api, { handleAxiosError } from '@/api';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const CadastroAcomodacao: React.FC = () => {
  const [tipoAcomodacao, setTipoAcomodacao] = useState<string>('SolteiroSimples');
  const [numHospedes, setNumHospedes] = useState<number>(1);
  const [documentosHospedes, setDocumentosHospedes] = useState<string[]>([]);
  const [dataEntrada, setDataEntrada] = useState<string>('');
  const [dataSaida, setDataSaida] = useState<string>('');
  const router = useRouter();

  const tiposAcomodacao: { [key: string]: number } = {
    'SolteiroSimples': 1,
    'SolteiroMais': 1,
    'CasalSimples': 2,
    'FamiliaSimples': 4,
    'FamiliaMais': 5,
    'FamiliaSuper': 6
  };

  // Função chamada quando o tipo de acomodação é selecionado
  const handleTipoAcomodacaoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTipo = event.target.value;
    setTipoAcomodacao(selectedTipo);
    setNumHospedes(tiposAcomodacao[selectedTipo]);

    // Reseta os estados quando muda o tipo de acomodação
    setDocumentosHospedes(Array(tiposAcomodacao[selectedTipo]).fill(''));
  };

  // Função para atualizar o documento de cada hóspede
  const handleDocumentoChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newDocumentos = [...documentosHospedes];
    newDocumentos[index] = event.target.value;
    setDocumentosHospedes(newDocumentos);
  };

  // Função de cadastro da acomodação
  const handleCadastroAcomodacao = async () => {

      const dadosAcomodacao = {
        tipoAcomodacao,
        documentosHospedes,
        dataEntrada: new Date(dataEntrada),
        dataSaida: new Date(dataSaida)
      };

      try {
        const response = await api.post("hospedagem/cadastro", dadosAcomodacao);

        if(response.status === 201){
          alert("Acomodação cadastrada com sucesso!");
          router.push("/acomodacoes");
        }
      } catch (error){
        handleAxiosError(error);
      }
  };

  return (
    <div>
      <h1 className='titulo_formulario mb-5'>Cadastro de hospedagem</h1>

      {/* Seletor do tipo de acomodação */}
      <label htmlFor="tipoAcomodacao" className='span_formulario'>Tipo de Acomodação</label>
      <select
        id="tipoAcomodacao"
        value={tipoAcomodacao}
        onChange={handleTipoAcomodacaoChange}
        className='input_formulario'
      >
        {Object.keys(tiposAcomodacao).map(tipo => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </select>

      {/* Formulário de datas */}
      <form>
        <span className='span_formulario'>Data entrada</span>
        <input className='input_formulario' type="date" onChange={(e) => setDataEntrada(e.target.value)} />
        <span className='span_formulario'>Data saída</span>
        <input className='input_formulario' type="date" onChange={(e) => setDataSaida(e.target.value)} />
      </form>

      <p className='subtitulo'>Número de Hóspedes: {numHospedes}</p>

      <ul>
        {Array.from({ length: numHospedes }, (_, index) => (
          <form key={index}>
            <label className='span_formulario' htmlFor={`hospede${index}`}>
              Hóspede {index + 1} documento:
            </label>
            <div className='flex'>
              <input
                className='input_formulario'
                type="text"
                id={`hospede${index}`}
                value={documentosHospedes[index] || ''}
                onChange={(e) => handleDocumentoChange(index, e)}
              />
            </div>
          </form>
        ))}
      </ul>

      <button className='submit_formulario' onClick={handleCadastroAcomodacao}>
        Salvar
      </button>
    </div>
  );
};

export default CadastroAcomodacao;
