package project.biddingservice.DTO;


import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
//import java.time.LocalDateTime;


@Data
public class BidRequest {

    @NotNull(message = "Auction ID is required")
    private Long auctionId;

    @NotNull(message = "Bid amount is required")
    @DecimalMin(
            value = "0.01",
            message = "Bid amount must be greater than 0"
    )
    private BigDecimal amount;

//    @NotNull(message = "Current amount is required")
//    @DecimalMin(
//            value = "0.01",
//            message = "Bid amount must be greater than 0"
//    )
//    private BigDecimal currAmount;

//    @NotNull(message = "End Time is required")
//    private LocalDateTime endTime;
}