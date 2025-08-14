package it.starbank.StarBank.service;

import it.starbank.StarBank.entity.Movimento;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;


@Service
public class PdfService {

    public byte[] creaEstrattoConto(List<Movimento> movimenti) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdfDoc = new PdfDocument(writer);
            Document document = new Document(pdfDoc);

            document.add(new Paragraph("Estratto Conto").setFontSize(18));
            document.add(new Paragraph("Data generazione: " + LocalDate.now()));

            if (movimenti == null || movimenti.isEmpty()) {
                document.add(new Paragraph("Non ci sono movimenti per il mese corrente"));
            } else {
                Table table = new Table(4);
                table.addHeaderCell("Data");
                table.addHeaderCell("Descrizione");
                table.addHeaderCell("Importo");
                table.addHeaderCell("Saldo Post Movimento");

                for (Movimento m : movimenti) {
                    table.addCell(m.getDataMovimento().toString());
                    table.addCell(m.getDescrizione());
                    table.addCell(String.valueOf(m.getImporto()));
                    table.addCell(String.valueOf(m.getSaldoPostMovimento()));
                }

                document.add(table);
            }

            document.close();
            return baos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Errore nella creazione del PDF", e);
        }
    }
}
