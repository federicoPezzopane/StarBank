package it.starbank.StarBank.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="comune")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comune {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_comune")
    private int idComune;

    @Column(name = "nome_comune")
    private String nomeComune;

    @ManyToOne
    @JoinColumn(name = "id_provincia", referencedColumnName = "id_provincia")
    @JsonBackReference
    private Provincia provincia;
}
