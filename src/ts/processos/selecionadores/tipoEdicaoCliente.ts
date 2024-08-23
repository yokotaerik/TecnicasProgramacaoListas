import Processo from "../../abstracoes/processo";
import MenuTipoEditarCliente from "../../menus/menuTipoEditarCliente";
import MenuTipoOpcoesTelefone from "../../menus/MenuTipoOpcoesTelefone";
import BuscarCliente from "../buscas/buscarCliente";
import EdicaoDadosBasicosCliente from "../edicoes/cliente/editarDadosBasicosCliente";
import EdicaoEndereco from "../edicoes/endereco/editarEnderecoCliente";
import EdicaoTelefone from "../edicoes/telefone/editarTelefones";
import TipoDocumento from "./tipoDocumentos";
import TipoTelefone from "./tipoTelefone";

export default class TipoEdicaoCliente extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoEditarCliente()
        this.execucao = true    
    }
    processar(): void {
        let cliente = new BuscarCliente().processar();
        if (cliente == null) return

        while(this.execucao){
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual opção desejada?')
            
            switch (this.opcao) {
                case 1:
                    new EdicaoDadosBasicosCliente(cliente, this.opcao).processar()
                    break
                case 2:
                    new EdicaoDadosBasicosCliente(cliente, this.opcao).processar()
                    break
                case 3:
                    new EdicaoDadosBasicosCliente(cliente, this.opcao).processar()
                    break
                case 4:
                    new TipoTelefone(cliente).processar()
                    break
                case 5:
                    new EdicaoEndereco(cliente).processar()
                    break
                case 6:
                    new TipoDocumento(cliente).processar();
                    break
                case 0:
                    console.log('Saindo da edição de cliente...')
                    this.execucao = false
                    break
                default:
                    console.log('Opção não entendida :(')
            }
        }

    }
}