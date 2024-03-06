package com.example.mainservice.Dao;

import com.example.mainservice.Repository.BookImageRepository;
import com.example.mainservice.Repository.BookRepository;
import com.example.mainservice.Repository.BookTypeRepository;
import com.example.mainservice.entity.Book;
import com.example.mainservice.entity.BookImage;
import com.example.mainservice.entity.BookType;
import com.example.mainservice.model.RedisUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;
import org.hibernate.proxy.HibernateProxy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;

@Component
public class BookDaoImpl implements BookDao {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookImageRepository bookImageRepository;
    @Autowired
    private BookTypeRepository bookTypeRepository;
    @Autowired
    private RedisUtil redisUtil;
    private static final Logger logger = Logger.getLogger("BookDaoImpl");

    @Override
    public String changeToBase64(String image) {
        try {
            // 从图片 URL 中读取图片数据
            URL imageUrl = new URL(image);
            Path tempFile = Files.createTempFile("temp", ".jpg");

            try (InputStream in = imageUrl.openStream()) {
                Files.copy(in, tempFile, StandardCopyOption.REPLACE_EXISTING);
            }

            // 将图片数据转换为 base64 格式
            byte[] imageBytes = Files.readAllBytes(tempFile);
            return "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(imageBytes);
        } catch (IOException e) {
            e.printStackTrace();
            // Consider throwing an exception or returning an error message here
            return null;
        }
    }




    @Override
    @Transactional
    public void addBook(Book book) {
        bookRepository.save(book);
        BookImage bookImage = new BookImage();
        bookImage.setBookId(Math.toIntExact(book.getId()));
        bookImage.setImage(book.getImage());
        bookImageRepository.save(bookImage);
        logger.info("book" + book.getId() + " :Added to database");
    }

    @Override
    @Transactional
    public void delBook(Long bookId) {
        Object p = redisUtil.get("book" + bookId);
        if (p == null) {
            logger.info("book" + bookId + " :now not in Redis cache");
        } else {
            redisUtil.del("book" + bookId);
            logger.info("book" + bookId + " :Deleted from Redis cache");
        }
        Book book = bookRepository.getReferenceById(bookId);
        book.setIn_stock(false);
//        bookImageRepository.deleteByBookId(Math.toIntExact(bookId));
        bookRepository.save(book);
        logger.info("book" + bookId + " :Deleted from database");
    }

    @Override
    public List<Book> findAll() {
        List<Book> books = bookRepository.findAll();
        for (Book book:books){
            String bookImage = bookImageRepository.findByBookId(Math.toIntExact(book.getId())).getImage();
            book.setImage(bookImage);
        }
        return books;
    }


    @Override
    @Transactional
    public Book findBookById(Long bookId) throws JsonProcessingException {
        logger.info("start of find book function");
        Book book = null;
        Object p = redisUtil.get("book" + bookId);
        if (p == null) {
            book = bookRepository.getReferenceById(bookId);
            BookImage image = bookImageRepository.findByBookId(Math.toIntExact(bookId));
            if (image != null) {
                //System.out.println("image: " + image);
                book.setImage(image.getImage());

            }
          //  System.out.println("book: " + book);
            // Detach the entity from the Hibernate session
            if (book instanceof HibernateProxy) {
                book = (Book) ((HibernateProxy) book).getHibernateLazyInitializer().getImplementation();
            }
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(book);
            redisUtil.set("book" + bookId, json);

            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                logger.info("sleep interrupted");
            }
            logger.info("book" + bookId + " :Fetched from the database and cached in Redis");
        } else {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                book = objectMapper.readValue(p.toString(), Book.class);
                BookImage image = bookImageRepository.findByBookId(Math.toIntExact(bookId));
            //    System.out.println("image: " + image.getBookId()+image.getImage());
                book.setImage(image.getImage());


            } catch (JsonProcessingException e) {
                logger.info("Error deserializing Book from JSON");
            }
            logger.info("book" + bookId + " :Fetched from Redis cache");
        }
        return book;
    }

    @Override
    public void setQuantity(Long bookId, Long quantity) {
        bookRepository.setQuantity(bookId, quantity);
    }

    @Override
    @Transactional
    public void updateBook(Long bookId, Book book) throws JsonProcessingException {
        Object p = redisUtil.get("book" + bookId);
        if (book instanceof HibernateProxy) {
            book = (Book) ((HibernateProxy) book).getHibernateLazyInitializer().getImplementation();
        }
        if (p == null) {
            logger.info("book" + bookId + " :now not in Redis cache");
        }
        book.setId(bookId);
        if (p != null) {
            logger.info("book" + bookId + " :exists in Redis cache");
            ObjectMapper objectMapper = new ObjectMapper();

            String json = objectMapper.writeValueAsString(book);
            String image = book.getImage();
           // System.out.println("22222"+image);
            BookImage bookImage = bookImageRepository.findByBookId(Math.toIntExact(bookId));
            bookImage.setImage(image);

           // System.out.println("1111111"+bookImage.getImage());
            bookImageRepository.save(bookImage);
            redisUtil.set("book" + bookId, json);
            logger.info("book" + bookId + " :has been updated in Redis cache");
        } else {
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(book);
            BookImage bookImage = bookImageRepository.findByBookId(Math.toIntExact(bookId));
            String image = book.getImage();
            bookImage.setImage(image);
            bookImageRepository.save(bookImage);
            redisUtil.set("book" + bookId, json);

            logger.info("book" + bookId + " :has been written to Redis cache");
        }
        bookRepository.save(book);
        logger.info("book" + bookId + " :has been updated in database");

        //UPDATE BOOK IN REDIS


    }
    @Override
    public List<Book> findBooksByTagRelation(String tagName) throws JsonProcessingException {
        List<BookType> list0 = bookTypeRepository.findBookTypesByTypeNameLike(tagName);
        HashMap<Integer, Integer> result = new HashMap<>();
        List<Book> resultBook = new ArrayList<>();

        for (BookType bookType : list0) {
            List<Integer> bookIDs = bookType.getBookIDs();
            if (bookIDs != null) {
                for (int id : bookIDs) {
                    result.put(id, 1);
                }
            }
        }

        for (BookType type : list0) {
            String keyName = type.getTypeName();
            List<BookType> list1 = bookTypeRepository.findNodeRelatedBookTypesDistance1(keyName);
            List<BookType> list2 = bookTypeRepository.findNodeRelatedBookTypesDistance2(keyName);

            for (BookType bookType : list1) {
                List<Integer> bookIDs = bookType.getBookIDs();
                if (bookIDs != null) {
                    for (int id : bookIDs) {
                        result.put(id, 1);
                    }
                }
            }

            for (BookType bookType : list2) {
                List<Integer> bookIDs = bookType.getBookIDs();
                if (bookIDs != null) {
                    for (int id : bookIDs) {
                        result.put(id, 1);
                    }
                }
            }
        }

        for (int id : result.keySet()) {
            Book book = findBookById((long) id);
            if (book != null) {
                resultBook.add(book);
            }
        }

        return resultBook;
    }
    @Override
    public Book findBookByName(String name){
        Book book =  bookRepository.findByTitle(name);
        BookImage image = bookImageRepository.findByBookId(Math.toIntExact(book.getId()));
       // System.out.println("image: " + image.getBookId()+image.getImage());
        book.setImage(image.getImage());
        return book;
    }
}
