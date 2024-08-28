import Impressor from "../interfaces/impressor";
import Endereco from "../modelos/endereco";

export default class ImpressorEndereco implements Impressor {
    private endereco: Endereco
    constructor(endereco: Endereco) {
        this.endereco = endereco
    }
    imprimir(): string {
        let impressao = `| Endereco:\n`;
        impressao += `| rua: ${this.endereco.Rua}\n`;
        impressao += `| bairro: ${this.endereco.Bairro}\n`;
        impressao += `| cidade: ${this.endereco.Cidade}\n`;
        impressao += `| estado: ${this.endereco.Estado}\n`;
        impressao += `| país: ${this.endereco.Pais}\n`;
        impressao += `| código postal: ${this.endereco.CodigoPostal}`;
        return impressao
    }
}