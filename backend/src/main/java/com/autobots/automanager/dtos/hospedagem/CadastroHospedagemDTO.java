package com.autobots.automanager.dtos.hospedagem;

import com.autobots.automanager.enums.TipoAcomodacao;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Collection;

@Data
public class CadastroHospedagemDTO {
    private Collection<String> documentosHospedes;
    private TipoAcomodacao tipoAcomodacao;
    private LocalDateTime dataEntrada;
    private LocalDateTime dataSaida;
}
