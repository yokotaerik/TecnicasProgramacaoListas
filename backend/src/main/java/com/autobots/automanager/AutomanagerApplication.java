package com.autobots.automanager;

import com.autobots.automanager.entidades.*;
import com.autobots.automanager.enums.TipoAcomodacao;
import com.autobots.automanager.repositorios.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@SpringBootApplication
public class AutomanagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(AutomanagerApplication.class, args);
	}

	@Component
	public static class Runner implements ApplicationRunner {

		@Autowired
		private AcomodacaoRepositorio acomodacaoRepositorio;

		@Autowired
		private HospedagemRepositorio hospedagemRepositorio;

		@Autowired
		private ClienteRepositorio clienteRepositorio;

		@Override
		public void run(ApplicationArguments args) throws Exception {


			Acomodacao solteiroSimples = new Acomodacao(TipoAcomodacao.SolteiroSimples, 1	);
			Acomodacao solteiroMais = new Acomodacao(TipoAcomodacao.SolteiroMais, 5);
			Acomodacao casalSimples = new Acomodacao(TipoAcomodacao.CasalSimples, 5);
			Acomodacao familiaSimples = new Acomodacao(TipoAcomodacao.FamiliaSimples, 5);
			Acomodacao familiaMais = new Acomodacao(TipoAcomodacao.FamiliaMais, 5);
			Acomodacao familiaSuper = new Acomodacao(TipoAcomodacao.FamiliaSuper, 5);

			acomodacaoRepositorio.save(solteiroSimples);
			acomodacaoRepositorio.save(solteiroMais);
			acomodacaoRepositorio.save(casalSimples);
			acomodacaoRepositorio.save(familiaSimples);
			acomodacaoRepositorio.save(familiaMais);
			acomodacaoRepositorio.save(familiaSuper);

			Cliente erik = new Cliente("Erik Camara Yokota", "Yokota", LocalDateTime.now());
			Endereco enderecoErik = new Endereco("SP", "SJC", "Jd.Satelite", "Marica", "BR", "12230100", "nenhuma");
			erik.setEndereco(enderecoErik);
			clienteRepositorio.save(erik);

			Hospedagem hospedagemErik = new Hospedagem(TipoAcomodacao.SolteiroSimples, LocalDateTime.now().minusDays(2), LocalDateTime.now().plusDays(1));
			hospedagemErik.getHospedes().add(erik);

			hospedagemRepositorio.save(hospedagemErik);

		}
	}
}
