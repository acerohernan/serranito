package com.serranito.api_rest.service;

import com.serranito.api_rest.model.Producto;
import com.serranito.api_rest.repository.ProductoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
public class ProductoService {
    private final ProductoRepository repo;

    public ProductoService(ProductoRepository repo) {
        this.repo = repo;
    }

    public List<Producto> findAll() { return repo.findAll(); }

    public Producto findById(Integer id) { return repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado")); }

    public Producto create(Producto p) { p.setIdProducto(null); return repo.save(p); }

    public Producto update(Integer id, Producto p) {
        Producto existing = findById(id);
        existing.setCodigo(p.getCodigo());
        existing.setDescripcion(p.getDescripcion());
        existing.setStock(p.getStock());
        existing.setPrecio(p.getPrecio());
        existing.setProveedor(p.getProveedor());
        return repo.save(existing);
    }

    public void delete(Integer id) { repo.delete(findById(id)); }
}
