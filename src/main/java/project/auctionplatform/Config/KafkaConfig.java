package project.auctionplatform.Config;





import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;


import org.springframework.kafka.support.serializer.JacksonJsonSerializer;
import project.auctionplatform.DTO.AuctionEndedEvent;

@Configuration
public class KafkaConfig {

    @Bean
    public ProducerFactory<String, AuctionEndedEvent> producerFactory() {

        Map<String, Object> config = new HashMap<>();

        // Kafka server
        config.put(
                ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,
                "localhost:9092"
        );

        // Key serializer
        config.put(
                ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG,
                StringSerializer.class
        );

        // Value serializer
        config.put(
                ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG,
                JacksonJsonSerializer.class
        );

        return new DefaultKafkaProducerFactory<>(config);
    }

    @Bean
    public KafkaTemplate<String, AuctionEndedEvent> kafkaTemplate(
            ProducerFactory<String, AuctionEndedEvent> producerFactory) {

        return new KafkaTemplate<>(producerFactory);
    }
}