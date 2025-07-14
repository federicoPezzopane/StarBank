package it.starbank.StarBank.dto;

import it.starbank.StarBank.entity.Utente;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {

    private String nome;
    private String cognome;
    private String token;
    private Utente utente;
}
