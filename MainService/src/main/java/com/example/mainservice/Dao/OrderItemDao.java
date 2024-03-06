package com.example.mainservice.Dao;


import com.example.mainservice.entity.OrderItem;

import java.util.List;

public interface OrderItemDao {
    void addRecord(Long orderId, Long bookId, Long quantity, Long status);

    List<OrderItem> findByOrderId(Long orderId);
}
