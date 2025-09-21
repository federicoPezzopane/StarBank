package it.starbank.StarBank.service;

import it.starbank.StarBank.dto.MovimentoRequestDTO;
import it.starbank.StarBank.entity.Iban;
import it.starbank.StarBank.entity.Movimento;
import it.starbank.StarBank.repository.IbanRepository;
import it.starbank.StarBank.repository.MovimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MovimentoService {
    @Autowired
    private MovimentoRepository movimentoRepository;

    @Autowired
    private IbanRepository ibanRepository;

    public Movimento addMovimento(MovimentoRequestDTO movimentoDto){
        Movimento movimentoUscente = new Movimento();
        Movimento movimentoEntrante = new Movimento();

        movimentoUscente.setContabilizzato(false);
        movimentoEntrante.setContabilizzato(false);

        movimentoUscente.setImporto(-movimentoDto.getImporto());
        movimentoEntrante.setImporto(movimentoDto.getImporto());

        movimentoUscente.setDescrizione(movimentoDto.getDescrizione());
        movimentoEntrante.setDescrizione(movimentoDto.getDescrizione());

        movimentoUscente.setTipoMovimento(movimentoDto.getTipoMovimento());
        movimentoEntrante.setTipoMovimento("bonifico");

        Iban destinatario = ibanRepository.findByIban(movimentoDto.getDestinatarioIban())
                .orElseThrow(() -> new RuntimeException("IBAN destinatario non trovato"));

        movimentoUscente.setIbanDestinazione(destinatario);


        Iban mittente = ibanRepository.findByIban(movimentoDto.getIbanMittente())
                .orElseThrow(() -> new RuntimeException("IBAN mittente non trovato"));
        movimentoUscente.setSaldoPreMovimento(mittente.getSaldoDisponibile());
        movimentoUscente.setSaldoPostMovimento(mittente.getSaldoDisponibile()-movimentoDto.getImporto());
        mittente.setSaldoDisponibile(mittente.getSaldoDisponibile() - movimentoDto.getImporto());

        movimentoEntrante.setSaldoPreMovimento(destinatario.getSaldoDisponibile());
        movimentoEntrante.setSaldoPostMovimento(destinatario.getSaldoDisponibile()+movimentoDto.getImporto());

        destinatario.setSaldoDisponibile(movimentoEntrante.getSaldoPostMovimento());

        movimentoUscente.setIban(mittente);
        movimentoEntrante.setIbanDestinazione(destinatario);
        movimentoEntrante.setIban(destinatario);

        movimentoUscente.setDataMovimento(new java.sql.Date(System.currentTimeMillis()));
        movimentoEntrante.setDataMovimento(new java.sql.Date(System.currentTimeMillis()));
        this.movimentoRepository.save(movimentoUscente);
        this.movimentoRepository.save(movimentoEntrante);
        return movimentoUscente;
    }

    public List<Movimento> getEstrattoContoMeseCorrente(int ibanId){
        LocalDate now = LocalDate.now();
        LocalDate inizioMese = now.withDayOfMonth(1);
        LocalDate fineMese = now.withDayOfMonth(now.lengthOfMonth());

        List<Movimento> movimenti = movimentoRepository.findByIbanIbanIdAndDataMovimentoBetween (
                ibanId,
                inizioMese,
                fineMese
        );

        return movimenti;
    }
}
