import Documento from "./documento"
import Endereco from "./endereco"
import Telefone from "./telefone"

export default class Cliente {
    private nome: string
    private nomeSocial: string
    private dataNascimento: Date
    private dataCadastro: Date
    private telefones: Telefone[] = []
    private endereco!: Endereco
    private documentos: Documento[] = []
    private dependentes: Cliente[] = []
    private titular!: Cliente

    constructor(nome: string, nomeSocial: string, dataNascimento: Date) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.dataNascimento = dataNascimento
        this.dataCadastro = new Date()
    }

    public set Titular(titular: Cliente) { this.titular = titular }
    public set Nome(nome: string) { this.nome = nome }
    public set NomeSocial(nomeSocial: string) { this.nomeSocial = nomeSocial }
    public set DataNascimento(dataNascimento: Date) { this.dataNascimento = dataNascimento }
    public set DataCadastro(dataCadastro: Date) { this.dataCadastro = dataCadastro }
    public set Endereco(endereco: Endereco) { this.endereco = endereco }


    public get Nome() { return this.nome }
    public get NomeSocial() { return this.nomeSocial }
    public get DataNascimento() { return this.dataNascimento }
    public get DataCadastro() { return this.dataCadastro }
    public get Telefones() { return this.telefones }
    public get Endereco() { return this.endereco }
    public get Documentos() { return this.documentos }
    public get Dependentes() { return this.dependentes }
    public get Titular() { return this.titular }

    public removerDependente(dependente: Cliente) {
        let index = this.dependentes.indexOf(dependente)
        if(index >= 0) {
            this.dependentes.splice(index, 1)
        }
    }

    public adicionarDependente(dependente: Cliente) {
        this.dependentes.push(dependente)
    }

    public removerTitularEDepedentes() {
        this.dependentes = []
    }
}