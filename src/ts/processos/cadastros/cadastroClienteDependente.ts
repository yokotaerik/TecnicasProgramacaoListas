import Processo from "../../abstracoes/processo"
import Armazem from "../../dominio/armazem"
import Cliente from "../../modelos/cliente"
import Endereco from "../../modelos/endereco"
import BuscarCliente from "../buscas/buscarCliente"


export default class CadastroClienteDependente extends Processo {

    constructor() {
        super()
    }

    processar(): void {
        let armazem = Armazem.InstanciaUnica
        console.log('Iniciando o cadastro de um novo cliente dependente...')

        console.log('Iniciando a busca pelo titular...')
        let titular = new BuscarCliente().processar()
        if(titular == null) {
            return
        }
        
        let nome = this.entrada.receberTexto('Qual o nome do novo cliente?')
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente?')
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?')
        let cliente = new Cliente(nome, nomeSocial, dataNascimento)

        cliente.Endereco = titular.Endereco.clonar() as Endereco
        cliente.Telefones.push(... titular.Telefones)

        armazem.Clientes.push(cliente)

        console.log('Finalizando o cadastro do cliente...')
    }
}