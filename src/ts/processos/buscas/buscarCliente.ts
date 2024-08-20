import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";

export default class BuscarCliente extends Processo {

    constructor() {
        super();
        this.execucao = true;
    }

    processar(): Cliente | null {
        let armazem = Armazem.InstanciaUnica;

        while (this.execucao) {
            let numeroDocumento = this.entrada.receberTexto('Digite o número do documento para buscar OU Digite 0 para cancelar a busca \n');

            if (numeroDocumento === '0') {
                this.execucao = false;
            }

            let cliente = armazem.Clientes.find(c => c.Documentos.some(d => d.Numero === numeroDocumento));

            if (cliente == null) {
                console.log('Cliente não encontrado :(');
            } else {
                return cliente;
            }
        }

        return null;
    }
}