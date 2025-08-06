package it.starbank.StarBank.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UtenteDTO {
    private int userId;
    private String nome;
    private String cognome;
    private int eta;
    private String codiceFiscale;
    private String indirizzoResidenza;
    private int comuneResidenza;
}
