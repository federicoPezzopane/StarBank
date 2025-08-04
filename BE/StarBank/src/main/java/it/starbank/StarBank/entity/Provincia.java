package it.starbank.StarBank.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity(name = "provincia")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Provincia {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_provincia")
    private int idProvincia;

    @Column(name = "nome_provincia")
    private String nomeProvincia;

    @Column(name = "sigla_provincia")
    private String siglaProvincia;

    @ManyToOne
    @JoinColumn(name = "id_regione", referencedColumnName = "id_regione")
    @JsonBackReference
    private Regione regione;

    @OneToMany(mappedBy = "provincia", cascade = CascadeType.ALL)

    private List<Comune> comuni;
}
