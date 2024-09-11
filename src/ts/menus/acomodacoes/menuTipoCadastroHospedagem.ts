import Menu from "../../interfaces/menu";

export default class MenuTipoCadastroHospedagem implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Qual tipo de hospedagem o cliente deseja? `)
        console.log(`----------------------`)
        console.log(`| 1 - Acomodação simples para solteiro(a)`)
        console.log(`| 2 - Acomodação com garagem para solteiro(a)`)
        console.log(`| 3 - Acomodação simples para casal`)
        console.log(`| 4 - Acomodação para família com até duas crianças`)
        console.log(`| 5 - Acomodação para família com até cinco crianças`)
        console.log(`| 6 - Acomodação para até duas familias, casal e três crianças cada`)
        console.log(`----------------------`)
    }
}