package project.biddingservice.Repository;



import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.biddingservice.Entity.Bid;


import org.springframework.data.jpa.repository.JpaRepository;


import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;




public interface BidRepository
        extends JpaRepository<Bid, Long> {

    @Query("""
    SELECT DISTINCT b.auctionId
    FROM Bid b
    WHERE b.bidderId = :bidderId
""")
    List<Long> findParticipatedAuction(@Param("bidderId") Long id);



    List<Bid> findByAuctionIdOrderByCreatedAtDesc(Long auctionId);

 ;




}