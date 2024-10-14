package com.autobots.automanager.entidades;

import com.autobots.automanager.enums.TipoAcomodacao;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Hospedagem extends RepresentationModel<Hospedagem> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToMany
    private List<Cliente> hospedes = new ArrayList<>();

    private TipoAcomodacao tipoAcomodacao;

    private LocalDateTime dataEntrada;

    private LocalDateTime dataSaida;

    public boolean isOcupada() {
        LocalDateTime now = LocalDateTime.now();
        return (now.isAfter(dataEntrada) || now.isEqual(dataEntrada)) && now.isBefore(dataSaida);
    }
}
