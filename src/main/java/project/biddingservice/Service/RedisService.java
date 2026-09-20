package project.biddingservice.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate<String, String> redisTemplate;

    public void setCurrentBid(Long auctionId, BigDecimal amount) {

        String key = "auction:" + auctionId + ":currentBid";

        redisTemplate.opsForValue().set(
                key,
                amount.toString()
        );
    }

    public BigDecimal getCurrentBid(Long auctionId) {

        String key = "auction:" + auctionId + ":currentBid";

        String value = redisTemplate
                .opsForValue()
                .get(key);

        if (value == null) {
            return null;
        }

        return new BigDecimal(value);
    }
}
