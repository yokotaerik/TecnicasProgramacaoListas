package com.autobots.automanager.entidades;

import com.autobots.automanager.enums.TipoAcomodacao;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(of = "id", callSuper = false)
@Data
@Entity
@NoArgsConstructor
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

    public Hospedagem(TipoAcomodacao tipoAcomodacao, LocalDateTime dataEntrada, LocalDateTime dataSaida) {
        this.tipoAcomodacao = tipoAcomodacao;
        this.dataEntrada = dataEntrada;
        this.dataSaida = dataSaida;
        this.hospedes = new ArrayList<>();
    }

    public boolean isOcupada() {
        LocalDateTime now = LocalDateTime.now();
        return (now.isAfter(dataEntrada) || now.isEqual(dataEntrada)) && now.isBefore(dataSaida);
    }
}
