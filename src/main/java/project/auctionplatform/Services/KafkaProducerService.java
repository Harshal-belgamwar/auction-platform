package project.auctionplatform.Services;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import project.auctionplatform.DTO.AuctionEndedEvent;

@Service
public class KafkaProducerService {

    private static final String TOPIC = "auction-ended";

    private final KafkaTemplate<String, AuctionEndedEvent> kafkaTemplate;

    public KafkaProducerService(
            KafkaTemplate<String, AuctionEndedEvent> kafkaTemplate) {

        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishAuctionEnded(AuctionEndedEvent event) {

        kafkaTemplate.send(
                TOPIC,
                event.getAuctionId().toString(),
                event
        );
    }
}