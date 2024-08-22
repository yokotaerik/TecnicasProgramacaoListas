import Processo from "../../abstracoes/processo"
import MenuPrincipal from "../../menus/menuPricipal"
import TipoCadastroCliente from "./tipoCadastroCliente"
import TipoEdicaoCliente from "./tipoEdicaoCliente"
import TipoListagemClientes from "./tipoListagemClientes"
import TipoRemocaoClientes from "./tipoRemocaoCliente"


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