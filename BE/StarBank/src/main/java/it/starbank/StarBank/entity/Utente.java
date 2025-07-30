package it.starbank.StarBank.entity;

import it.starbank.StarBank.repository.UtenteRepository;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Entity(name = "utente")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Utente implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @Column(name = "nome")
    private String nome;

    @Column(name = "cognome")
    private String cognome;

    @Column(name = "eta")
    private int eta;

    @Column(name = "codice_fiscale")
    private String codiceFiscale;

    @Column(name = "indirizzo_residenza")
    private String indirizzoResidenza;

    @ManyToOne
    @JoinColumn(name = "id_comune", referencedColumnName = "id_comune")
    private Comune comuneResidenza;

    @Column(name = "is_blocked")
    private boolean isBlocked;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "failed_logins")
    private int failedLogins;

    @Column(name = "roles")
    private String roles;

    @OneToOne(mappedBy = "utente", fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private Iban iban;



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.stream(roles.split(","))
                .map(SimpleGrantedAuthority::new)
                .toList();
    }


    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.failedLogins < 10;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Boolean isLoginCorrect(String password, PasswordEncoder passwordEncoder) {
        return passwordEncoder.matches(password, this.password);
    }

}
