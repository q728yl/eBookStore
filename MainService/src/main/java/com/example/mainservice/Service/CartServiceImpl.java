package com.example.mainservice.Service;

import com.example.mainservice.Dao.CartDao;
import com.example.mainservice.entity.Cart;
import com.example.mainservice.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService{
    @Autowired
    private CartDao cartDao;
//    @Override
//    public Message checkLogin(String username, String password) {
//        UserAuth userAuth = userAuthDao.getUserAuthByUsernameAndPassword(username,password);
//        if(userAuth!= null){
//            return new Message("登陆成功",true,userAuth);
//        }else{
//            return new Message("密码错误",false,null);
//        }
//    }
    @Override
    public  Message getCartById(Long userId){
        List<Cart> cart = cartDao.getCartByUserId(userId);
        if(cart!= null){
            return new Message("获取购物车信息成功",true,cart);
        }else{
            return new Message("获取购物车信息错误",false,null);
        }
    }
    @Override
    public Message updateCart(Long userId, Long bookId){
        cartDao.updateCart(userId,bookId);
        return new Message("更新购物车信息成功",true,null);
    }
    @Override
    public  List<Cart> findByUserIdAndBookDetailsId(Long userId, Long bookId){
        return cartDao.findByUserIdAndBookDetailsId(userId,bookId);

    }
    @Override
    public void AddQuantity(Long id){
        cartDao.AddQuantity(id);
    }
    @Override
    public void deleteCart(Long userId, Long bookId){
        cartDao.deleteCart(userId,bookId);
    }
    @Override
    public  void ReduceQuantity(Long id){
        cartDao.ReduceQuantity(id);
    }
    @Override
    public List<Cart> findByUserId(Long userId){
        return cartDao.findByUserId( userId);
    }
    @Override
    public void deleteAll(){
        cartDao.deleteAll();
    }
}
