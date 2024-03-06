package com.example.mainservice.Repository;


import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import com.example.mainservice.entity.Book;
public interface BookRepository extends JpaRepository<Book,Long> {

    List<Book> findAll();
    Book findByTitle(String title);
//    @Transactional
//    @Modifying
//    @Query("UPDATE Book b SET b.in_stock  = 0 WHERE b.id = :bookId")
//    void updateStock(  Long bookId);
    @Transactional
    @Modifying
    @Query("UPDATE Book b SET b.quantity  = :quantity WHERE b.id = :bookId")
    void setQuantity(@Param("bookId")Long bookId,@Param("quantity") Long quantity);

}
