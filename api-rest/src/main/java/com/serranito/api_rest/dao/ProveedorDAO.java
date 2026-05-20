package com.serranito.api_rest.dao;

import com.serranito.api_rest.model.Proveedor;
import com.serranito.api_rest.repository.ProveedorRepository;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;

@Component
public class ProveedorDAO {
    private final ProveedorRepository repository;

    public ProveedorDAO(ProveedorRepository repository) {
        this.repository = repository;
    }

    public List<Proveedor> findAll() {
        return repository.findAll();
    }

    public Optional<Proveedor> findById(Integer id) {
        return repository.findById(id);
    }

    public Proveedor save(Proveedor proveedor) {
        return repository.save(proveedor);
    }

    public void delete(Proveedor proveedor) {
        repository.delete(proveedor);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    public boolean exists(Integer id) {
        return repository.existsById(id);
    }
}
