package com.example.microservice.Dao;

import com.example.microservice.Entity.Book;
import com.example.microservice.Repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BookDaoImpl implements BookDao{
    @Autowired
    private BookRepository bookRepository;
    @Override
    public List<Book> findAuthor(String bookName){
        return bookRepository.findByTitle(bookName);
    }
}
