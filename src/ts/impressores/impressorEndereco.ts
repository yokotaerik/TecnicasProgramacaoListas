import Impressor from "../interfaces/impressor";
import Endereco from "../modelos/endereco";

export default class ImpressorEndereco implements Impressor {
    private endereco: Endereco
    constructor(endereco: Endereco) {
        this.endereco = endereco
    }
    imprimir(): string {
        let impressao = `| Endereco:\n`;
        impressao += `1 | rua: ${this.endereco.Rua}\n`;
        impressao += `2 | bairro: ${this.endereco.Bairro}\n`;
        impressao += `3 | cidade: ${this.endereco.Cidade}\n`;
        impressao += `4 | estado: ${this.endereco.Estado}\n`;
        impressao += `5 | país: ${this.endereco.Pais}\n`;
        impressao += `6 | código postal: ${this.endereco.CodigoPostal}`;
        return impressao
    }
}