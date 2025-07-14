package it.starbank.StarBank.service;

import it.starbank.StarBank.entity.Iban;
import it.starbank.StarBank.repository.IbanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class IbanService {

    @Autowired
    private IbanRepository ibanRepository;

    public Iban findIbanById(int id){
        Optional<Iban> response = this.ibanRepository.findById(id);
        return response.orElse(null);

    }
}
