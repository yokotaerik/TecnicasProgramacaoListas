import { Cliente, Telefone } from '@/types/clienteTypes';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const CadastroCliente: React.FC = () => {
    const [cliente, setCliente] = useState<Cliente>({
        id: 0,
        nome: '',
        dataNascimento: new Date(), 
        dataCadastro: new Date(),
        documentos: [],
        endereco: {
            rua: '',
            bairro: '',
            cidade: '',
            estado: '',
            pais: '',
            codigoPostal: '',
        },
        telefones: [],
        dependentes: [],
    });

    const router = useRouter();


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(cliente);
        router.push("/cliente/telefones")
    };

    return (
      <form action="">
        <h1>Cadastro de Cliente</h1>

        <div id='form-cliente'>
            <label htmlFor="nome">Nome</label>
            <input
            type="text"
            id="nome"
            value={cliente.nome}
            onChange={(e) =>
                setCliente({ ...cliente, nome: e.target.value })
            }
            />

            <label htmlFor="dataNascimento">Data nascimento</label>
            <input
                type="date"
                id="dataNasc"
                value={cliente.dataNascimento.toLocaleDateString()}
                onChange={(e) => setCliente({ ...cliente, dataNascimento: new Date(e.target.value) })}
            />

            <label htmlFor="rua">Rua</label>
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
            />
            <label htmlFor="bairro">Bairro</label>
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
            />
            <label htmlFor="cidade">Cidade</label>
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
            />
            <label htmlFor="estado">Estado</label>
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
            />
            <label htmlFor="pais">País</label>
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
            />
            <label htmlFor="codigoPostal">Código Postal</label>
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
            />
        </div>

        <button
        onClick={handleSubmit}
        >Cadastrar</button>
      </form>
    );
};

export default CadastroCliente;