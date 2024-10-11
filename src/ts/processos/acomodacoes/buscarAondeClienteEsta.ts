import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Acomodacao from "../../modelos/acomodacao";
import BuscarCliente from "../buscas/buscarCliente";

export default class BuscarAondeClienteEsta extends Processo {
  private acomodacoes: Acomodacao[];

  constructor() {
    super();
    this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes;
  }

  processar(): void {
    let cliente = new BuscarCliente().processar();

    this.acomodacoes.forEach((acomodacao) => {
      acomodacao.Hospedagem.forEach((hospedagem) => {
        let hoje = new Date();
        if (hospedagem.DataEntrada <= hoje && hospedagem.DataSaida >= hoje) {
          if (hospedagem.Hospedes.some((c) => c === cliente)) {
            console.log("Hospede está no quarto:");
            console.log(acomodacao.NomeAcomadacao.toString());
          }
        }
      });
    });
  }
}
