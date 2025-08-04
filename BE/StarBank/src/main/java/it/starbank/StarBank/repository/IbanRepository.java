package it.starbank.StarBank.repository;

import it.starbank.StarBank.entity.Iban;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IbanRepository  extends JpaRepository<Iban,Integer> {

    public Optional<Iban> findByIban(String iban);
}
