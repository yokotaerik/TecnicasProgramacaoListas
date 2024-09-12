type Cliente = {
    id: number;
    nome: string;
    dataNascimento: Date;
    dataCadastro: Date
    documentos: Documento[];
    endereco: Endereco
    telefones: Telefone[]
    dependentes: Cliente[]
    titular?: Cliente
};

type Telefone = {
    id: string | null
    ddd: string;
    numero: string;
};

type Documento = {
    id: string | null
    tipo: string;
    numero: string;
    dataExpedicao: Date;
};

type Endereco = {
    id: string | null
    rua: string
    bairro: string
    cidade: string
    estado: string
    pais: string
    codigoPostal: string
};

export type { Cliente, Telefone, Documento, Endereco };