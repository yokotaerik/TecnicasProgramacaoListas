import Acomodacao from "./acomodacao";
import Cliente from "./cliente";

export default class Hospedagem {
    private hospedes: Cliente[] = []
    private acomodacao: Acomodacao
    private dataEntrada: Date
    private dataSaida: Date

    constructor(dataEntrada: Date, dataSaida: Date, acomodacao: Acomodacao) {
        this.dataEntrada = dataEntrada;
        this.dataSaida = dataSaida;
        this.acomodacao = acomodacao;
    }

    public get Hospedes() { return this.hospedes }
    public get Acomodacao() { return this.acomodacao }
    public get DataEntrada() { return this.dataEntrada }
    public get DataSaida() { return this.dataSaida }
}