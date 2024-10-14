package com.autobots.automanager.dtos.cliente;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CadastroClienteTitularDTO
{
    private String nome;
    private String nomeSocial;
    private LocalDateTime dataNascimento;

    private String estado;
    private String cidade;
    private String bairro;
    private String rua;
    private String pais;
    private String codigoPostal;
}
