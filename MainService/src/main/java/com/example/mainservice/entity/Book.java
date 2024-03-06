package com.example.mainservice.entity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


import java.math.BigDecimal;
@Entity
@Table(name ="book_details", schema = "bookstore")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String IBSN;
    private String author;
//    private String image;
    private String tag;
    private String description;
    private BigDecimal price;
    private BigDecimal rating;
    private Boolean in_stock;
    private Long quantity;
    @Transient
    private String image;
    public Book(Long id, String title, String IBSN, String author,String tag, String description, BigDecimal price, BigDecimal rating, Boolean in_stock, Long quantity,String image) {
        this.id = id;
        this.title = title;
        this.IBSN = IBSN;
        this.author = author;
        this.tag = tag;
        this.description = description;
        this.price = price;
        this.rating = rating;
        this.in_stock = in_stock;
        this.quantity = quantity;
        this.image = image;
    }
    public Book() {}

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getIBSN() {
        return IBSN;
    }
    public void setIBSN(String IBSN) {
        this.IBSN = IBSN;
    }
    public String getTag() {
        return tag;
    }
    public void setTag(String tag) {
        this.tag = tag;
    }
    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public BigDecimal getPrice() {
        return price;
    }
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    public BigDecimal getRating() {
        return rating;
    }
    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }
    public Boolean getIn_stock() {
        return in_stock;
    }
    public void setIn_stock(Boolean in_stock) {
        this.in_stock = in_stock;
    }
    public Long getQuantity() {
        return quantity;
    }
    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }

//
//    private BookImage bookImage;
//    @Transient
//    public BookImage getBookImage(){
//        return bookImage;
//    }
//    @Transient
//    public void setBookImage(BookImage bookImage) {
//        this.bookImage = bookImage;
//    }

}
