import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressaorCliente from "../../impressores/impressorCliente";
import Cliente from "../../modelos/cliente";

export default class BuscarCliente extends Processo {
    private imprimir: boolean;

    constructor(imprimir: boolean = false) {
        super();
        this.execucao = true;
        this.imprimir = imprimir;
    }
    
    processar(): Cliente | null {
        let armazem = Armazem.InstanciaUnica;

        let numeroDocumento = this.entrada.receberTexto('Digite o número do documento para buscar OU Digite 0 para cancelar a busca:');

        if (numeroDocumento === '0') {
            this.execucao = false;
            return null;
        }

        let cliente = armazem.Clientes.find(c => c.Documentos.some(d => d.Numero === numeroDocumento));

        if (cliente == null) {
            console.log('Cliente não encontrado :(');
            this.processar();   
        } else {
            if(this.imprimir == true){
                console.log(new ImpressaorCliente(cliente).imprimir());
            }
            return cliente;
        }

        return null;
    }
}