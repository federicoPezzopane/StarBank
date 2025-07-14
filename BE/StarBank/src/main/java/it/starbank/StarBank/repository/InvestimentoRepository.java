package it.starbank.StarBank.repository;

import it.starbank.StarBank.entity.Investimento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvestimentoRepository  extends JpaRepository<Investimento,Integer> {
}
