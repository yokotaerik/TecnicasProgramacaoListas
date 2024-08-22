import Processo from "../../abstracoes/processo"
import { TipoDocumento } from "../../enumeracoes/TipoDocumento"
import Cliente from "../../modelos/cliente"
import Documento from "../../modelos/documento"
import Telefone from "../../modelos/telefone"


export default class CadastroTelefone extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        let ddd = this.entrada.receberTexto("Qual o DDD do telefone?")
        let numero = this.entrada.receberTexto('Qual o número do telefone?')
        let tel = new Telefone(ddd, numero)
        this.cliente.adicionarTelefone(tel)
    }
}