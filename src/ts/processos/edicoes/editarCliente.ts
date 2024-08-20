import Processo from "../../abstracoes/processo"
import ImpressorTelefone from "../../impressores/impressorTelefone"
import Cliente from "../../modelos/cliente"
import BuscarCliente from "../buscas/buscarCliente"
import CadastrarDocumentosCliente from "../cadastros/cadastrarDocumentosCliente"
import CadastroEnderecoTitular from "../cadastros/cadastroEnderecoTitular"


export default class EdicaoCliente extends Processo {
    private cliente: Cliente

    constructor(opcao: number, cliente: Cliente) {
        super()
        this.cliente = cliente
        this.opcao = opcao
    }

    processar(): void {
        console.log('Iniciando o edição de um cliente...')

        switch (this.opcao) {
            case 1:
                this.editarNome()
                break
            case 2:
                this.editarNomeSocial()
                break
            case 3:
                this.editarDataNascimento()
            case 4:
                this.editarTelefone()
                break
            case 5:
                this.editarEndereco()
                break
            case 6:
                this.editarDocumentos()
                break
            case 7:
                this.editarTitular()
                break
            default:
                console.log('Opção não entendida :(')

        }

        console.log('Finalizando o edição de cliente...')
    }

    private editarNome() {
        let nome = this.entrada.receberTexto('Qual o novo nome cliente?')
        this.cliente.Nome = nome
    }

    private editarNomeSocial() {
        let nomeSocial = this.entrada.receberTexto('Qual o novo nome social do cliente?')
        this.cliente.NomeSocial = nomeSocial
    }

    private editarDataNascimento() {
        let dataNascimento = this.entrada.receberData('Qual a nova data de nascimento?')
        this.cliente.DataNascimento = dataNascimento
    }

    private editarTelefone() {
        this.cliente.Telefones.forEach((telefone, index) => {
            console.log(index);
            console.log(new ImpressorTelefone(telefone).imprimir());
        });
    }

    private editarEndereco() {
        let endereco = new CadastroEnderecoTitular(this.cliente).processar()
    }

    private editarDocumentos() {
        new CadastrarDocumentosCliente(this.cliente).processar()
    }

    private editarTitular() {
        let titular = new BuscarCliente().processar();
        if(titular == null) {
            return
        }
        this.cliente.Titular = titular
    }
}