package it.starbank.StarBank.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDTO {
    private String nome;
    private String cognome;
    private String username;
    private String password;
    private int eta;
    private String codiceFiscale;
    private String indirizzoResidenza;
    private int idComune;
    private boolean isBlocked;
    private int failedLogins;
    private String roles;
}
