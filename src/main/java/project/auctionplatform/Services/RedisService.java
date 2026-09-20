package project.auctionplatform.Services;

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

    public void deleteCurrentBid(Long auctionId) {
        String key = "auction:" + auctionId + ":currentBid";
        redisTemplate.delete(key);
    }


}
