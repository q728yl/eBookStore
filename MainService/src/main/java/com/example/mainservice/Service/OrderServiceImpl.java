package com.example.mainservice.Service;


import com.example.mainservice.Dao.BookDao;
import com.example.mainservice.Dao.CartDao;
import com.example.mainservice.Dao.OrderDao;
import com.example.mainservice.Dao.OrderItemDao;
import com.example.mainservice.entity.Book;
import com.example.mainservice.entity.Cart;
import com.example.mainservice.entity.Order;
import com.example.mainservice.model.Message;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private CartDao cartDao;
    @Autowired
    private BookDao bookDao;
    @Autowired
    private OrderItemDao orderItemDao;
    @Override
    @Transactional(Transactional.TxType.REQUIRED)
    public Message placeOrder(Long userId) throws JsonProcessingException {
        System.out.println("placeOrder被调用了");
        List<Cart> carts = cartDao.findByUserId(userId);
        orderDao.addOrder(userId);
        Long orderId = orderDao.getOrderNum();

        for (Cart cart :carts){
//            System.out.println(cart);
            Long bookId =cart.getBookDetailsId();
            Long quantity = cart.getQuantity();
            Book book = bookDao.findBookById(bookId);
            if (book.getQuantity() < quantity) {
                String errorMessage = book.getTitle() + "库存不足，下单失败";
                return new Message(errorMessage, false, null);
            }
            Long newQuantity = book.getQuantity()-quantity;
            bookDao.setQuantity(bookId,newQuantity);
            Long status = 0L;
            orderItemDao.addRecord(orderId,bookId,quantity,status);
        }
        cartDao.deleteAll();
//        bookDao.setQuantity(2L,-2L);
        return new Message("购买成功",true,null);
    }
    @Override
    public Long getOrderNum(){
        return orderDao.getOrderNum();
    }
    @Override
    public List<Order> getOrderByUserId(Long userId){
        return orderDao.getOrderByUserId(userId);
    }
    @Override
    public List<Order> getAllOrder(){
        return orderDao.getAllOrder();
    }
}
