package com.example.mainservice.Dao;



import com.example.mainservice.entity.Cart;

import java.util.List;

public interface CartDao {
    List<Cart> getCartByUserId(Long userId);

    void updateCart(Long userId, Long bookId);
    List<Cart> findByUserIdAndBookDetailsId(Long userId,Long bookId);

    void AddQuantity(Long id);

    void deleteCart(Long userId, Long bookId);

    void ReduceQuantity(Long id);

    List<Cart> findByUserId(Long userId);

    void deleteAll();
}
