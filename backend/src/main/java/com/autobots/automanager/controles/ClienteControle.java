package com.autobots.automanager.controles;

import java.util.List;

import com.autobots.automanager.dtos.cliente.CadastroClienteDependenteDTO;
import com.autobots.automanager.dtos.cliente.CadastroClienteTitularDTO;
import com.autobots.automanager.entidades.Endereco;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.autobots.automanager.entidades.Cliente;
import com.autobots.automanager.modelos.AdicionadorLinkCliente;
import com.autobots.automanager.modelos.ClienteAtualizador;
import com.autobots.automanager.modelos.ClienteSelecionador;
import com.autobots.automanager.repositorios.ClienteRepositorio;

@RestController
public class ClienteControle {
	@Autowired
	private ClienteRepositorio repositorio;
	@Autowired
	private ClienteSelecionador selecionador;
	@Autowired
	private AdicionadorLinkCliente adicionadorLink;

	@GetMapping("/cliente/{id}")
		public ResponseEntity<Cliente> obterCliente(@PathVariable long id) {
		List<Cliente> clientes = repositorio.findAll();
		Cliente cliente = selecionador.selecionar(clientes, id);
		if (cliente == null) {
			ResponseEntity<Cliente> resposta = new ResponseEntity<>(HttpStatus.NOT_FOUND);
			return resposta;
		} else {
			adicionadorLink.adicionarLink(cliente);
			ResponseEntity<Cliente> resposta = new ResponseEntity<Cliente>(cliente, HttpStatus.OK);
			return resposta;
		}
	}

	@GetMapping("get/cliente/doc/{numDoc}")
	public ResponseEntity<Cliente> obterClientePeloDoc(@PathVariable String numDoc) {
		var cliente = repositorio.buscarClienteNumeroDoc(numDoc);
		if (cliente.isEmpty()) {
			ResponseEntity<Cliente> resposta = new ResponseEntity<>(HttpStatus.NOT_FOUND);
			return resposta;
		} else {
			var achou = cliente.get();
			adicionadorLink.adicionarLink(achou);
			ResponseEntity<Cliente> resposta = new ResponseEntity<Cliente>(achou, HttpStatus.OK);
			return resposta;
		}
	}

	@GetMapping("/clientes")
	public ResponseEntity<List<Cliente>> obterClientes() {
		List<Cliente> clientes = repositorio.findAll();

		adicionadorLink.adicionarLink(clientes);
		ResponseEntity<List<Cliente>> resposta = new ResponseEntity<>(clientes, HttpStatus.OK);
		return resposta;
	}

	@PostMapping("/cliente/cadastro/titular")
	public ResponseEntity<?> cadastrarCliente(@RequestBody CadastroClienteTitularDTO data) {
		var cliente = new Cliente(data.getNome(), data.getNomeSocial(), data.getDataNascimento());

		Endereco endereco = new Endereco();
		endereco.setEstado(data.getEstado());
		endereco.setCidade(data.getCidade());
		endereco.setBairro(data.getBairro());
		endereco.setRua(data.getRua());
		endereco.setPais(data.getPais());
		endereco.setCodigoPostal(data.getCodigoPostal());

		cliente.setEndereco((endereco));

		repositorio.save(cliente);

		return ResponseEntity.status(201).body(cliente);
	}

	@PostMapping("/cliente/cadastro/dependente")
	public ResponseEntity<?> cadastrarClienteDependente(@RequestBody CadastroClienteDependenteDTO data) {
		var cliente = new Cliente(data.getNome(), data.getNomeSocial(), data.getDataNascimento());

		var titular = repositorio.buscarClienteNumeroDoc(data.getTitularDocumento());

		if (titular.isEmpty()) {
			return ResponseEntity.badRequest().body("Titular não encontrado");
		} else {
			var titularGet = titular.get();

			cliente.setTitular(titularGet);
			cliente.setEndereco(titularGet.getEndereco().clonar());

			titularGet.getTelefones().forEach(telefone -> cliente.getTelefones().add(telefone));

			repositorio.save(cliente);

			return ResponseEntity.status(201).body(cliente);
		}
	}

	@PutMapping("/cliente/atualizar")
	public ResponseEntity<?> atualizarCliente(@RequestBody Cliente atualizacao) {
		HttpStatus status = HttpStatus.CONFLICT;
		Cliente cliente = repositorio.getById(atualizacao.getId());
		if (cliente != null) {
			ClienteAtualizador atualizador = new ClienteAtualizador();
			atualizador.atualizar(cliente, atualizacao);
			repositorio.save(cliente);
			cliente.getDependentes().forEach(dependente -> {
				dependente.setEndereco(cliente.getEndereco().clonar());
				repositorio.save(dependente);
			});
			status = HttpStatus.OK;
		} else {
			status = HttpStatus.BAD_REQUEST;
		}

		return new ResponseEntity<>(status);
	}

	@DeleteMapping("/cliente/excluir/{id}")
	public ResponseEntity<?> excluirCliente(@PathVariable Long id) {
		HttpStatus status = HttpStatus.BAD_REQUEST;
		Cliente cliente = repositorio.getById(id);
		if (cliente != null) {
			repositorio.delete(cliente);
			status = HttpStatus.OK;
		}
		return new ResponseEntity<>(status);
	}
}
