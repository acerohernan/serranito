package com.serranito.api_rest.service;

import com.serranito.api_rest.model.Venta;
import com.serranito.api_rest.repository.VentaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
public class VentaService {
    private final VentaRepository repo;

    public VentaService(VentaRepository repo) { this.repo = repo; }

    public List<Venta> findAll() { return repo.findAll(); }

    public Venta findById(Integer id) { return repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venta no encontrada")); }

    public Venta create(Venta v) { v.setIdVenta(null); return repo.save(v); }

    public Venta update(Integer id, Venta v) {
        Venta existing = findById(id);
        existing.setCliente(v.getCliente());
        existing.setFecha(v.getFecha());
        existing.setTotal(v.getTotal());
        return repo.save(existing);
    }

    public void delete(Integer id) { repo.delete(findById(id)); }
}
