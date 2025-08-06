package it.starbank.StarBank.service;

import it.starbank.StarBank.dto.LoginRequestDTO;
import it.starbank.StarBank.dto.LoginResponseDTO;
import it.starbank.StarBank.dto.RegisterDTO;
import it.starbank.StarBank.dto.UtenteDTO;
import it.starbank.StarBank.entity.Iban;
import it.starbank.StarBank.entity.Utente;
import it.starbank.StarBank.repository.ComuneRepository;
import it.starbank.StarBank.repository.UtenteRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class UtenteService implements UserDetailsService {

    @Autowired
    private UtenteRepository utenteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ComuneRepository comuneRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private IbanService ibanService;



    public Utente register(RegisterDTO registerDTO)  {
        Utente user = new Utente();
        user.setNome(registerDTO.getNome());
        user.setCognome(registerDTO.getCognome());
        user.setEta(registerDTO.getEta());
        user.setCodiceFiscale(registerDTO.getCodiceFiscale());
        user.setComuneResidenza(comuneRepository.findById(registerDTO.getIdComune()).get());
        user.setBlocked(false);
        user.setUsername(registerDTO.getUsername());
        user.setPassword(encoder.encode(registerDTO.getPassword()));
        user.setFailedLogins(0);
        user.setRoles("ROLE_USER");
        user.setIndirizzoResidenza(registerDTO.getIndirizzoResidenza());


        //Imposto iban
        Iban iban = new Iban();
        iban.setUtente(user);
        iban.setIban(this.ibanService.generaIbanRandom());
        iban.setSaldoContabile(0f);
        iban.setSaldoDisponibile(0f);
        iban.setUtente(user);
        user.setIban(iban);
        return utenteRepository.save(user);
    }



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Utente u = utenteRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utente non trovato: " + username));
        return u;
    }

    public UserDetails findByUsername(String username) {
        return this.utenteRepository.findByUsername(username).orElse(null);
    }

    public Utente findById(int id) throws UserPrincipalNotFoundException {
        return this.utenteRepository.findById(id).orElseThrow(() -> new UserPrincipalNotFoundException("Utente con id "+ id + "non trovato"));
    }

    public List<Utente> findAll(){
        return this.utenteRepository.findAll().stream().toList();
    }

    public Utente aggiornaUtente(UtenteDTO utenteModificato) {
        Utente utente = this.utenteRepository.findById(utenteModificato.getUserId()).orElseThrow(() ->new UsernameNotFoundException("Utente con id "+ utenteModificato.getUserId() + " non trovato"));
        utente.setNome(utenteModificato.getNome());
        utente.setCognome(utenteModificato.getCognome());
        utente.setEta(utenteModificato.getEta());
        utente.setCodiceFiscale(utenteModificato.getCodiceFiscale());
        utente.setIndirizzoResidenza(utenteModificato.getIndirizzoResidenza());
        utente.setComuneResidenza(comuneRepository.findById(utenteModificato.getComuneResidenza()).orElse(null));
        System.out.println("Comune RESIDENZA"+utenteModificato.getComuneResidenza());
        System.out.println();
        this.utenteRepository.save(utente);
        return utente;

    }
}