import Processo from "../abstracoes/processo"
import { NomeAcomadacao } from "../enumeracoes/NomeAcomadacao"
import MenuTipoCadastroHospedagem from "../menus/acomodacoes/menuTipoCadastroHospedagem"
import MenuPrincipal from "../menus/menuPricipal"
import CadastroHospedagem from "./acomodacoes/cadastroHospedagem"
import ListagemAcomodacoes from "./acomodacoes/listagemAcomodacoes"
import ListagemAcomodacoesAtivas from "./acomodacoes/listagemAcomodacoesAtivas"
import TipoCadastroCliente from "./selecionadores/tipoCadastroCliente"
import TipoEdicaoCliente from "./selecionadores/tipoEdicaoCliente"
import TipoListagemClientes from "./selecionadores/tipoListagemClientes"
import TipoRemocaoClientes from "./selecionadores/tipoRemocaoCliente"
import TipoSelecaoHospedagem from "./selecionadores/tipoSelecaoHospedagem"


export default class Principal extends Processo {
    constructor() {
        super()
        this.execucao = true
        this.menu = new MenuPrincipal()
    }
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        switch (this.opcao) {
            case 1:
                this.processo = new TipoCadastroCliente()
                this.processo.processar()
                break
            case 2:
                new TipoEdicaoCliente().processar()
                break
            case 3:
                this.processo = new TipoListagemClientes()
                this.processo.processar()
                break
            case 4:
                new TipoRemocaoClientes().processar()
                break
            case 5:
                new ListagemAcomodacoes().processar()
                break
            case 6:
                new CadastroHospedagem(new TipoSelecaoHospedagem().obterNomeAcomadacao() as NomeAcomadacao).processar()
                break
            case 7:
                new ListagemAcomodacoesAtivas().processar()
                break   
            case 0: 
                this.execucao = false
                console.log('Até logo!')
                console.clear()
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}