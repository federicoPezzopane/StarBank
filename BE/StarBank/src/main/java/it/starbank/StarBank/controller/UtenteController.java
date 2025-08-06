package it.starbank.StarBank.controller;

import it.starbank.StarBank.dto.MessageResponseDTO;
import it.starbank.StarBank.dto.RegisterDTO;
import it.starbank.StarBank.dto.UtenteDTO;
import it.starbank.StarBank.entity.Iban;
import it.starbank.StarBank.entity.Utente;
import it.starbank.StarBank.repository.ComuneRepository;
import it.starbank.StarBank.service.IbanService;
import it.starbank.StarBank.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value =  "/api/v1/utente")
public class UtenteController {

    @Autowired
    private UtenteService utenteService;




    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterDTO registerDTO) {
        if (utenteService.findByUsername(registerDTO.getUsername())!=null) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponseDTO("Error: username is already taken!"));

        }
        utenteService.register(registerDTO);
        return new ResponseEntity(new MessageResponseDTO("User registered successfully!"), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Utente> aggiornaUtente(@RequestBody UtenteDTO utenteModificato) {
        Utente utente = utenteService.aggiornaUtente(utenteModificato);
        return ResponseEntity.ok(utente);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Utente> findById(@PathVariable int id) throws IOException {
        Utente utente = utenteService.findById(id);
        // Non torno la pswd al Fe per motivi di sicurezza
        utente.setPassword(null);
        return ResponseEntity.ok(utenteService.findById(id));
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<Utente>> findAll(){
        return ResponseEntity.ok(utenteService.findAll());
    }

}
