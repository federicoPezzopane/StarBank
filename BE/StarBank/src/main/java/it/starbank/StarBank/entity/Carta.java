package it.starbank.StarBank.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import java.sql.Date;
import java.util.List;

@Entity(name="carta")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Carta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_carta")
    private int idCarta;

    @Column(name = "tipo_carta")
    private String tipoCarta;


    @Column(name = "numero_carta")
    private long numeroCarta;

    @Column(name = "cvv")
    private int cvv;

    @Column(name = "circuito")
    private String circuito;

    @Column(name = "data_scadenza")
    private Date dataScadenza;

    @Column(name = "limite_spesa")
    private double limiteSpesa;

    @Column(name = "attiva")
    private boolean attiva;

    @ManyToOne
    @JoinColumn(name = "iban_id", referencedColumnName = "iban_id")
    @JsonBackReference
    private Iban iban;
}