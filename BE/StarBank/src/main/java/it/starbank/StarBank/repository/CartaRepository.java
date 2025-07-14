package it.starbank.StarBank.repository;

import it.starbank.StarBank.entity.Carta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartaRepository  extends JpaRepository<Carta,Integer> {
}
