package com.autobots.automanager.dtos.documento;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class CadastroDocumentoDTO {

    private String tipo;
    private String numero;
    private LocalDateTime dataExpedicao;
    private Long clienteId;

}
