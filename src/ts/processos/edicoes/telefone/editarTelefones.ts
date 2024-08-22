import Processo from "../../../abstracoes/processo"
import ImpressorTelefone from "../../../impressores/impressorTelefone";
import Cliente from "../../../modelos/cliente"

export default class EdicaoTelefone extends Processo {
    private cliente: Cliente;
    
    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }
    
    processar(): void {

        while(this.execucao){
            this.cliente.Telefones.forEach((telefone, index) => {
                console.log(`Telefone ${index + 1}: ${new ImpressorTelefone(telefone).imprimir()}`)
            });
    
            let opcao = this.entrada.receberNumero('Qual telefone deseja editar? Digite 0 para sair.');
            if(opcao === 0){
                console.log('Saindo da edição de telefones...');
                this.execucao = false;
            }            
            
            let telefone = this.cliente.Telefones[opcao - 1];
    
            let ddd = this.entrada.receberTexto('Digite o DDD:');
            let numero = this.entrada.receberTexto('Digite o número:');
    
            telefone.Ddd = ddd;
            telefone.Numero = numero;
    
            console.log('Telefone editado com sucesso!');
        }
    }
}
