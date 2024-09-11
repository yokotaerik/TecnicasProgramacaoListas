import Processo from "../../abstracoes/processo"
import Armazem from "../../dominio/armazem"
import ImpressorAcomodacao from "../../impressores/impressorAcomodacao"
import Impressor from "../../interfaces/impressor"
import Acomodacao from "../../modelos/acomodacao"
import Hospedagem from "../../modelos/hospedagem"


export default class ListagemAcomodacoesAtivas extends Processo {
    private acomodacoes: Acomodacao[]
    private impressor!: Impressor
    constructor() {
        super()
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes
    }
    processar(): void {
        console.clear()
        console.log('Iniciando a listagem das acomodações ocupadas no dia de hoje...')

        let ativas: Hospedagem[] = []

        this.acomodacoes.forEach(acomodacao => {
            acomodacao.Hospedagem.forEach(hospedagem => {
                let hoje = new Date()
                if(hospedagem.DataEntrada <= hoje && hospedagem.DataSaida >= hoje){
                    ativas.push(hospedagem)
                }
            })})

        console.log(`-------------------------------------------------`)
        ativas.forEach(hospedagem => {
            console.log(hospedagem.Acomodacao.NomeAcomadacao)
            console.log(`Hospedes:`)
            hospedagem.Hospedes.forEach(hospede => {
                console.log(`Nome: ${hospede.Nome}`)
                console.log(`-------------------------------------------------`)
            })
            console.log(`Data de entrada: ${hospedagem.DataEntrada.toLocaleDateString()}`)
            console.log(`Data de saída: ${hospedagem.DataSaida.toLocaleDateString()}`)
        console.log(`-------------------------------------------------`)})
    }
}