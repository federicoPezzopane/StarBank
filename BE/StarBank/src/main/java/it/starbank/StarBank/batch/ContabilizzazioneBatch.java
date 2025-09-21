package it.starbank.StarBank.batch;

import it.starbank.StarBank.service.ContabilizzazioneService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ContabilizzazioneBatch {

    @Autowired
    private final ContabilizzazioneService contabilizzazioneService;

    @Scheduled(cron = "0 0 0 * * *")
    public void runBatch() {
        contabilizzazioneService.contabilizzaMovimenti();
    }
}
