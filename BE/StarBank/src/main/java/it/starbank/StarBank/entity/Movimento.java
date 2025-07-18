package it.starbank.StarBank.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity(name = "movimento")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Movimento {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_movimento")
    private int idMovimento;

    @Column(name = "importo")
    private Float importo;


    @ManyToOne
    @JoinColumn(name = "iban_destinazione_id", referencedColumnName = "iban_id")
    private Iban ibanDestinazione;

    @Column(name = "tipo_movimento")
    private String tipoMovimento; // usato per differenziare movimenti ca

    @ManyToOne
    @JoinColumn(name = "iban_id", referencedColumnName = "iban_id", nullable = true)
    @JsonBackReference
    private Iban iban;

    @Column(name = "data_movimento")
    private Date dataMovimento;

    @Column(name = "descrizione")
    private String descrizione;

    @Column(name = "saldo_pre_movimento")
    private float saldoPreMovimento;

    @Column(name = "saldo_post_movimento")
    private float saldoPostMovimento;


}