package com.example.microservice.Dao;

import com.example.microservice.Entity.Book;

import java.util.List;

public interface BookDao {
    List<Book> findAuthor(String bookName);
}
