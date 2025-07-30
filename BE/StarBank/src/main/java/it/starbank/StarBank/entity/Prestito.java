package it.starbank.StarBank.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity(name = "prestito")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Prestito {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_prestito")
    private int idPrestito;

    @Column(name = "importo_totale")
    private Float importoTotale;

    @Column(name = "importo_rimanente")
    private Float importoRimanente;

    @Column(name = "tasso_interesse")
    private Float tassoInteresse;

    @Column(name = "durata_mesi")
    private int durataMesi;

    @Column(name = "data_erogazione")
    private Date dataErogazione;

    @Column(name = "data_scadenza")
    private Date dataScadenza;

    @Column(name = "rata_mensile")
    private Float rataMensile;

    @Column(name = "stato")
    private String stato;

    @OneToOne
    @JoinColumn(name = "iban_id", referencedColumnName = "iban_id")
    private Iban iban;

}
