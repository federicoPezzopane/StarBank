package it.starbank.StarBank.service;

import it.starbank.StarBank.dto.LoginRequestDTO;
import it.starbank.StarBank.dto.LoginResponseDTO;
import it.starbank.StarBank.entity.Utente;
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




    public Utente register(Utente utente)  {
        return utenteRepository.save(utente);
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
}