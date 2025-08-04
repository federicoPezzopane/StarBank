package it.starbank.StarBank.controller;

import it.starbank.StarBank.entity.Regione;
import it.starbank.StarBank.repository.RegioneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/regione")
public class RegioneController {

    @Autowired
    private RegioneRepository regioneRepository;

    @GetMapping(value = "findAll")
    public ResponseEntity<List<Regione>> findAll(){
        return  ResponseEntity.ok(this.regioneRepository.findAll());

    }
}
