package com.autobots.automanager.entidades;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.hateoas.RepresentationModel;

@Data
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Endereco extends RepresentationModel<Endereco> {
	@Id()
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = true)
	private String estado;
	@Column(nullable = false)
	private String cidade;
	@Column(nullable = true)
	private String bairro;
	@Column(nullable = false)
	private String rua;
	@Column(nullable = true)
	private String pais;
	@Column(nullable = true)
	private String codigoPostal;
	@Column(unique = false, nullable = true)
	private String informacoesAdicionais;

	@OneToOne
	private Cliente cliente;


	public Endereco clonar() {
		Endereco novo = new Endereco();
		novo.setEstado(this.estado);
		novo.setCidade(this.cidade);
		novo.setBairro(this.bairro);
		novo.setRua(this.rua);
		novo.setPais(this.pais);
		novo.setCodigoPostal(this.codigoPostal);
		novo.setInformacoesAdicionais(this.informacoesAdicionais);
		return novo;
	}
}