import Processo from "../../abstracoes/processo"
import MenuTipoOpcoesDocumento from "../../menus/menuTipoOpcoesDocumentos"
import Cliente from "../../modelos/cliente"
import CadastrarDocumentosCliente from "../cadastros/cadastrarDocumentosCliente"
import RemoverDocumento from "../remocoes/documento/removerDocumento"


export default class TipoDocumento extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super()
        this.menu = new MenuTipoOpcoesDocumento()
        this.cliente = cliente
    }
    
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?')
        switch (this.opcao) {
            case 1:
                new CadastrarDocumentosCliente(this.cliente).processar()
                break;
            case 2:
                new RemoverDocumento(this.cliente).processar()
                break
            default:
                console.log('Opção não entendida... :(')
        }
    }
}