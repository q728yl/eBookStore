package com.example.mainservice.Service;


import com.example.mainservice.entity.OrderItem;

import java.util.List;

public interface OrderItemService {
    void addRecord(Long orderId, Long bookId, Long quantity, Long status);

    List<OrderItem> findByOrderId(Long orderId);
}
