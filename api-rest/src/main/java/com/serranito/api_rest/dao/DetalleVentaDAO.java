package com.serranito.api_rest.dao;

import com.serranito.api_rest.model.DetalleVenta;
import com.serranito.api_rest.repository.DetalleVentaRepository;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;

@Component
public class DetalleVentaDAO {
    private final DetalleVentaRepository repository;

    public DetalleVentaDAO(DetalleVentaRepository repository) {
        this.repository = repository;
    }

    public List<DetalleVenta> findAll() {
        return repository.findAll();
    }

    public Optional<DetalleVenta> findById(Integer id) {
        return repository.findById(id);
    }

    public DetalleVenta save(DetalleVenta detalle) {
        return repository.save(detalle);
    }

    public void delete(DetalleVenta detalle) {
        repository.delete(detalle);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    public boolean exists(Integer id) {
        return repository.existsById(id);
    }
}
