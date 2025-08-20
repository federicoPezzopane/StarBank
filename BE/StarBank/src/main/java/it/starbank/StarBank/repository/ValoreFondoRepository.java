package it.starbank.StarBank.repository;


import it.starbank.StarBank.entity.Fondo;
import it.starbank.StarBank.entity.ValoreFondo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ValoreFondoRepository extends JpaRepository<ValoreFondo, Integer> {

    List<ValoreFondo> findByFondoIdFondoOrderByDataValoreAsc(int idFondo);

    Optional<ValoreFondo> findTopByFondoOrderByDataValoreDesc(Fondo fondo);
}
