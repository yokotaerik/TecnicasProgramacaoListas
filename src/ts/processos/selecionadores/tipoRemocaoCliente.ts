import Processo from "../../abstracoes/processo";
import MenuTipoListagemClientes from "../../menus/menuTipoListagemClientes";
import MenuTipoRemoverCliente from "../../menus/menuTipoRemoverCliente";
import RemoverCliente from "../remocoes/removerCliente";


export default class TipoRemocaoClientes extends Processo {
    constructor(){
        super()
        this.menu = new MenuTipoRemoverCliente()
    }
    
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?')
        switch (this.opcao) {
            case 1:
                new RemoverCliente(this.opcao).processar()
                break;
            case 2:
                new RemoverCliente(this.opcao).processar()
                break
            default:
                console.log('Opção não entendida... :(')
        }
    }
}