package project.auctionplatform.Repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.auctionplatform.Enum.AuctionStatus;
import project.auctionplatform.Model.Auction;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AuctionRepository extends CrudRepository<Auction,Long> {

    @Query("""
    SELECT a
    FROM Auction a
    WHERE a.status = 'UPCOMING'
    AND a.startTime <= :now
""")
    List<Auction> findAuctionsToActivate(
            @Param("now") LocalDateTime now
    );

    @Query("""
    SELECT a
    FROM Auction a
    WHERE a.status = 'ACTIVE'
    AND a.endTime <= :now
""")
    List<Auction> findAuctionsToEnd(
            @Param("now") LocalDateTime now
    );

    List<Auction> findByStatus(AuctionStatus status);

    List<Auction> findBySellerId(Long sellerId);

    @Modifying
    @Query(
            """
    update  Auction a set a.currentPrice = :currentPrice where a.id = :auctionId
"""
    )
    int updateAuctionCurentPrice(@Param("auctionId") Long auctionId, @Param("currentPrice") BigDecimal currentPrice);


    List<Auction> findAllByIdIn(List<Long> auctionIds);
}
