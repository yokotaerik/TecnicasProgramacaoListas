import Processo from "../../abstracoes/processo"
import Armazem from "../../dominio/armazem"
import { NomeAcomadacao } from "../../enumeracoes/NomeAcomadacao"
import Entrada from "../../io/entrada"
import Acomodacao from "../../modelos/acomodacao"
import Hospedagem from "../../modelos/hospedagem"
import BuscarCliente from "../buscas/buscarCliente"

export default class CadastroHospedagem extends Processo {
    private acomodacoes: Acomodacao[]
    private tipoAcomodacao: NomeAcomadacao
    private buscadorCliente: BuscarCliente
    
    constructor(tipoAcomodacao: NomeAcomadacao) {
        super()
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes
        this.tipoAcomodacao = tipoAcomodacao
        this.buscadorCliente = new BuscarCliente()
        this.entrada = new Entrada()
    }

    processar(): void {
        let acomocadao = this.acomodacoes.find(a => a.NomeAcomadacao == this.tipoAcomodacao)
        if(acomocadao == undefined) {
           console.log("Não possuimos essa acomodação")
           return
        }

        let numeroHospedes = acomocadao?.CamaCasal * 2 + acomocadao?.CamaSolteiro;
        if(this.tipoAcomodacao == NomeAcomadacao.SolteiroMais){
            numeroHospedes = 1
        }

        let dataEntrada = this.entrada.receberData("Informe a data de entrada")
        let dataSaida = this.entrada.receberData("Informe a data de saída")


        let hospedagem = new Hospedagem(dataEntrada,dataSaida,acomocadao)

        while (hospedagem.Hospedes.length < numeroHospedes) {
            let cliente = this.buscadorCliente.processar()
            if(cliente != null){
                hospedagem.Hospedes.push(cliente)
            } else {
                let adicionar = this.entrada.receberTexto("Deseja adicionar mais um hospede? (S/N)").toUpperCase()
                if(adicionar == "N"){
                    break
                }
                if(adicionar == "S"){
                    continue
                }
            }
        }

        acomocadao.Hospedagem.push(hospedagem)
    }
}