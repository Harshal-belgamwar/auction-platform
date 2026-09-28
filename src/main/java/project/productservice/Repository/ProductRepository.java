package project.productservice.Repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.productservice.Enum.ProductStatus;
import project.productservice.Model.Product;

import java.util.Collection;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {

    List<Product> findBySellerId(Long id);

    @Modifying
    @Transactional
    @Query("""
    UPDATE Product p
    SET p.status = :status
    WHERE p.id = :productId
""")
    int updateStatus(
            @Param("productId") Long productId,
            @Param("status") ProductStatus status
    );
}
