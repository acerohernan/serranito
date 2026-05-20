package com.serranito.api_rest.service;

import com.serranito.api_rest.model.Proveedor;
import com.serranito.api_rest.repository.ProveedorRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
public class ProveedorService {
    private final ProveedorRepository repo;

    public ProveedorService(ProveedorRepository repo) {
        this.repo = repo;
    }

    public List<Proveedor> findAll() { return repo.findAll(); }

    public Proveedor findById(Integer id) { return repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proveedor no encontrado")); }

    public Proveedor create(Proveedor p) { p.setIdProveedor(null); return repo.save(p); }

    public Proveedor update(Integer id, Proveedor p) {
        Proveedor existing = findById(id);
        existing.setRuc(p.getRuc());
        existing.setNombre(p.getNombre());
        existing.setTelefono(p.getTelefono());
        existing.setDireccion(p.getDireccion());
        existing.setRazonSocial(p.getRazonSocial());
        return repo.save(existing);
    }

    public void delete(Integer id) { repo.delete(findById(id)); }
}
