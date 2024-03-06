package com.example.mainservice.Repository;


import com.example.mainservice.entity.Order;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUseId(Long userId);
    
    @Modifying
    @Transactional()
    @Query(value = "INSERT INTO orders (user_id) VALUES (:userId)", nativeQuery = true)
    void placeOrder(@Param("userId") Long userId);

    @Query(value = "SELECT COUNT(*) FROM orders", nativeQuery = true)
    Long getOrderCount();

}
