package it.starbank.StarBank.service;


import it.starbank.StarBank.constants.CartaConstants;
import it.starbank.StarBank.entity.Carta;
import it.starbank.StarBank.entity.Utente;
import it.starbank.StarBank.repository.CartaRepository;
import it.starbank.StarBank.repository.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Random;

@Service
public class CartaService {
    @Autowired
    private CartaRepository cartaRepository;

    @Autowired
    private UtenteRepository utenteRepository;

    public Carta addCarta(int userId, String tipoCarta) throws UserPrincipalNotFoundException {
        Utente utente = this.utenteRepository.findById(userId).orElseThrow(()-> new UserPrincipalNotFoundException("Utente non trovato"));
        Carta carta = new Carta();
        carta.setIban(utente.getIban());
        carta.setTipoCarta(tipoCarta);
        carta.setNumeroCarta(Long.valueOf(generaNumeroCarta()));
        carta.setCvv(generaCVV());
        String circuito = "";
        double limiteSpesa = 0;
        switch (tipoCarta){
            case CartaConstants.cartaCredito :
                circuito = "MASTERCARD";
                limiteSpesa = 2000;
                break;
            case CartaConstants.cartaDebito:
                circuito = "MAESTRO";
                limiteSpesa = 3000;
                break;

        }
        carta.setCircuito(circuito);
        Date dataScadenza = Date.valueOf(LocalDate.now().plusYears(4));
        carta.setDataScadenza(dataScadenza);
        carta.setLimiteSpesa(limiteSpesa);
        carta.setAttiva(true);
        return this.cartaRepository.save(carta);

    }

    public Carta deleteCarta(int idCarta){
        Carta carta = this.cartaRepository.findById(idCarta).orElseThrow(() -> new RuntimeException("Carta not found"));
        this.cartaRepository.delete(carta);
        return carta;
    }

    public static int generaCVV() {
        Random random = new Random();
        int cvv = random.nextInt(900) + 100; // genera un numero tra 100 e 999
        return cvv;
    }

    public static String generaNumeroCarta() {
        Random rand = new Random();
        int[] cifre = new int[16];


        for (int i = 0; i < 15; i++) {
            cifre[i] = rand.nextInt(10);
        }

        cifre[15] = calcolaCifraDiControllo(cifre);

        StringBuilder sb = new StringBuilder();
        for (int cifra : cifre) {
            sb.append(cifra);
        }

        return sb.toString();
    }

    public static int calcolaCifraDiControllo(int[] cifre) {
        int somma = 0;
        for (int i = 0; i < 15; i++) {
            int valore = cifre[14 - i];
            if (i % 2 == 0) {
                valore *= 2;
                if (valore > 9) valore -= 9;
            }
            somma += valore;
        }
        return (10 - (somma % 10)) % 10;
    }
}
