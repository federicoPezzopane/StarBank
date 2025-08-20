package it.starbank.StarBank.service;

import it.starbank.StarBank.entity.Fondo;
import it.starbank.StarBank.repository.FondoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FondoService {

    @Autowired
    private FondoRepository fondoRepository;

    public List<Fondo> getFondi(){
        return this.fondoRepository.findAll();

    }
}
