package it.starbank.StarBank.controller;

import it.starbank.StarBank.dto.AddCartaDTO;
import it.starbank.StarBank.entity.Carta;
import it.starbank.StarBank.service.CartaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;

@RestController
@RequestMapping(value = "/api/v1/carta")
public class CartaController {

    @Autowired
    private CartaService cartaService;

    @PostMapping(value= "/addCarta")
    public ResponseEntity<Carta> addCarta(@RequestBody AddCartaDTO addCartaDTO) throws UserPrincipalNotFoundException {
        Carta carta = this.cartaService.addCarta(addCartaDTO.getUserId(),addCartaDTO.getTipoCarta());
        return ResponseEntity.ok(carta);

    }

    @DeleteMapping(value= "/removeCarta/{idCarta}")
    public ResponseEntity<Carta> deleteCarta(@PathVariable int idCarta) throws UserPrincipalNotFoundException {
        Carta carta = this.cartaService.deleteCarta(idCarta);
        return ResponseEntity.ok(carta);

    }
}
