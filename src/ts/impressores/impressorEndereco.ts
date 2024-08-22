import Impressor from "../interfaces/impressor";
import Endereco from "../modelos/endereco";

export default class ImpressorEndereco implements Impressor {
    private endereco: Endereco
    constructor(endereco: Endereco) {
        this.endereco = endereco
    }
    imprimir(): string {
        let impressao = `| Endereco:\n` 
            "1" + `| rua: ${this.endereco.Rua}\n`
            "2" + `| bairro: ${this.endereco.Bairro}\n`
            "3" + `| cidade: ${this.endereco.Cidade}\n`
            "4" + `| estado: ${this.endereco.Estado}\n`
            "5" + `| país: ${this.endereco.Pais}\n`
            "6 "+ `| código postal: ${this.endereco.Pais}`
        return impressao
    }
}