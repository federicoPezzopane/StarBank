package it.starbank.StarBank.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity(name = "investimento")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Investimento {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_investimento")
    private int idInvestimento;

    @Column(name = "quantita")
    private int quantita;

    @Column(name = "prezzo_acquisto")
    private Float prezzoAcquisto;

    @Column(name = "valore_attuale")
    private Float valoreAttuale;

    @ManyToOne
    @JoinColumn(name = "iban_id", referencedColumnName = "iban_id")
    private Iban iban;

    @Column(name = "data_investimento")
    private Date dataInvestimento;

    @ManyToOne
    @JoinColumn(name = "id_fondo", referencedColumnName = "id_fondo")
    private Fondo fondo;
}
