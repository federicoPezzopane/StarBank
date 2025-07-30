package it.starbank.StarBank.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity(name = "regione")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Regione {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_regione")
    private int idRegione;
    @Column(name = "nome_regione")
    private String nomeRegione;
    @OneToMany(mappedBy = "regione", cascade = CascadeType.ALL)
    private List<Provincia> province;
}
