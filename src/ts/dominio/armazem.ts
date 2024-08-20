// armazem.ts
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
import Telefone from "../modelos/telefone";
import Endereco from "../modelos/endereco";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";

export default class Armazem {
    private static instanciaUnica: Armazem = new Armazem();
    private clientes: Cliente[] = [];

    private constructor() {
        this.inicializarClientes();
    }

    public static get InstanciaUnica() {
        return this.instanciaUnica;
    }

    public get Clientes() {
        return this.clientes;
    }

    private inicializarClientes() {
        const documento1 = new Documento("123.456.789-00", TipoDocumento.CPF, new Date("2010-01-01"));
        const telefone1 = new Telefone("11", "98765-4321");
        const endereco1 = new Endereco("Rua A", "Bairro A", "Cidade A", "Estado A", "Brasil", "12345-678");

        const cliente1 = new Cliente("Nome1", "NomeSocial1", new Date("1990-01-01"));
        cliente1.Documentos.push(documento1);
        cliente1.Telefones.push(telefone1);
        cliente1.Endereco = endereco1;

        const documento2 = new Documento("987.654.321-00", TipoDocumento.CPF, new Date("2012-02-02"));
        const telefone2 = new Telefone("21", "87654-3210");

        const cliente2 = new Cliente("Nome2", "NomeSocial2", new Date("1992-02-02"));
        cliente2.Documentos.push(documento2);
        cliente2.Telefones.push(telefone2);
        cliente2.Endereco = endereco1;
        cliente2.Titular = cliente1;  
        
        cliente1.Dependentes.push(cliente2);

        // const documento3 = new Documento("456.789.123-00", TipoDocumento.CPF, new Date("2014-03-03"));
        // const telefone3 = new Telefone("31", "76543-2109");
        // const endereco3 = new Endereco("Rua C", "Bairro C", "Cidade C", "Estado C", "Brasil", "54321-098");

        // const cliente3 = new Cliente("Nome3", "NomeSocial3", new Date("1994-03-03"));

        this.clientes.push(cliente1, cliente2);
    }
}