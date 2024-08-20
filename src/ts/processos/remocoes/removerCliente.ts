import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import BuscarCliente from "../buscas/buscarCliente";


export default class RemoverCliente extends Processo {

    constructor(){
        super()
    }

    processar(): void {
        console.log('Iniciando remoção do cliente...')

        let cliente = new BuscarCliente().processar()

                

        if(cliente == null){
            return
        }
        
        let armazem = Armazem.InstanciaUnica

        armazem.Clientes.splice(armazem.Clientes.indexOf(cliente), 1)

        console.log('Cliente removido com sucesso!')
    }
}