package com.example.mainservice.Dao;


import com.example.mainservice.Repository.BookRepository;
import com.example.mainservice.Repository.OrderItemRepository;
import com.example.mainservice.entity.OrderItem;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrderItemDaoImpl implements OrderItemDao{
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private BookRepository bookRepository;
    @Override
    @Transactional(Transactional.TxType.REQUIRED)
    public void addRecord(Long orderId, Long bookId, Long quantity, Long status){
        orderItemRepository.addRecord( orderId,  bookId,  quantity,  status);
       // bookRepository.setQuantity(2L,-2L);
    }
    @Override
    public List<OrderItem> findByOrderId(Long orderId){
        return orderItemRepository.getOrderItemByOrderId( orderId);
    }

}
