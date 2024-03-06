package com.example.microservice.Controller;

import com.example.microservice.Model.Message;
import com.example.microservice.Service.BookService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@Slf4j
@RestController
public class BookController {
    @Autowired
    private BookService bookService;
    @GetMapping("/findAuthorByBookName/{bookName}")
    public Message findAuthor(@PathVariable("bookName") String bookName){
        System.out.println(bookName);
        Message message = bookService.findAuthor(bookName);
        System.out.println(message);
        return message;
    }
}
