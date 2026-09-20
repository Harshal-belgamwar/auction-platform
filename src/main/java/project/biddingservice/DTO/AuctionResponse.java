package project.biddingservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.biddingservice.Enum.AuctionStatus;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuctionResponse {
    private Long id;
    private ProductResponse product;
    private AuctionStatus status;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
