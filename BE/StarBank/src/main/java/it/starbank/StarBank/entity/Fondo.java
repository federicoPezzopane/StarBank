package it.starbank.StarBank.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.util.List;

@Entity(name="fondo")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Fondo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_fondo")
    private int idFondo;

    @Column(name = "isin")
    private String isin;

    @Column(name = "nome")
    private String nome;

    @Column(name = "categoria")
    private String categoria;

    @Column(name = "valuta")
    private String valuta;

    @Column(name = "data_lancio")
    private Date dataLancio;

    @Column(name = "rischio")
    private int rischio;

    @Column(name = "patrimonio")
    private Float patrimonio;

    @Column(name = "societa_gestione")
    private String societaGestione;

    @OneToMany(mappedBy = "fondo", cascade = CascadeType.ALL)
    private List<Investimento> fondoInvestimenti;
}
