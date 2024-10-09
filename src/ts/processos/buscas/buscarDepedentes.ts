import Processo from "../../abstracoes/processo"
import Armazem from "../../dominio/armazem"
import ImpressaorCliente from "../../impressores/impressorCliente"
import Cliente from "../../modelos/cliente"
import BuscarCliente from "./buscarCliente"

export default class buscarDepedentes extends Processo {
    
    constructor(opcao: number) {
        super()
        this.opcao = opcao;
    }

    processar(): void
    {
        console.log('Iniciando busca dos depedentes ...')

        if(this.opcao == 3){
            Armazem.InstanciaUnica.Clientes.filter(c => c.Titular != undefined).forEach
            (c => console.log(new ImpressaorCliente(c).imprimir()))
        }

        if(this.opcao == 2){
            var cliente = new BuscarCliente().processar()
    
            if (cliente == null)
            {
                return
            }
    
            if (cliente.Dependentes != null && cliente.Dependentes.length > 0) 
            {
                console.log('Dependentes do cliente: ')
                cliente.Dependentes.map(d => console.log(new ImpressaorCliente(d).imprimir()));
            } else
            {
                console.log('Cliente não possui dependentes')
            }
        }
    }
}