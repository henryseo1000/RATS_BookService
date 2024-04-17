package com.example.RATSBookService.controller;

import com.example.RATSBookService.DTO.BookDTO;

import com.example.RATSBookService.entity.Book;
import com.example.RATSBookService.repository.JPABookRepo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class BookController {

    @Autowired
    private JPABookRepo jpaBookRepo;

    @GetMapping("/test")
    @ResponseBody
    public String testHello() {
        return "<h1>book controller hello!</h1><p>안녕, 난 책 컨트롤러야</p>";
    }

    @PostMapping("/createBook")
    @ResponseBody
    public Book createBook(@RequestBody BookDTO book){

        Book newBook = new Book().builder()
                .title(book.getTitle())
                .author(book.getAuthor())
                .build();

        jpaBookRepo.save(newBook);

        return newBook;

    }

    @GetMapping("/isbn")
    @ResponseBody
    public String createBookByISBN(@RequestBody String isbn) {

        URI uri = UriComponentsBuilder
                .fromUriString("https://openapi.naver.com")
                .path("/v1/search/book_adv.json")
                .queryParam("d_isbn", isbn)
                .build()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();

        log.info("uri : {}", uri);

        // 헤더 추가 위해
        RequestEntity<Void> req = RequestEntity
                .get(uri)
                .header("X-Naver-Client-Id", "XDOK4UUn0cIX6h8tLPgv")
                .header("X-Naver-Client-Secret", "rlCW_mVWSk")
                .build();

        ResponseEntity<String> result = restTemplate.exchange(req, String.class);

        return result.getBody();
    }
}
