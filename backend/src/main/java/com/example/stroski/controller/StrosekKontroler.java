package com.example.stroski.controller;

import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.stroski.model.Stroski;
import com.example.stroski.repository.StroskiRepozitori;

@RestController
@RequestMapping("/api/stroski")
public class StrosekKontroler {

    @Autowired
    private StroskiRepozitori stroskiRepozitori;

    // CREATE strošek
    @PostMapping
    public Stroski createStroski(@RequestBody Stroski stroski) {
        return stroskiRepozitori.save(stroski);
    }

    // READ – z iskanjem, filtriranjem in razvrščanjem
    @GetMapping
    public List<Stroski> getAllStroski(
            @RequestParam(required = false) String ime,
            @RequestParam(required = false) String kategorija,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        List<Stroski> rezultat;

        boolean imaIme = ime != null && !ime.isBlank();
        boolean imaKat = kategorija != null && !kategorija.isBlank();

        if (imaIme && imaKat) {
            rezultat = stroskiRepozitori
                    .findByImeContainingIgnoreCaseAndKategorijaIgnoreCase(ime, kategorija);
        } else if (imaIme) {
            rezultat = stroskiRepozitori.findByImeContainingIgnoreCase(ime);
        } else if (imaKat) {
            rezultat = stroskiRepozitori.findByKategorijaIgnoreCase(kategorija);
        } else {
            rezultat = stroskiRepozitori.findAll();
        }

        Comparator<Stroski> comp;
        switch (sortBy) {
            case "ime":
                comp = Comparator.comparing(Stroski::getIme, String.CASE_INSENSITIVE_ORDER);
                break;
            case "znesek":
                comp = Comparator.comparing(Stroski::getZnesek);
                break;
            case "kategorija":
                comp = Comparator.comparing(Stroski::getKategorija, String.CASE_INSENSITIVE_ORDER);
                break;
            case "datum":
                comp = Comparator.comparing(Stroski::getDatum);
                break;
            default:
                comp = Comparator.comparing(Stroski::getId);
        }
        if ("desc".equalsIgnoreCase(sortDir)) {
            comp = comp.reversed();
        }
        rezultat.sort(comp);
        return rezultat;
    }

    // READ – en zapis
    @GetMapping("/{id:\\d+}")
    public ResponseEntity<Stroski> getStroskiById(@PathVariable Long id) {
        return stroskiRepozitori.findById(id)
                .map(stroski -> ResponseEntity.ok(stroski))
                .orElse(ResponseEntity.notFound().build());
    }

    // Seznam različnih kategorij (za dropdown)
    @GetMapping("/kategorije")
    public List<String> getKategorije() {
        return stroskiRepozitori.findAll().stream()
                .map(Stroski::getKategorija)
                .filter(k -> k != null && !k.isBlank())
                .distinct()
                .sorted(String.CASE_INSENSITIVE_ORDER)
                .toList();
    }

    // UPDATE stroška
    @PutMapping("/{id}")
    public ResponseEntity<Stroski> updateStroski(@PathVariable Long id, @RequestBody Stroski stroskiLastnosti) {
        return stroskiRepozitori.findById(id)
                .map(stroski -> {
                    stroski.setIme(stroskiLastnosti.getIme());
                    stroski.setZnesek(stroskiLastnosti.getZnesek());
                    stroski.setKategorija(stroskiLastnosti.getKategorija());
                    stroski.setDatum(stroskiLastnosti.getDatum());
                    return ResponseEntity.ok(stroskiRepozitori.save(stroski));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE stroška
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStroski(@PathVariable Long id) {
        return stroskiRepozitori.findById(id)
                .map(stroski -> {
                    stroskiRepozitori.delete(stroski);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}