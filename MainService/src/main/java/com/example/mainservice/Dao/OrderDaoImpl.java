package com.example.mainservice.Dao;

import com.example.mainservice.Repository.BookRepository;
import com.example.mainservice.Repository.OrderRepository;
import com.example.mainservice.entity.Order;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class OrderDaoImpl implements OrderDao{
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private BookRepository bookRepository;
    @Override
    @Transactional(Transactional.TxType.REQUIRED)
    public void addOrder(Long userId){
        orderRepository.placeOrder(userId);
//        bookRepository.setQuantity(2L,-2L);
    }
    @Override
    public Long getOrderNum(){
        return orderRepository.getOrderCount();
    }
    @Override
    public List<Order> getOrderByUserId(Long userId){
        return orderRepository.findByUseId(userId);
    }
    @Override
    public List<Order> getAllOrder(){
        return orderRepository.findAll();
    }
}
