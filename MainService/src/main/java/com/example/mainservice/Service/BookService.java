package com.example.mainservice.Service;



import com.example.mainservice.entity.Book;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;
import java.util.Map;

public interface BookService {
    String changeToBase64(String image);

    void addBook(Book book);
    List<Book> findAll();
    void delBook(Long bookId);
    Book findBookById(Long bookId) throws JsonProcessingException;

    void setQuantity(Long bookId,Long quantity);

    void updateBook(Long bookId, Book book) throws JsonProcessingException;

    List<Book> findBooksByTagRelation(String tagName) throws JsonProcessingException;

    Book findBookByName(String name);

    Map<String, Integer> getBookWordCount();

    Map<String, Integer> getBookWordCountHadoop() throws Exception;
}
