import Processo from "../../abstracoes/processo";
import { NomeAcomadacao } from "../../enumeracoes/NomeAcomadacao";
import MenuTipoCadastroHospedagem from "../../menus/acomodacoes/menuTipoCadastroHospedagem";
import Hospedagem from "../../modelos/hospedagem";

export default class TipoSelecaoHospedagem extends Processo {
    constructor(){
        super()
        this.menu = new MenuTipoCadastroHospedagem()
    }
    
    obterNomeAcomadacao(): NomeAcomadacao | undefined {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?')
        switch (this.opcao) {
            case 1:
                return NomeAcomadacao.SolteiroSimples
            case 2:
                return NomeAcomadacao.SolteiroMais
            case 3:
                return NomeAcomadacao.CasalSimples
            case 4:
                return NomeAcomadacao.FamiliaSimples
            case 5:
                return NomeAcomadacao.FamiliaMais
            case 6:
                return NomeAcomadacao.FamiliaSuper
            default:
                this.obterNomeAcomadacao()
        }
    }

    processar(): void {
 
    }
}