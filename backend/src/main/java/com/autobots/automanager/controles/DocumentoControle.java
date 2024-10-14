package com.autobots.automanager.controles;

import com.autobots.automanager.dtos.documento.CadastroDocumentoDTO;
import com.autobots.automanager.entidades.Cliente;
import com.autobots.automanager.entidades.Documento;
import com.autobots.automanager.modelos.AdicionadorLinkDocumento;
import com.autobots.automanager.modelos.DocumentoAtualizador;
import com.autobots.automanager.repositorios.ClienteRepositorio;
import com.autobots.automanager.repositorios.DocumentoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/documento")
public class DocumentoControle {

	@Autowired
	private ClienteRepositorio clienteRepositorio;
	@Autowired
	private DocumentoRepositorio documentoRepositorio;
	@Autowired
	private AdicionadorLinkDocumento adicionadorLinkDocumento;
	@Autowired
	private DocumentoAtualizador atualizarDocumento;

	@GetMapping("get/unique/{id}")
	public ResponseEntity<?> obterDocumento(@PathVariable long id)
	{
		var documento = documentoRepositorio.getById(id);
		if(documento == null){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Documento não encontrado");
		} else {
			adicionadorLinkDocumento.adicionarLink(documento);
			return ResponseEntity.status(HttpStatus.OK).body(documento);
		}
	}

	@GetMapping("get/all")
	public ResponseEntity<List<Documento>> obterDocumentos() {
		List<Documento> documentos = documentoRepositorio.findAll();
		if(documentos.isEmpty()){
			return ResponseEntity.notFound().build();
		} else {
			adicionadorLinkDocumento.adicionarLink(documentos);
			return ResponseEntity.ok(documentos);
		}
	}

	@PostMapping("/cadastro")
	public ResponseEntity<?> cadastrarDocumento(@RequestBody CadastroDocumentoDTO data) {
		Cliente cliente = clienteRepositorio.getById(data.getClienteId());
		if(cliente == null){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado");
		} else {
			Documento documento = new Documento();
			documento.setTipo(data.getTipo());
			documento.setNumero(data.getNumero());
			documento.setDataExpedicao(data.getDataExpedicao());

			cliente.getDocumentos().add(documento);
			documentoRepositorio.save(documento);
			clienteRepositorio.save(cliente);
			adicionadorLinkDocumento.adicionarLink(documento);
			return ResponseEntity.status(HttpStatus.CREATED).body(documento);
		}
	}

	@PutMapping("/atualizar")
	public ResponseEntity<?> atualizarDocumento(@RequestBody Documento documento) {
		Optional<Documento> docOp = documentoRepositorio.findById(documento.getId());
		if(docOp.isEmpty()){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Documento não encontrado");
		}
		var documentoDb = docOp.get();
		atualizarDocumento.atualizar(documentoDb, documento);
		documentoRepositorio.save(documentoDb);
		adicionadorLinkDocumento.adicionarLink(documentoDb);
		return ResponseEntity.status(HttpStatus.OK).body(documentoDb);
	}

	@DeleteMapping("/excluir/{id}")
	public ResponseEntity<?> excluirDocumento(@PathVariable Long id) {
		try {
			documentoRepositorio.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).body("Documento excluído com sucesso");
		} catch(Exception ex) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao excluir documento");
		}
	}
}
