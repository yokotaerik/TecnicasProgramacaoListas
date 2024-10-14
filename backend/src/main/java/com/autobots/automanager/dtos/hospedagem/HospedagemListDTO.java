package com.autobots.automanager.dtos.hospedagem;

import com.autobots.automanager.dtos.cliente.ClienteListDTO;
import com.autobots.automanager.entidades.Cliente;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HospedagemListDTO {

    public LocalDateTime dataEntrada;
    public LocalDateTime dataSaida;
    public String tipoAcomodacao;
    public List<ClienteListDTO> hospedes;
}
