package project.productservice.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import project.productservice.DTO.CategoryRequest;
import project.productservice.DTO.CategoryResponse;
import project.productservice.ExceptionHandler.ResourceAlreadyExistException;
import project.productservice.ExceptionHandler.ResourceNotFoundException;
import project.productservice.Model.Category;
import project.productservice.Repository.CategoryRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    // Create category
    public CategoryResponse createCategory(CategoryRequest category) {

        boolean isPresent = categoryRepository.existsByName(category.getName());
        if(isPresent) {
            throw  new ResourceAlreadyExistException("Category is already present");
        }

        Category categoryObj = new Category();
        categoryObj.setName(category.getName());
        categoryObj.setDescription(category.getDescription());
        categoryObj.setCreatedAt(LocalDateTime.now());

        Category categorySaved = categoryRepository.save(categoryObj);


        return CategoryResponse.builder()
                .id(categorySaved.getId())
                .name(categorySaved.getName())
                .description(categorySaved.getDescription())
                .build();
    }

    // Get all categories
    public List<CategoryResponse> getAllCategories() {

        List<Category> categories =  categoryRepository.findAll();

        return  categories.stream().map((x)-> CategoryResponse.builder().id(x.getId()).name(x.getName()).description(x.getDescription()).build()).collect(Collectors.toList());

    }

    // Get category by ID
    public CategoryResponse getCategoryById(Long id) {

        Category category =  categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));

        return CategoryResponse.builder().id(category.getId()).name(category.getName()).description(category.getDescription()).build();
    }

    // Update category
    public CategoryResponse updateCategory(Long id, CategoryRequest updatedCategory) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));

        category.setName(updatedCategory.getName());
        category.setDescription(updatedCategory.getDescription());
        Category categorySaved = categoryRepository.save(category);

        return new CategoryResponse(categorySaved.getId(),categorySaved.getName(),categorySaved.getDescription()) ;
    }

    // Delete category
    public ResponseEntity<?> deleteCategory(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));

        categoryRepository.delete(category);

        return ResponseEntity.ok().body("Category deleted Successfully");
    }
}