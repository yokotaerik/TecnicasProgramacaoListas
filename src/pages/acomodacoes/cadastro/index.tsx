import React, { useState } from 'react';

const CadastroAcomodacao: React.FC = () => {
  const [tipoAcomodacao, setTipoAcomodacao] = useState<string>("");
  const [numHospedes, setNumHospedes] = useState<number>(0);

  const tiposAcomodacao: { [key: string]: number } = {
    "SolteiroSimples": 1,
    "SolteiroMais": 1,
    "CasalSimples": 2,
    "FamiliaSimples": 4,
    "FamiliaMais": 5,
    "FamiliaSuper": 6
  };

  const handleTipoAcomodacaoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTipo = event.target.value;
    setTipoAcomodacao(selectedTipo);
    setNumHospedes(tiposAcomodacao[selectedTipo]);
  };

  return (
    <div>
      <h1 className='titulo_formulario mb-5'> Cadastro de hospedagem </h1>
      <label htmlFor="tipoAcomodacao" className='span_formulario'>Tipo de Acomodação</label>
      <select id="tipoAcomodacao" value={tipoAcomodacao} onChange={handleTipoAcomodacaoChange} className='input_formulario'>
        {Object.keys(tiposAcomodacao).map(tipo => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </select>
      <form action="">
        <span className='span_formulario'>Data entrada</span>
        <input className='input_formulario' type="date" />
        <span className='span_formulario'>Data saída</span>
        <input className='input_formulario' type="date" />
      </form>
      <p className='subtitulo'>Número de Hóspedes: {numHospedes}</p>
      <ul>
        {Array.from({ length: numHospedes }, (_, index) => (
          <form>
            <label className='span_formulario' htmlFor={`hospede${index}`}>Hóspede {index + 1} documento:</label>
            <input className='input_formulario' type="text" id={`hospede${index}`} />
          </form>
        ))}
      </ul>
      <button className='submit_formulario'>Salvar</button>
    </div>
  );
};

export default CadastroAcomodacao;