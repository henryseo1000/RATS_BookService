package com.example.RATSBookService.service;

import com.example.RATSBookService.entity.Book;
import com.example.RATSBookService.repository.JPABookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private JPABookRepo jpaBookRepo;

    public List<Book> findbyId(String id){ 
        return jpaBookRepo.findbyId(id); 
    }
}
