package it.starbank.StarBank.service;

import it.starbank.StarBank.dto.MovimentoRequestDTO;
import it.starbank.StarBank.entity.Iban;
import it.starbank.StarBank.entity.Movimento;
import it.starbank.StarBank.repository.IbanRepository;
import it.starbank.StarBank.repository.MovimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovimentoService {
    @Autowired
    private MovimentoRepository movimentoRepository;

    @Autowired
    private IbanRepository ibanRepository;

    public Movimento addMovimento(MovimentoRequestDTO movimentoDto){
        Movimento movimento = new Movimento();
        movimento.setImporto(movimentoDto.getImporto());
        movimento.setDescrizione(movimentoDto.getDescrizione());
        movimento.setTipoMovimento(movimentoDto.getTipoMovimento());

        Iban destinatario = ibanRepository.findByIban(movimentoDto.getDestinatarioIban())
                .orElseThrow(() -> new RuntimeException("IBAN destinatario non trovato"));
        destinatario.setSaldoDisponibile(destinatario.getSaldoDisponibile()+movimentoDto.getImporto());
        movimento.setIbanDestinazione(destinatario);
        Iban mittente = ibanRepository.findByIban(movimentoDto.getIbanMittente())
                .orElseThrow(() -> new RuntimeException("IBAN mittente non trovato"));
        mittente.setSaldoDisponibile(mittente.getSaldoDisponibile() - movimentoDto.getImporto());

        movimento.setIban(mittente);
        movimento.setDataMovimento(new java.sql.Date(System.currentTimeMillis()));
        this.movimentoRepository.save(movimento);
        return movimento;
    }
}
