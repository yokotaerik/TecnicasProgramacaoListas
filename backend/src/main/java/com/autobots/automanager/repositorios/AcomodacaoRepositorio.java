package com.autobots.automanager.repositorios;

import com.autobots.automanager.entidades.Acomodacao;
import com.autobots.automanager.enums.TipoAcomodacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AcomodacaoRepositorio extends JpaRepository<Acomodacao, Long> {
    Acomodacao findByTipoAcomodacao(TipoAcomodacao tipoAcomodacao);
}
