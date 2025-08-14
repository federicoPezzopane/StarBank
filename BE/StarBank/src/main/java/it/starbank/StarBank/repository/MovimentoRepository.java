package it.starbank.StarBank.repository;

import it.starbank.StarBank.entity.Movimento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MovimentoRepository  extends JpaRepository<Movimento,Integer> {
    List<Movimento> findByIbanIbanIdAndDataMovimentoBetween(int ibanId, LocalDate inizioMese, LocalDate fineMese);
}
