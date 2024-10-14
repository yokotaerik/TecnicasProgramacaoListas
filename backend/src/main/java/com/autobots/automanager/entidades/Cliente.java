package com.autobots.automanager.entidades;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.hateoas.RepresentationModel;
import lombok.Data;

@Data
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Cliente extends RepresentationModel<Cliente>{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	private String nome;

	@Column
	private String nomeSocial;

	@Column
	private LocalDateTime dataNascimento;

	@Column
	private LocalDateTime dataCadastro;

	@OneToMany(orphanRemoval = true, cascade = CascadeType.ALL)
	private List<Documento> documentos = new ArrayList<>();

	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	private Endereco endereco;

	@ManyToMany
	@JoinTable(
			name = "cliente_telefone",
			joinColumns = @JoinColumn(name = "cliente_id"),
			inverseJoinColumns = @JoinColumn(name = "telefone_id")
	)
	private List<Telefone> telefones = new ArrayList<>();

	@JsonIgnore
	@OneToMany(orphanRemoval = true, cascade = CascadeType.ALL)
	private List<Cliente> dependentes = new ArrayList<>();

	@OneToOne
	private Cliente titular = null;

	@ManyToMany(mappedBy = "hospedes")
	private List<Hospedagem> hospedagens = new ArrayList<>();

	public Cliente(String nome, String nomeSocial, LocalDateTime dataNascimento){
		this.nome = nome;
		this.nomeSocial = nomeSocial;
		this.dataNascimento = dataNascimento;
		this.dataCadastro = LocalDateTime.now();
	}


	public Cliente(){
	}

}