package com.serranito.api_rest.dao;

import com.serranito.api_rest.model.Producto;
import com.serranito.api_rest.repository.ProductoRepository;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;

@Component
public class ProductoDAO {
    private final ProductoRepository repository;

    public ProductoDAO(ProductoRepository repository) {
        this.repository = repository;
    }

    public List<Producto> findAll() {
        return repository.findAll();
    }

    public Optional<Producto> findById(Integer id) {
        return repository.findById(id);
    }

    public Producto save(Producto producto) {
        return repository.save(producto);
    }

    public void delete(Producto producto) {
        repository.delete(producto);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    public boolean exists(Integer id) {
        return repository.existsById(id);
    }
}
