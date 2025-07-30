package it.starbank.StarBank.service;

import it.starbank.StarBank.entity.Iban;
import it.starbank.StarBank.repository.IbanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.Optional;
import java.util.Random;

@Service
public class IbanService {

    private  final String COUNTRY_CODE = "IT";
    @Autowired
    private IbanRepository ibanRepository;

    public Iban findIbanById(int id){
        Optional<Iban> response = this.ibanRepository.findById(id);
        return response.orElse(null);

    }



    public Iban saveIban(Iban iban){
        return this.ibanRepository.save(iban);
    }


    public  String generaIbanRandom() {
        String cin = randomCin(); // lettera da A a Z
        String abi = "03002"; // codice banca
        String cab = String.format("%05d", new Random().nextInt(100000));
        String conto = String.format("%010d", Math.abs(new Random().nextLong()) % 1_000_000_0000L);

        // BBAN completo
        String bban = cin + abi + cab + conto;

        // Stringa per il calcolo: BBAN + COUNTRY_CODE (convertito) + "00"
        String checkString = convertLettersToNumbers(bban + COUNTRY_CODE + "00");

        BigInteger ibanInt = new BigInteger(checkString);
        int checkDigits = 98 - ibanInt.mod(BigInteger.valueOf(97)).intValue();

        return COUNTRY_CODE + String.format("%02d", checkDigits) + bban;
    }

    private static String randomCin() {
        return String.valueOf((char) ('A' + new Random().nextInt(26)));
    }

    // Converte lettere in numeri secondo regola IBAN: A=10 ... Z=35
    private static String convertLettersToNumbers(String input) {
        StringBuilder result = new StringBuilder();
        for (char ch : input.toCharArray()) {
            if (Character.isLetter(ch)) {
                result.append((ch - 'A') + 10);
            } else {
                result.append(ch);
            }
        }
        return result.toString();
    }
}
