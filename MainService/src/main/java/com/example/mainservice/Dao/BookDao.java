package com.example.mainservice.Dao;



import com.example.mainservice.entity.Book;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface BookDao {
    String changeToBase64(String image);


    void addBook(Book book);

    void delBook(Long bookId);

    List<Book> findAll();

    Book findBookById(Long bookId) throws JsonProcessingException;

    void setQuantity(Long bookId,Long quantity);

    void updateBook(Long bookId, Book book) throws JsonProcessingException;

    List<Book> findBooksByTagRelation(String tagName) throws JsonProcessingException;

    Book findBookByName(String name);
}
