package com.example.mainservice.Dao;

import com.example.mainservice.Repository.CartRepository;
import com.example.mainservice.entity.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CartDaoImpl implements CartDao{

    @Autowired
    private CartRepository cartRepository;
//    @Override
//    public UserAuth getUserAuthByUsernameAndPassword(String username, String password) {
//        return userAuthRepository.findUserAuthByUsernameAndPassword(username,password);
//    }
    @Override
    public List<Cart> getCartByUserId(Long userId){
        return cartRepository. findByUserId(userId);
    }
    @Override
    public void updateCart(Long userId, Long bookId){
        cartRepository.updateCart(userId,bookId);
    }
    @Override
    public List<Cart> findByUserIdAndBookDetailsId(Long userId,Long bookId){
        return cartRepository. findByUserIdAndBookDetailsId(userId,bookId);
    }
    @Override
    public void AddQuantity(Long id){
        cartRepository.AddQuantity(id);
    }
    @Override
    public  void deleteCart(Long userId, Long bookId){
        cartRepository.deleteCart(userId,bookId);
    }
    @Override
    public void ReduceQuantity(Long id){
        cartRepository.reduceQuantity(id);
    }
    @Override
    public  List<Cart> findByUserId(Long userId){
        return cartRepository.findByUserId(userId);
    }
    @Override
    public void deleteAll(){
        cartRepository.deleteAll();
    }
}
