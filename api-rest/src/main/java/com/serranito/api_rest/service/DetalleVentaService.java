package com.serranito.api_rest.service;

import com.serranito.api_rest.model.DetalleVenta;
import com.serranito.api_rest.repository.DetalleVentaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
public class DetalleVentaService {
    private final DetalleVentaRepository repo;

    public DetalleVentaService(DetalleVentaRepository repo) { this.repo = repo; }

    public List<DetalleVenta> findAll() { return repo.findAll(); }

    public DetalleVenta findById(Integer id) { return repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Detalle no encontrado")); }

    public DetalleVenta create(DetalleVenta d) { d.setIdDetalle(null); return repo.save(d); }

    public DetalleVenta update(Integer id, DetalleVenta d) {
        DetalleVenta existing = findById(id);
        existing.setVenta(d.getVenta());
        existing.setProducto(d.getProducto());
        existing.setCantidad(d.getCantidad());
        existing.setPrecio(d.getPrecio());
        existing.setSubtotal(d.getSubtotal());
        return repo.save(existing);
    }

    public void delete(Integer id) { repo.delete(findById(id)); }
}
