package com.example.microservice.Service;


import com.example.microservice.Model.Message;

public interface BookService {
    Message findAuthor(String bookName);
}
