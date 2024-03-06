package com.example.mainservice.entity;


import jakarta.persistence.Basic;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "books")
public class BookImage {
    @Id
    private ObjectId id;

    private int bookId;
    private String image;
    public BookImage(){}
    public BookImage(ObjectId id,Integer bookId, String image) {
        this.id = id;
        this.bookId = bookId;
        this.image = image;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

}
