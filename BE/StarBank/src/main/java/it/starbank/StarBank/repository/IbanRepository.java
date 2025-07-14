package it.starbank.StarBank.repository;

import it.starbank.StarBank.entity.Iban;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IbanRepository  extends JpaRepository<Iban,Integer> {
}
