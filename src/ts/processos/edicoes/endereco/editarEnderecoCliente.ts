import Processo from "../../../abstracoes/processo"
import Cliente from "../../../modelos/cliente"
import ImpressorEndereco from "../../../impressores/impressorEndereco";

export default class EdicaoEndereco extends Processo {
    private cliente: Cliente
    
    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente
        this.execucao = true
    }
    
    processar(): void {
        while(this.execucao){
            if(!this.cliente.isTitular()){
                console.log('Cliente dependente. Não é possível editar o endereço.')
                break
            } 

            console.log(new ImpressorEndereco(this.cliente.Endereco).imprimir())
    
            let opcao = this.entrada.receberNumero('Qual informação deseja editar? Digite 0 para sair.')
            
            switch (opcao) {
                case 1:
                    let rua = this.entrada.receberTexto('Digite a rua:')
                    this.cliente.Endereco.Rua = rua
                    break
                case 2:
                    let bairro = this.entrada.receberTexto('Digite o bairro:')
                    this.cliente.Endereco.Bairro = bairro
                    break
                case 3:
                    let cidade = this.entrada.receberTexto('Digite a cidade:')
                    this.cliente.Endereco.Cidade = cidade
                    break
                case 4:
                    let estado = this.entrada.receberTexto('Digite o estado:')
                    this.cliente.Endereco.Estado = estado
                    break
                case 5:
                    let pais = this.entrada.receberTexto('Digite o país:')
                    this.cliente.Endereco.Pais = pais
                    break
                case 6:
                    let codigoPostal = this.entrada.receberTexto('Digite o código postal:')
                    this.cliente.Endereco.CodigoPostal = codigoPostal
                    break
                case 0: 
                    console.log('Saindo da edição de endereço...')
                    this.execucao = false
                    break
                default:
                    console.log('Opção não entendida :(')
            }
        }
    }
}
