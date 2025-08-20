package it.starbank.StarBank.batch;
import it.starbank.StarBank.entity.Fondo;
import it.starbank.StarBank.entity.Investimento;
import it.starbank.StarBank.entity.ValoreFondo;
import it.starbank.StarBank.repository.FondoRepository;
import it.starbank.StarBank.repository.InvestimentoRepository;
import it.starbank.StarBank.repository.ValoreFondoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.sql.Date;
import java.util.List;
import java.util.Random;

@Component
public class ValoreFondoScheduler {

    @Autowired
    private FondoRepository fondoRepository;

    @Autowired
    private ValoreFondoRepository valoreFondoRepository;

    @Autowired
    private InvestimentoRepository investimentoRepository;

    private Random random = new Random();

    @Scheduled(cron = "0 0 0 1-31/2 * ?")
    public void generaValoriFondo() {
        List<Fondo> fondi = fondoRepository.findAll();

        for (Fondo fondo : fondi) {
            Float ultimoValore = getUltimoValoreFondo(fondo);
            float maxOscillazione = fondo.getRischio() * 0.005f;
            float variazione = (random.nextFloat() * 2 - 1) * maxOscillazione;
            Float nuovoValore = ultimoValore * (1 + variazione);

            ValoreFondo valoreFondo = new ValoreFondo();
            valoreFondo.setFondo(fondo);
            valoreFondo.setDataValore(new Date(System.currentTimeMillis()));
            valoreFondo.setValore(nuovoValore);
            valoreFondoRepository.save(valoreFondo);

            aggiornaInvestimenti(fondo, nuovoValore);
        }
    }

    private Float getUltimoValoreFondo(Fondo fondo) {
        ValoreFondo ultimo = valoreFondoRepository.findTopByFondoOrderByDataValoreDesc(fondo).get();
        return ultimo != null ? ultimo.getValore() : 100.0f;
    }

    private void aggiornaInvestimenti(Fondo fondo, Float nuovoValore) {
        List<Investimento> investimenti = investimentoRepository.findByFondo(fondo);
        for (Investimento inv : investimenti) {
            float nuovoValoreAttuale =  nuovoValore;
            inv.setValoreAttuale(nuovoValoreAttuale);
        }
        investimentoRepository.saveAll(investimenti);
    }
}
