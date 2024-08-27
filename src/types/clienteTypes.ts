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
    ddd: string;
    numero: string;
};

type Documento = {
    tipo: string;
    numero: string;
    dataExpedicao: Date;
};

type Endereco = {
    rua: string
    bairro: string
    cidade: string
    estado: string
    pais: string
    codigoPostal: string
};

export type { Cliente, Telefone, Documento, Endereco };