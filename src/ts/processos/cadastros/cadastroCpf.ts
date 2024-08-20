import Processo from "../../abstracoes/processo";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";

export default class CadastroCpf extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {

        if(this.cliente.Documentos.some(d => d.Tipo === TipoDocumento.CPF)){
            console.log('Cliente já possui CPF cadastrado')
            return
        }

        let numero = this.entrada.receberTexto('Qual o número do documento?')
        let dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')
        let cpf = new Documento(numero, TipoDocumento.CPF, dataExpedicao)
        this.cliente.Documentos.push(cpf)
    }
}