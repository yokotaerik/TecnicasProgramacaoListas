import api from '@/api';
import React, { useState } from 'react';


const BuscarHospede: React.FC = () => {
    const [numDoc, setNumDoc] = useState<string>('');

    const handleSearch = async () => {
        try {
            const response = await api.get(`/get/cliente/doc/${numDoc}`);
            if(response.data) {
                alert('Hospede encontrado');
            }
        } catch {
            alert('Hospede não encontrado');
        }
    };

    return (
        <div>
          <form >
            <label className='span_formulario' >Documento do hospede:</label>
            <div className='flex gap-2'>
              <input className='input_formulario' type="text" id="hospede" onChange={(e) => setNumDoc(e.target.value)}/>
              <button className='botao_comum' onClick={handleSearch}> Buscar </button>
            </div>
          </form>
        </div>
    );
};

export default BuscarHospede;