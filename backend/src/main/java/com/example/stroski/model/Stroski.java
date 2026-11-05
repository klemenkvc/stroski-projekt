package com.example.stroski.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "stroski")
public class Stroski{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ime;
    private Double znesek;
    private String kategorija;
    private LocalDate datum;

    public Stroski() {}

    public Stroski(String ime, Double znesek, String kategorija, LocalDate datum) {
        this.ime = ime;
        this.znesek = znesek;
        this.kategorija = kategorija;
        this.datum = datum;
    }

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getIme() {return ime;}
    public void setIme(String ime) {this.ime = ime;}

    public Double getZnesek() {return znesek;}
    public void setZnesek(Double znesek) {this.znesek = znesek;}

    public String getKategorija() {return kategorija;}
    public void setKategorija(String kategorija) {this.kategorija = kategorija;}

    public LocalDate getDatum() {return datum;}
    public void setDatum(LocalDate datum) {this.datum = datum;}
}