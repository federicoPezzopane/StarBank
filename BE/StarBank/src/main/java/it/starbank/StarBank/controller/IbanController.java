package it.starbank.StarBank.controller;

import it.starbank.StarBank.entity.Iban;
import it.starbank.StarBank.repository.IbanRepository;
import it.starbank.StarBank.service.IbanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/iban")
public class IbanController {

    @Autowired
    private IbanService ibanService;

    @GetMapping(value = "/findById/{id}")
    public ResponseEntity<Iban> findById(@PathVariable int id){
        return new ResponseEntity<>(ibanService.findIbanById(id), HttpStatus.OK);
    }
}
