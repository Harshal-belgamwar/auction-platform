package project.auctionplatform.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Builder
@Data
@AllArgsConstructor
public class UpdatePrice {
    private BigDecimal amount;
}
