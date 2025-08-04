package it.starbank.StarBank.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MovimentoRequestDTO {

    private float importo;
    private String descrizione;
    private String tipoMovimento;
    private String destinatarioIban;
    private String ibanMittente;
}
