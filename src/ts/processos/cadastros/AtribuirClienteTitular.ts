import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import MenuTipoDocumento from "../../menus/menuTipoDocumento";
import Cliente from "../../modelos/cliente";

export default class AtribuirClienteTitular extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.execucao = true
    }

    processar(): void {
        let armazem = Armazem.InstanciaUnica
        console.log('Inciando a busca pelo titular...')
        let docPai = this.entrada.receberTexto('Qual número do documento do cliente titular?')
        //Obtem o cliente pelo número do documento forneceido
        let clientePai = armazem.Clientes.find(c => c.Documentos.some(d => d.Numero === docPai));
        if(clientePai === undefined){ console.log('Cliente titular não encontrado'); return; }

        this.cliente.Titular = clientePai

        this.cliente.Endereco = clientePai.Endereco
        this.cliente.Telefones.push(... clientePai.Telefones)

        console.log("Cadastrado como dependente do cliente: " + clientePai.Nome)
    }
}