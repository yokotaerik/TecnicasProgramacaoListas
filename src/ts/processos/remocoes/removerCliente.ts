import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import BuscarCliente from "../buscas/buscarCliente";


export default class RemoverCliente extends Processo {

    constructor(opcao: number) {
        super()
        this.opcao = opcao
    }

    processar(): void {
        console.log('Iniciando remoção do cliente...')
        let armazem = Armazem.InstanciaUnica

        if(this.opcao == 1)
        {
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

        if(this.opcao == 2)
        {
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
}