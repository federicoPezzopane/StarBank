package it.starbank.StarBank.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity(name = "valore_fondo")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ValoreFondo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_valore")
    private int idValore;

    @ManyToOne
    @JoinColumn(name = "id_fondo", referencedColumnName = "id_fondo")
    @JsonBackReference
    private Fondo fondo;

    @Column(name = "data_valore")
    private Date dataValore;

    @Column(name = "valore")
    private Float valore;
}
