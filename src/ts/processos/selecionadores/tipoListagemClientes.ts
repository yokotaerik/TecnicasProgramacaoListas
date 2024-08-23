import Processo from "../../abstracoes/processo";
import MenuTipoListagemClientes from "../../menus/menuTipoListagemClientes";
import BuscarCliente from "../buscas/buscarCliente";
import buscarDepedentes from "../buscas/buscarDepedentes";
import buscarTitularDoCliente from "../buscas/buscarTitular";
import ListagemTitulares from "../listagemTitulares";

export default class TipoListagemClientes extends Processo {
    constructor(){
        super()
        this.menu = new MenuTipoListagemClientes()
    }
    
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?')
        switch (this.opcao) {
            case 1:
                this.processo = new ListagemTitulares()
                this.processo.processar()
                break;
            case 2:
                new buscarDepedentes(2).processar()
                break
            case 3:
                new buscarDepedentes(3).processar()
                break
            case 4:
                new buscarTitularDoCliente().processar() 
                break 
            case 5:
                new BuscarCliente(true).processar() 
                break
            default:
                console.log('Opção não entendida... :(')
        }
    }
}