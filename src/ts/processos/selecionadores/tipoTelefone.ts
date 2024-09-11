import Processo from "../../abstracoes/processo";
import MenuTipoOpcoesTelefone from "../../menus/cliente/MenuTipoOpcoesTelefone";
import Cliente from "../../modelos/cliente";
import CadastroTelefone from "../cadastros/cadastroTelefone";
import EdicaoTelefone from "../edicoes/telefone/editarTelefones";
import RemoverTelefone from "../remocoes/telefone/removerTelefone";


export default class TipoTelefone extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super()
        this.menu = new MenuTipoOpcoesTelefone()
        this.cliente = cliente
    }
    
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?')
        switch (this.opcao) {
            case 1:
                new CadastroTelefone(this.cliente).processar()
                break;
            case 2:
                new EdicaoTelefone(this.cliente).processar()
                break
            case 3:
                new RemoverTelefone(this.cliente).processar()
            default:
                console.log('Opção não entendida... :(')
        }
    }
}