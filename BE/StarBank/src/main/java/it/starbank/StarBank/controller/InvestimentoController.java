package it.starbank.StarBank.controller;

import it.starbank.StarBank.dto.AddCartaDTO;
import it.starbank.StarBank.dto.InvestimentoDTO;
import it.starbank.StarBank.entity.Carta;
import it.starbank.StarBank.entity.Investimento;
import it.starbank.StarBank.service.InvestimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.attribute.UserPrincipalNotFoundException;

@RestController
@RequestMapping(value = "/api/v1/investimento")
public class InvestimentoController {

    @Autowired
    private InvestimentoService investimentoService;

    @PostMapping(value= "/addInvestimento")
    public ResponseEntity<Investimento> addCarta(@RequestBody InvestimentoDTO investimentoDTO) throws UserPrincipalNotFoundException {
        return ResponseEntity.ok(this.investimentoService.addInvestimento(investimentoDTO));

    }
}
