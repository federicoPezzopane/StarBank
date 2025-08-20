package it.starbank.StarBank.repository;

import it.starbank.StarBank.entity.Fondo;
import it.starbank.StarBank.entity.Investimento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvestimentoRepository  extends JpaRepository<Investimento,Integer> {
    List<Investimento> findByFondo(Fondo fondo);
}
