package it.starbank.StarBank.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;

import java.util.List;

@Entity(name = "iban")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Iban {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "iban_id")
    private int ibanId;

    @Column(name = "iban")
    private String iban;

    @Column(name = "saldo_disponibile")
    private Float saldoDisponibile;

    @Column(name = "saldo_contabile")
    private Float saldoContabile;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    @JsonBackReference
    private Utente utente;

    @OneToMany(mappedBy = "iban", cascade = CascadeType.ALL)
    private List<Investimento> investimenti;

    @OneToMany(mappedBy = "iban", cascade = CascadeType.ALL)
    private List<Prestito> prestiti;

    @OneToMany(mappedBy = "iban", cascade = CascadeType.ALL)
    private List<Carta> carte;

    @OneToMany(mappedBy = "iban", cascade = CascadeType.ALL)
    private List<Movimento> movimenti;

}
