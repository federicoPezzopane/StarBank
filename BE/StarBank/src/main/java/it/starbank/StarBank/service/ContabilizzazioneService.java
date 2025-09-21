package it.starbank.StarBank.service;

import it.starbank.StarBank.entity.Iban;
import it.starbank.StarBank.entity.Movimento;
import it.starbank.StarBank.repository.IbanRepository;
import it.starbank.StarBank.repository.MovimentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service

public class ContabilizzazioneService {

    @Autowired
    private MovimentoRepository movimentoRepository;
    @Autowired
    private IbanRepository ibanRepository;

    @Transactional
    public void contabilizzaMovimenti() {
        LocalDate ieri = LocalDate.now().minusDays(1);
        Date dataIeri = Date.valueOf(ieri);

        List<Movimento> movimenti = movimentoRepository.findByDataMovimentoAndContabilizzatoFalse(dataIeri);

        for (Movimento movimento : movimenti) {
            Iban iban = movimento.getIban();
            if (iban != null) {

                iban.setSaldoContabile(movimento.getSaldoPostMovimento());
                ibanRepository.save(iban);


                movimento.setContabilizzato(true);
                movimentoRepository.save(movimento);
            }
        }
    }
}
