import Processo from "../../../abstracoes/processo"
import ImpressorTelefone from "../../../impressores/impressorTelefone";
import Cliente from "../../../modelos/cliente"

export default class EdicaoTelefone extends Processo {
    private cliente: Cliente;
    
    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
        this.execucao = true;
    }
    
    processar(): void {

        while(this.execucao){
            if(!this.cliente.isTitular()){
                console.log('Cliente dependente. Não é possível editar o endereço.')
                break
            } 

            this.cliente.Telefones.forEach((telefone, index) => {
                console.log(`|${index + 1}: ${telefone.Ddd} ${telefone.Numero}`);
            });
    
            let opcao = this.entrada.receberNumero('Qual telefone deseja editar? Digite 0 para sair.');
            if(opcao === 0){
                console.log('Saindo da edição de telefones...');
                this.execucao = false;
                break;
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
