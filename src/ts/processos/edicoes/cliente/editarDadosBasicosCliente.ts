import Processo from "../../../abstracoes/processo"
import Cliente from "../../../modelos/cliente"

export default class EdicaoDadosBasicosCliente extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente,opcao: number) {
        super()
        this.cliente = cliente
        this.opcao = opcao
    }

    processar(): void {
        switch (this.opcao) {
            case 1:
                let nome = this.entrada.receberTexto('Qual o novo nome do cliente?')
                this.cliente.Nome = nome    
                break
            case 2:
                let nomeSocial = this.entrada.receberTexto('Qual o novo nome social do cliente?')
                this.cliente.NomeSocial = nomeSocial
                break
            case 3:
                let dataNascimento = this.entrada.receberData('Qual a nova data de nascimento do cliente?')
                this.cliente.DataNascimento = dataNascimento
                break
            default:
                console.log('Opção não entendida :(')
        }

        console.log('Finalizando a edição dos dados básicos do cliente...')
    }
}
