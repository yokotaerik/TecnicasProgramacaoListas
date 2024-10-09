import Menu from "../interfaces/menu";

export default class MenuTipoOpcoesDocumento implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| O que deseja fazer? `)
        console.log(`----------------------`)
        console.log(`| 1 - Adicionar um documento`)
        console.log(`| 2 - Remover um documento`)
        console.log(`| 0 - Voltar`)
        console.log(`----------------------`)
        console.log("Lembre-se: é necessário ter ao menos um documento para o cliente. Caso tente excluir o único documento, a operação será cancelada.")
    }
}