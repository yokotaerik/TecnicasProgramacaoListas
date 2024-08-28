import Menu from "../interfaces/menu";

export default class MenuTipoOpcoesTelefone implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| O que deseja fazer? `)
        console.log(`----------------------`)
        console.log(`| 1 - Adicionar um telefone`)
        console.log(`| 2 - Editar um telefone`)
        console.log(`| 3 - Remover um telefone`)
        console.log(`| 0 - Voltar`)
        console.log(`----------------------`)
    }
}