package com.autobots.automanager.repositorios;

import com.autobots.automanager.entidades.Hospedagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HospedagemRepositorio extends JpaRepository<Hospedagem, Long> {

}
