import Processo from "../../../abstracoes/processo"
import Armazem from "../../../dominio/armazem"
import BuscarCliente from "../../buscas/buscarCliente"


export default class RemoverClienteDependente extends Processo {
    constructor() {
        super()
    }

    processar(): void {
        let armazem = Armazem.InstanciaUnica

        let cliente = new BuscarCliente().processar()

        if(cliente == null){
            return
        }

        if(cliente.isTitular() == true){
            console.log('Cliente titular!')
            return
        }

        cliente.Titular.Dependentes.splice(cliente.Titular.Dependentes.indexOf(cliente), 1)

        armazem.Clientes.splice(armazem.Clientes.indexOf(cliente), 1)

        console.log('Cliente removido com sucesso!')
    }
}