package com.example.mainservice.Service;



import com.example.mainservice.entity.Order;
import com.example.mainservice.model.Message;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface OrderService {
    Message placeOrder(Long userId) throws JsonProcessingException;

    Long getOrderNum();

    List<Order> getOrderByUserId(Long userId);

    List<Order> getAllOrder();
}
