import Menu from "../../interfaces/menu";

export default class MenuTipoEditarCliente implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Qual informação deseja editar? Lembre-se dependentes não pode editar endereços e telefones `)
        console.log(`----------------------`)
        console.log(`| 1 - Nome`)
        console.log(`| 2 - Nome Social`)
        console.log(`| 3 - Data de Nascimento`)
        console.log(`| 4 - Telefones`)
        console.log(`| 5 - Endereço`)
        console.log(`| 6 - Documentos`)
        console.log(`| 7 - Tiular`)
        console.log(`----------------------`)
    }
}