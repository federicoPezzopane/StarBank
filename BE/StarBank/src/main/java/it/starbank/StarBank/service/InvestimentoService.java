package it.starbank.StarBank.service;

import it.starbank.StarBank.dto.InvestimentoDTO;
import it.starbank.StarBank.entity.Fondo;
import it.starbank.StarBank.entity.Iban;
import it.starbank.StarBank.entity.Investimento;
import it.starbank.StarBank.entity.ValoreFondo;
import it.starbank.StarBank.repository.FondoRepository;
import it.starbank.StarBank.repository.IbanRepository;
import it.starbank.StarBank.repository.InvestimentoRepository;
import it.starbank.StarBank.repository.ValoreFondoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;

@Service
public class InvestimentoService {

    @Autowired
    private InvestimentoRepository investimentoRepository;

    @Autowired
    private FondoRepository fondoRepository;

    @Autowired
    private ValoreFondoRepository valoreFondoRepository;

    @Autowired
    private IbanRepository ibanRepository;

    public Investimento addInvestimento(InvestimentoDTO investimentoDTO){

        Fondo fondo = fondoRepository.findById(investimentoDTO.getIdFondo())
                .orElseThrow(() -> new RuntimeException("Fondo non trovato"));
        ValoreFondo ultimoValore = valoreFondoRepository
                .findTopByFondoOrderByDataValoreDesc(fondo)
                .orElseThrow(() -> new RuntimeException("Nessun valore disponibile per questo fondo"));
        Iban iban = ibanRepository.findById(investimentoDTO.getIbanId())
                .orElseThrow(() -> new RuntimeException("IBAN non trovato"));

        Investimento investimento = new Investimento();
        investimento.setFondo(fondo);
        investimento.setIban(iban);
        investimento.setQuantita(investimentoDTO.getQuantita());
        investimento.setPrezzoAcquisto(ultimoValore.getValore());
        investimento.setValoreAttuale(ultimoValore.getValore());
        investimento.setDataInvestimento(new Date(System.currentTimeMillis()));

        return investimentoRepository.save(investimento);
    }
}
