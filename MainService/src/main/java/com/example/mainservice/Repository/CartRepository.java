package com.example.mainservice.Repository;

import com.example.mainservice.entity.Cart;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
public interface CartRepository extends JpaRepository<Cart, Long>{
    //    List<Cart> findAllCarts();
//    List<Map<String, Object>> findCartByUserId(Long id);

//    List<Map<String, Object>> updateCartByUserId(Long id);
      List<Cart> findByUserId(Long userId);
      List<Cart>findByUserIdAndBookDetailsId(Long userId,Long bookId);
      @Modifying
      @Transactional
      @Query(value = "INSERT INTO Cart (user_id, book_details_id, quantity) VALUES (:userId, :bookId, 1)", nativeQuery = true)
      void updateCart(@Param("userId") Long userId, @Param("bookId") Long bookId);
//      void updateCart(Long userId, Long bookId);
      @Modifying
      @Transactional
      @Query("UPDATE Cart c SET c.quantity = c.quantity + 1 WHERE c.id = :id")
      void AddQuantity(Long id);

      @Modifying
      @Query("DELETE FROM Cart c WHERE c.userId = :userId AND c.bookDetailsId = :bookId")
      @Transactional
      void deleteCart(@Param("userId") Long userId, @Param("bookId") Long bookId);
      @Modifying
      @Transactional
      @Query("UPDATE Cart c SET c.quantity = c.quantity -1 WHERE c.id = :id")
      void reduceQuantity(Long id);
//      @Modifying
//      @Query("UPDATE Cart c SET c.quantity = c.quantity + 1 WHERE c.userId = :userId AND c.bookDetailsId = :bookId")
//      int incrementQuantityByUserIdAndBookId(@Param("userId") Long userId, @Param("bookId") Long bookId);
//

      @Modifying
      @Transactional
      @Override
      void delete(Cart entity);
}
