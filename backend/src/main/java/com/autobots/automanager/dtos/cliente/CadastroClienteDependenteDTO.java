package com.autobots.automanager.dtos.cliente;

import lombok.Data;
import org.hibernate.id.GUIDGenerator;

import java.time.LocalDateTime;

@Data
public class CadastroClienteDependenteDTO
{
    private String nome;
    private String nomeSocial;
    private LocalDateTime dataNascimento;
    private String titularDocumento;
}
