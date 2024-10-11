import { NomeAcomadacao } from "../enumeracoes/NomeAcomadacao"
import Cliente from "./cliente"
import Hospedagem from "./hospedagem"

export default class Acomodacao {
    private nomeAcomadacao: NomeAcomadacao
    private camaSolteiro: number
    private camaCasal: number
    private suite: number
    private climatizacao: Boolean
    private garagem: number
    private hospedagem: Hospedagem[] = []
    private qntDisponveis: number

    constructor(nomeAcomadacao: NomeAcomadacao, camaSolteiro: number, camaCasal: number,
        suite: number, climatizacao: Boolean, garagem: number) {
        this.nomeAcomadacao = nomeAcomadacao
        this.camaSolteiro = camaSolteiro
        this.camaCasal = camaCasal
        this.suite = suite
        this.climatizacao = climatizacao
        this.garagem = garagem
        this.qntDisponveis = 10
    }

    public get NomeAcomadacao() { return this.nomeAcomadacao }
    public get CamaSolteiro() { return this.camaSolteiro }
    public get CamaCasal() { return this.camaCasal }
    public get Suite() { return this.suite }
    public get Climatizacao() { return this.climatizacao }
    public get Garagem() { return this.garagem }
    public get Hospedagem() { return this.hospedagem }  

    public get QntDisponiveis() { return this.qntDisponveis - this.Hospedagem.filter(h => h.DataSaida >= new Date()).length }

}