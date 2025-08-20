package it.starbank.StarBank.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvestimentoDTO {
    private int idFondo;
    private int quantita;
    private int ibanId;
}
