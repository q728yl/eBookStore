package com.example.mainservice.Controller;

import com.example.mainservice.Service.CartService;

import com.example.mainservice.entity.Cart;
import com.example.mainservice.model.Message;
import com.example.mainservice.model.OrderDatas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
/*
* 主键和非主键建立完全函数依赖，消除了部分函数依赖和传递函数依赖，这是为了满足2NF & 3NF.
* 部分函数依赖：主键和另一个非主键共同才能决定非主键；传递函数依赖：主键虽然可以决定非主键，但是存在别的非主键也能决定非主键。
* */
@CrossOrigin
@RestController
//@RequestMapping("/cart")
//处理外部请求
//service层主要负责业务模块的逻辑应用设计
//DAO（DataAccessObject） 数据访问层，直接操作数据库表，进行增删改查等操作
//repository 仓库
public class CartController {
    @Autowired
    private CartService cartService;
    //Spring 依赖注入用于解耦组件之间的依赖关系。组件不再自行创建和管理依赖的对象，而是通过外部容器（如 Spring 容器）负责创建和注入依赖对象，从而实现了组件间的解耦。
    @PostMapping("/getCartById")
    public Message findCartByUserId(@RequestBody Map<String,Object> body) {
        Long userId = Long.valueOf(body.get("userId").toString());
//        Long bookId = Long.valueOf(body.get("bookId").toString());
        return cartService.getCartById(userId);
    }
    @PostMapping("/updateCart")
    public Message updateCart(@RequestBody Map<String, Object> body) {
        Long userId = Long.valueOf(String.valueOf(body.get("userId")));
        Long bookId = Long.valueOf(String.valueOf(body.get("bookId")));
        List<Cart> carts = cartService.findByUserIdAndBookDetailsId(userId, bookId);

        if (carts.isEmpty()) {
            cartService.updateCart(userId, bookId);
        } else {
            Cart cart = carts.get(0);
            cartService.AddQuantity(cart.getId());
        }

        return new Message("update 成功", true, null);
    }
    @PostMapping("/deleteCart")
    public Message deleteCart(@RequestBody Map<String, Object> body) {
        Long userId = Long.valueOf(String.valueOf(body.get("userId")));
        Long bookId = Long.valueOf(String.valueOf(body.get("bookId")));
        List<Cart> carts = cartService.findByUserIdAndBookDetailsId(userId, bookId);
        Cart cart = null;
        if(carts != null && !carts.isEmpty()){
            cart = carts.get(0);
        }
        if (cart != null) {
            if (cart.getQuantity() == 1) {
                cartService.deleteCart(userId, bookId);
            } else {
                cartService.ReduceQuantity(cart.getId());
            }
            return new Message("操作成功", true, null);
        } else {
            return new Message("找不到购物车记录", false, null);
        }
    }


}