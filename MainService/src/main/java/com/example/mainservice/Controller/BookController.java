package com.example.mainservice.Controller;


import com.example.mainservice.Repository.BookTypeRepository;
import com.example.mainservice.Service.BookService;
import com.example.mainservice.entity.Book;
import com.example.mainservice.entity.BookType;
import com.example.mainservice.model.Message;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.web.bind.annotation.*;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@CrossOrigin
@RestController
public class BookController {
    @Autowired
    private BookService bookService;
@Autowired
private BookTypeRepository bookTypeRepository;

    @GetMapping("/getList")
    public Map<String, Object> getList1(){
        List<Book> bookList = bookService.findAll();
        Map<String, Object> map = new HashMap<>();
        map.put("Books",bookList);
        return map;
    }
    @PostMapping("/findBookByName")
    public Map<String, Object> findBookByName(@RequestBody Map<String,Object> body){
        String title = (String) body.get("title");
        Book book = bookService.findBookByName(title);
        Map<String, Object> map = new HashMap<>();
        map.put("Books",book);
        return map;
    }
    @QueryMapping
    public Book bookByTitle(@Argument String title) {
        Book book = bookService.findBookByName(title);
        return book;
    }



    @GetMapping("/getBookById/{id}")
    public Map<String, Object> getListOne(@PathVariable("id") Long id) throws JsonProcessingException {
        Book book = bookService.findBookById(id);
        Map<String, Object> map = new HashMap<>();
        map.put("Book",book);
        return map;
    }




    @PostMapping("/addBook")
    public void addBook(@RequestBody Map<String,Object> body){
       // System.out.println(body);
        String title = (String) body.get("title");
        String IBSN = (String) body.get("IBSN");
        String author = (String) body.get("author");
        String image = (String) body.get("image");
        image = bookService.changeToBase64(image);
        String description = (String) body.get("description");
        BigDecimal price = new BigDecimal(body.get("price").toString());
        BigDecimal rating = new BigDecimal(body.get("rating").toString());
        Long quantity = Long.valueOf(body.get("quantity").toString());
        Boolean in_stock  = (Long.valueOf(body.get("in_stock").toString())) == 1;//(title,IBSN,author,image,description,price,rating,in_stock,quantity);
        Book book = new Book();
        book.setTitle(title);
        book.setIBSN(IBSN);
        book.setTag((String) body.get("tag"));
        book.setAuthor(author);
        book.setImage(image);
        book.setDescription(description);
        book.setPrice(price);
        book.setRating(rating);
        book.setQuantity(quantity);
        book.setIn_stock(in_stock);
        bookService.addBook(book);

    }
    @PostMapping("/delBook")
    public void delBook(@RequestBody Map<String,Object> body){
        Long bookId = Long.valueOf(body.get("bookId").toString());

        bookService.delBook(bookId);
    }
    @PostMapping("/updateBook")
    public void updateBook(@RequestBody Map<String,Object> body) throws JsonProcessingException {
       // System.out.println(body);
        Long bookId = Long.valueOf(body.get("bookId").toString());
        String title = (String) body.get("title");
        String IBSN = (String) body.get("IBSN");
        String author = (String) body.get("author");
        String image = (String) body.get("image");
        image = bookService.changeToBase64(image);
        String description = (String) body.get("description");
        BigDecimal price = new BigDecimal(body.get("price").toString());
        BigDecimal rating = new BigDecimal(body.get("rating").toString());
        Long quantity = Long.valueOf(body.get("quantity").toString());
        Boolean in_stock  = (Long.valueOf(body.get("in_stock").toString())) == 1||((body.get("in_stock").toString()))=="true";//(title,IBSN,author,image,description,price,rating,in_stock,quantity);
        Book book = new Book();
        book.setId(bookId);
        book.setTag((String) body.get("tag"));
        book.setTitle(title);
        book.setIBSN(IBSN);
        book.setAuthor(author);
        book.setImage(image);
        book.setDescription(description);
        book.setPrice(price);
        book.setRating(rating);
        book.setQuantity(quantity);
        book.setIn_stock(in_stock);
        bookService.updateBook(bookId,book);


    }
    @PostMapping("/getBookByType")
    public Map<String, Object> findBooksByTagRelation(@RequestBody Map<String,Object> body) throws JsonProcessingException {
        String tagName = (String) body.get("tagName");
      //  System.out.println("hhhhh"+tagName);
        List<Book> bookList = bookService.findBooksByTagRelation(tagName);
        Map<String, Object> map = new HashMap<>();
        map.put("Books",bookList);
        return map;
    }
    @RequestMapping("/neo4j")
    public List<Book> testNeo4j() throws JsonProcessingException {
        // 先删除所有的内容
        bookTypeRepository.deleteAll();
        // 添加书籍类型
        BookType bookType1 = new BookType("软件");
        BookType bookType2 = new BookType("英文");
        BookType bookType3 = new BookType("电路");
        BookType bookType4 = new BookType("编程");

        // 数据准备
        bookType1.addBookID(1);
        bookType2.addBookID(4);
        bookType3.addBookID(2);
        bookType4.addBookID(3);

        bookType1.addRelateBookType(bookType2);
        bookType2.addRelateBookType(bookType4);

        bookTypeRepository.save(bookType1);
        bookTypeRepository.save(bookType2);
        bookTypeRepository.save(bookType3);
        bookTypeRepository.save(bookType4);


        return bookService.findBooksByTagRelation("软件");
    }
    @GetMapping("/getBookWordCount")
    public  Message getBookWordCount() throws JsonProcessingException {
        Map<String, Integer> map = bookService.getBookWordCount();
        return new Message("getWordCount success",true,map);
    }
    @GetMapping("/getBookWordCountHadoop")
    public  Message getBookWordCountHadoop() throws Exception {
        Map<String, Integer> map = bookService.getBookWordCountHadoop();
        return new Message("getWordCount success",true,map);
    }

}
