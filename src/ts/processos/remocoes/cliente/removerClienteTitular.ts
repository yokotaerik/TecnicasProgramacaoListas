import Processo from "../../../abstracoes/processo";
import Armazem from "../../../dominio/armazem";
import BuscarCliente from "../../buscas/buscarCliente";

export default class RemoverClienteTitular extends Processo {
    
    constructor(){
        super()
    }

    processar(): void {
        console.log('Iniciando remoção do cliente...')
        let armazem = Armazem.InstanciaUnica

        let cliente = new BuscarCliente().processar()

        if(cliente == null){
            return
        }
        if(cliente.isTitular() == false){
            console.log('Cliente não titular!')
            return
        }

        cliente.Dependentes.forEach(c => {
            armazem.Clientes.splice(armazem.Clientes.indexOf(c), 1)
        })

        armazem.Clientes.splice(armazem.Clientes.indexOf(cliente), 1)

        console.log('Cliente e seus dependentes removidos com sucesso!')
    }
}