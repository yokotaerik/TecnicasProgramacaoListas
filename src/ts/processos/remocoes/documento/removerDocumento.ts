import Processo from "../../../abstracoes/processo";
import ImpressorDocumento from "../../../impressores/impressorDocumento";
import Cliente from "../../../modelos/cliente";

export default class RemoverDocumento extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        if(this.cliente.Documentos.length === 1){
            console.log('O cliente só possui um documento, não é possível deletá-lo.');
            return;
        }

        this.cliente.Documentos.forEach((documento, index) => {
            console.log(`Documento ${index + 1}: \n ${new ImpressorDocumento(documento).imprimir()}`);
        });

        let opcao = this.entrada.receberNumero('Qual documento deseja deletar? Digite 0 para sair.');
        if (opcao === 0) {
            console.log('Saindo da edição de documentos...');
            this.execucao = false;
            return;
        }

        let documento = this.cliente.Documentos[opcao - 1];

        this.cliente.Documentos.splice(this.cliente.Documentos.indexOf(documento), 1);

        this.cliente.Dependentes.forEach(dependente => {
            dependente.Documentos.splice(dependente.Documentos.indexOf(documento), 1);
        });

        console.log('Documento removido com sucesso!');
    }
}