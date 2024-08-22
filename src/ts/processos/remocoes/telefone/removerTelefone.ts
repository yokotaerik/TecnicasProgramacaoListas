import Processo from "../../../abstracoes/processo"
import ImpressorTelefone from "../../../impressores/impressorTelefone"
import Cliente from "../../../modelos/cliente"
import Telefone from "../../../modelos/telefone"


export default class RemoverTelefone extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        this.cliente.Telefones.forEach((telefone, index) => {
            console.log(`Telefone ${index + 1}: ${new ImpressorTelefone(telefone).imprimir()}`)
        });

        let opcao = this.entrada.receberNumero('Qual telefone deseja deletar? Digite 0 para sair.');
        if(opcao === 0){
            console.log('Saindo da edição de telefones...');
            this.execucao = false;
        }    

        let telefone = this.cliente.Telefones[opcao - 1]

        this.cliente.Telefones.splice(this.cliente.Telefones.indexOf(telefone), 1)

        this.cliente.Dependentes.forEach(dependente => {
            dependente.Telefones.splice(dependente.Telefones.indexOf(telefone), 1)
        })

        console.log('Telefone removido com sucesso!')
    }

}