import Processo from "../../abstracoes/processo";
import MenuTipoRemoverCliente from "../../menus/cliente/menuTipoRemoverCliente";
import RemoverClienteDependente from "../remocoes/cliente/removerClienteDependente";
import RemoverClienteTitular from "../remocoes/cliente/removerClienteTitular";


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
                new RemoverClienteTitular().processar()
                break;
            case 2:
                new RemoverClienteDependente().processar()
                break
            default:
                console.log('Opção não entendida... :(')
        }
    }
}