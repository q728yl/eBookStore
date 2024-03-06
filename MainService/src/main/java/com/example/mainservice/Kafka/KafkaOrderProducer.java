package com.example.mainservice.Kafka;

import com.example.mainservice.model.KafkaOrderMessage;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaOrderProducer {
    private final KafkaTemplate<String, KafkaOrderMessage> kafkaTemplate;
    private static final String ORDER_TOPIC = "order-topic"; // 替换为您的订单主题名称
    private static final String ORDER_HANDLE_TOPIC = "order-handle-topic"; // 替换为您的订单主题名称

    public KafkaOrderProducer(KafkaTemplate<String, KafkaOrderMessage> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendOrderMessage(String orderMessage) {
        KafkaOrderMessage orderMessage1 = new KafkaOrderMessage();
        orderMessage1.setUserId(orderMessage);
        kafkaTemplate.send(ORDER_TOPIC, orderMessage1);
    }
    public void sendOrderHandleMessage(KafkaOrderMessage orderMessage) {
        kafkaTemplate.send(ORDER_HANDLE_TOPIC, orderMessage);
    }
}
