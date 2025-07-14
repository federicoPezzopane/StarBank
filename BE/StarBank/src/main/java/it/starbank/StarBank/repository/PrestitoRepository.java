package it.starbank.StarBank.repository;

import it.starbank.StarBank.entity.Prestito;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrestitoRepository  extends JpaRepository<Prestito,Integer> {
}
