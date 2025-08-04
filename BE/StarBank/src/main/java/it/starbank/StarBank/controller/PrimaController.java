package it.starbank.StarBank.controller;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Component
public class PrimaController {

    @GetMapping("/hi")
    public String hi(){
        return "hi";
    }
}
