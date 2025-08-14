package it.starbank.StarBank.controller;

import it.starbank.StarBank.dto.MovimentoRequestDTO;
import it.starbank.StarBank.entity.Movimento;
import it.starbank.StarBank.service.MovimentoService;

import it.starbank.StarBank.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value =  "/api/v1/movimento")
public class MovimentoController {

	@Autowired
    private MovimentoService movimentoService;

    @Autowired
    private PdfService pdfService;

    @PostMapping(value = "/addMovimento")
    public ResponseEntity<Movimento> addMovimento(@RequestBody MovimentoRequestDTO movimentodto){
        return ResponseEntity.ok(movimentoService.addMovimento(movimentodto));
    }
    @GetMapping("/estratto-conto/{ibanId}")
    public ResponseEntity<byte[]> getEstrattoContoMeseCorrente(@PathVariable int ibanId) {
        List<Movimento> movimenti = movimentoService.getEstrattoContoMeseCorrente(ibanId);
        byte[] pdf = pdfService.creaEstrattoConto(movimenti);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=estratto_conto.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }


}
