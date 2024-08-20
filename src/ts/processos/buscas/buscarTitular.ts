import Processo from "../../abstracoes/processo"
import Armazem from "../../dominio/armazem"
import ImpressaorCliente from "../../impressores/impressorCliente"
import Cliente from "../../modelos/cliente"
import BuscarCliente from "./buscarCliente"

export default class buscarTitularDoCliente extends Processo {
    
    constructor() {
        super()
    }

    processar(): void
    {
        var cliente = new BuscarCliente().processar()

        if(cliente == null) {
            return
        }

        if(cliente.Titular != null) 
        {
            console.log('Titular do cliente:')
            console.log(new ImpressaorCliente(cliente.Titular).imprimir())
        }
        else
        {
            console.log('Cliente não possui titular')
        }
    }
}