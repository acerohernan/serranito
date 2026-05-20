package com.serranito.api_rest.dao;

import com.serranito.api_rest.model.Venta;
import com.serranito.api_rest.repository.VentaRepository;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;

@Component
public class VentaDAO {
    private final VentaRepository repository;

    public VentaDAO(VentaRepository repository) {
        this.repository = repository;
    }

    public List<Venta> findAll() {
        return repository.findAll();
    }

    public Optional<Venta> findById(Integer id) {
        return repository.findById(id);
    }

    public Venta save(Venta venta) {
        return repository.save(venta);
    }

    public void delete(Venta venta) {
        repository.delete(venta);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    public boolean exists(Integer id) {
        return repository.existsById(id);
    }
}
