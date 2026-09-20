package project.productservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import project.productservice.Model.Product;

import java.util.Collection;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {

    List<Product> findBySellerId(Long id);
}
