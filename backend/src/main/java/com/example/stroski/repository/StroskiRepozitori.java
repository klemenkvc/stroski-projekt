package com.example.stroski.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.stroski.model.Stroski;

@Repository 
public interface StroskiRepozitori extends JpaRepository<Stroski, Long> {
    List<Stroski> findByImeContainingIgnoreCase(String ime);
    List<Stroski> findByKategorijaIgnoreCase(String kategorija);
    List<Stroski> findByImeContainingIgnoreCaseAndKategorijaIgnoreCase(String ime, String kategorija);
}