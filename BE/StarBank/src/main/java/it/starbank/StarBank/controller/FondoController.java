package it.starbank.StarBank.controller;

import it.starbank.StarBank.entity.Fondo;
import it.starbank.StarBank.service.FondoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/fondo")
public class FondoController {

    @Autowired
    private FondoService fondoService;

    @GetMapping("/getFondi")
    public ResponseEntity<List<Fondo>> getFondi(){
        return ResponseEntity.ok(this.fondoService.getFondi());
    }

}
