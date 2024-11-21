package com.autobots.automanager.controles;

import com.autobots.automanager.dtos.cliente.ClienteListDTO;
import com.autobots.automanager.dtos.hospedagem.CadastroHospedagemDTO;
import com.autobots.automanager.dtos.hospedagem.HospedagemListDTO;
import com.autobots.automanager.entidades.Acomodacao;
import com.autobots.automanager.entidades.Cliente;
import com.autobots.automanager.entidades.Hospedagem;
import com.autobots.automanager.enums.TipoAcomodacao;
import com.autobots.automanager.repositorios.AcomodacaoRepositorio;
import com.autobots.automanager.repositorios.ClienteRepositorio;
import com.autobots.automanager.repositorios.HospedagemRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/hospedagem")
public class HospedagemController {

    @Autowired
    private ClienteRepositorio clienteRepositorio;

    @Autowired
    private HospedagemRepositorio hospedagemRepositorio;

    @Autowired
    private AcomodacaoRepositorio acomodacaoRepositorio;

    @GetMapping("get/unique/{id}")
    public ResponseEntity<?> obterHospedagem(@PathVariable long id) {
        var hospedagem = hospedagemRepositorio.getById(id);
        if (hospedagem.getId() == id) {
            return ResponseEntity.status(HttpStatus.OK).body(hospedagem);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hospedagem não encontrada");
        }
    }

    @GetMapping("get/list")
    public ResponseEntity<?> obterHospedagens() {
        var hospedagens = hospedagemRepositorio.findAll();

        List<HospedagemListDTO> response = new ArrayList<>();

        hospedagens.forEach(hospedagem -> {
            response.add(mapToHospedagemDTO(hospedagem));
        });

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("get/ocupadas")
    public ResponseEntity<?> obterHospedagensOcupadas() {
        var hospedagens = hospedagemRepositorio.findAll();

        List<Hospedagem> hospedagensOcupadas = hospedagens.stream()
                .filter(Hospedagem::isOcupada)
                .toList();

        List<HospedagemListDTO> response = new ArrayList<>();

        hospedagensOcupadas.forEach(hospedagem -> {
            response.add(mapToHospedagemDTO(hospedagem));
        });

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrarHospedagem(@RequestBody CadastroHospedagemDTO data) {
        var hospedes = new ArrayList<Cliente>();

        if(data.getDataEntrada() == null || data.getDataSaida() == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Data de entrada ou saída não informada");
        }

        for (String doc : data.getDocumentosHospedes()) {
            if(doc.isEmpty()){
                continue;
            }
            Optional<Cliente> cliente = clienteRepositorio.buscarClienteNumeroDoc(doc);
            if (cliente.isPresent()) {

                for (Hospedagem hospedagem : cliente.get().getHospedagens()) {
                    if (hospedagem.isOcupada()) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cliente " + cliente.get().getNome() + " já está hospedado");
                    }
                }
                hospedes.add(cliente.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado");
            }
        }

        if(hospedes.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nenhum hóspede encontrado");
        }

        var pode = VerificarSePode(data.getTipoAcomodacao());

        if(!pode){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Não há acomodações disponíveis");
        }

        Hospedagem hospedagem = new Hospedagem();
        hospedagem.setHospedes(hospedes);
        hospedagem.setTipoAcomodacao(data.getTipoAcomodacao());
        hospedagem.setDataEntrada(data.getDataEntrada());
        hospedagem.setDataSaida(data.getDataSaida());

        hospedagemRepositorio.save(hospedagem);
        return ResponseEntity.status(HttpStatus.CREATED).body("Hospedagem cadastrada com sucesso");
    }

    @PutMapping("/atualizar")
    public ResponseEntity<?> atualizarHospedagem(@RequestBody Hospedagem hospedagem) {
        var hospedagemDb = hospedagemRepositorio.getById(hospedagem.getId());
        if (hospedagemDb.getId() == hospedagem.getId()) {
            hospedagemRepositorio.save(hospedagem);
            return ResponseEntity.status(HttpStatus.OK).body("Hospedagem atualizada com sucesso");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hospedagem não encontrada");
        }
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<?> excluirHospedagem(@PathVariable Long id) {
        hospedagemRepositorio.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Hospedagem excluída com sucesso");
    }


    private HospedagemListDTO mapToHospedagemDTO(Hospedagem hospedagem){
        var hospedagemDTO = new HospedagemListDTO();
        hospedagemDTO.setDataEntrada(hospedagem.getDataEntrada());
        hospedagemDTO.setDataSaida(hospedagem.getDataSaida());
        hospedagemDTO.setTipoAcomodacao(hospedagem.getTipoAcomodacao().toString());
        hospedagemDTO.setHospedes(hospedagem.getHospedes().stream().map(cliente -> {
            var clienteDTO = new ClienteListDTO();
            clienteDTO.setNome(cliente.getNome());
            return clienteDTO;
        }).collect(Collectors.toList()));
        return hospedagemDTO;
    }


    private boolean VerificarSePode(TipoAcomodacao tipoAcomodacao) {
        var hospedagems = hospedagemRepositorio.findAll();

        long ocupadasCount = hospedagems.stream()
                .filter(Hospedagem::isOcupada)
                .count();

        var acomodacao = acomodacaoRepositorio.findByTipoAcomodacao(tipoAcomodacao);

        if (acomodacao != null) {
            return acomodacao.getQuantidade() > ocupadasCount;
        } else {
            return false;
        }
    }
}
