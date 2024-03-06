package com.example.mainservice.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;



@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name ="cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "book_details_id")
    private Long bookDetailsId;
    private Long quantity;

    //@JoinColumn注解指定了关联的列名和引用的列名，这里使用了name属性指定列名，referencedColumnName属性指定引用的列名。
    //insertable = false, updatable = false表示在保存和更新Cart实体时，不会级联更新关联的User和BookDetails实体，而是通过外键字段来维护关联关系
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    private User user;
}
