package com.example.microservice.Entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name ="book_details")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String IBSN;
    private String author;
//    private String image;
    private String description;
    private BigDecimal price;
    private BigDecimal rating;
    private Boolean in_stock;
    private Long quantity;

}
