package it.starbank.StarBank.repository;

import it.starbank.StarBank.entity.Movimento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovimentoRepository  extends JpaRepository<Movimento,Integer> {
}
