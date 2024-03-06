package com.example.mainservice.Dao;


import com.example.mainservice.entity.Order;

import java.util.List;

public interface OrderDao {
    void addOrder(Long userId);

    Long getOrderNum();

    List<Order> getOrderByUserId(Long userId);

    List<Order> getAllOrder();
}
