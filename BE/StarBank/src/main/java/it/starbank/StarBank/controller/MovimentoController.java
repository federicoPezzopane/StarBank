package it.starbank.StarBank.controller;

import it.starbank.StarBank.dto.MovimentoRequestDTO;
import it.starbank.StarBank.entity.Movimento;
import it.starbank.StarBank.service.MovimentoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value =  "/api/v1/movimento")
public class MovimentoController {

	@Autowired
    private MovimentoService movimentoService;

    @PostMapping(value = "/addMovimento")
    public ResponseEntity<Movimento> addMovimento(@RequestBody MovimentoRequestDTO movimentodto){
        return ResponseEntity.ok(movimentoService.addMovimento(movimentodto));
    }
}
