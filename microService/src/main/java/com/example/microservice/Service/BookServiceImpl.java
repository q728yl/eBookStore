package com.example.microservice.Service;

import com.example.microservice.Dao.BookDao;
import com.example.microservice.Entity.Book;

import com.example.microservice.Model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements  BookService {
    @Autowired
    private BookDao bookDao;

    @Override
    public Message findAuthor(String bookName) {
        List<Book> bookList = bookDao.findAuthor(bookName);
        if(bookList.size()==0){
            return new Message("获取作者成功", true, null);
        }
        return new Message("获取作者信息成功", true, bookList.get(0).getAuthor());
    }
}
