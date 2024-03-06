package com.example.mainservice.Service;


import com.example.mainservice.entity.Cart;
import com.example.mainservice.model.Message;

import java.util.List;

public interface CartService {
    Message getCartById(Long userId);

    Message updateCart(Long userId, Long bookId);

    List<Cart> findByUserIdAndBookDetailsId(Long userId, Long bookId);

    void AddQuantity(Long id);

    void ReduceQuantity(Long id);

    void deleteCart(Long userId, Long bookId);

    List<Cart> findByUserId(Long userId);

    void deleteAll();
}
