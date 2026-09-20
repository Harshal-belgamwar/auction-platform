package project.notificationservice.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long auctionId;

//    private Long productId;
    private String productTitle;

//    private Long sellerId;
    private String sellerName;
    private String sellerEmail;


    private BigDecimal startingPrice;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private Long winnerId;
    private String winnerName;
    private String winnerEmail;
    private BigDecimal winningBidAmount;
}
