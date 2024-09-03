package com.example.RATSBookService.repository;

import com.example.RATSBookService.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JPABookRepo extends JpaRepository<Book, Long> {

    @Query(value = "SELECT * FROM book b WHERE b.id = id", nativeQuery = true)
    List<Book> findbyId(String id);

}
