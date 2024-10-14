package com.autobots.automanager.entidades;

import com.autobots.automanager.enums.TipoAcomodacao;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
public class Acomodacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private TipoAcomodacao tipoAcomodacao;

    private int quantidade;

    public Acomodacao(TipoAcomodacao tipo, int quantidade) {
        this.tipoAcomodacao = tipo;
        this.quantidade = quantidade;
    }
}
