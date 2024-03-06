package com.example.mainservice.Controller;


import com.example.mainservice.Kafka.KafkaOrderProducer;
import com.example.mainservice.Service.BookService;
import com.example.mainservice.Service.CartService;
import com.example.mainservice.Service.OrderItemService;
import com.example.mainservice.Service.OrderService;
import com.example.mainservice.entity.Order;
import com.example.mainservice.entity.OrderItem;
import com.example.mainservice.model.Message;
import com.example.mainservice.model.OrderDatas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private CartService cartService;
    @Autowired
    private BookService bookService;
    @Autowired
    private OrderItemService orderItemService;
    @Autowired
    private KafkaOrderProducer kafkaOrderProducer;

    @PostMapping("/ordersById")
    public Message getOrdersByUserId(@RequestBody Map<String, Object> body) {
        Long userId = Long.valueOf(body.get("userId").toString());
        List<OrderItem> allOrderItems = new ArrayList<>();
        List<List<Integer>> date = new ArrayList<>();

        // Retrieve orders by user ID
        List<Order> orders = orderService.getOrderByUserId(userId);

        for (Order order : orders) {
            List<Integer> t = new ArrayList<>();
            t.clear();
            Long orderId = order.getId();
            List<OrderItem> orderItems = orderItemService.findByOrderId(orderId);
            allOrderItems.addAll(orderItems);


            t.add(order.getOrderDate().getYear());
            t.add(order.getOrderDate().getMonthValue());
            t.add(order.getOrderDate().getDayOfMonth());
            t.add(order.getOrderDate().getHour());
            t.add(order.getOrderDate().getMinute());
            t.add(order.getOrderDate().getSecond());
            date.add(t);

        }

        OrderDatas orderData = new OrderDatas(date, allOrderItems);
        return new Message("getOrder success", true, orderData);
    }

    @PostMapping("/allOrders")
    public Message getAllOrders(@RequestBody Map<String, Object> body) {
        // Long userId = Long.valueOf(body.get("userId").toString());
        List<OrderItem> allOrderItems = new ArrayList<>();
        List<List<Integer>> date = new ArrayList<>();

        List<Order> orders = orderService.getAllOrder();

        for (Order order : orders) {
            List<Integer> t = new ArrayList<>();
            t.clear();
            Long orderId = order.getId();
            List<OrderItem> orderItems = orderItemService.findByOrderId(orderId);
            allOrderItems.addAll(orderItems);


            t.add(order.getOrderDate().getYear());
            t.add(order.getOrderDate().getMonthValue());
            t.add(order.getOrderDate().getDayOfMonth());
            t.add(order.getOrderDate().getHour());
            t.add(order.getOrderDate().getMinute());
            t.add(order.getOrderDate().getSecond());
            date.add(t);

        }

        OrderDatas orderData = new OrderDatas(date, allOrderItems);
        return new Message("getOrder success", true, orderData);
    }

    @PostMapping("/purchase")
    public Message placeOrder(@RequestBody Map<String, Object> body) {
        Long userId = Long.valueOf(body.get("userId").toString());
        String orderMessage = userId.toString();
        kafkaOrderProducer.sendOrderMessage(orderMessage);
        System.out.println("send order message: 用户" + orderMessage+"已下单！");
        return new Message("订单已提交，请稍候~~~",true,null);
        //return orderService.placeOrder(userId);
    }


}