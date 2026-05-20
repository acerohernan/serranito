package com.serranito.api_rest.service;

import com.serranito.api_rest.model.Empresa;
import com.serranito.api_rest.repository.EmpresaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
public class EmpresaService {
    private final EmpresaRepository repo;

    public EmpresaService(EmpresaRepository repo) { this.repo = repo; }

    public List<Empresa> findAll() { return repo.findAll(); }

    public Empresa findById(Integer id) { return repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Empresa no encontrada")); }

    public Empresa create(Empresa e) { e.setIdEmpresa(null); return repo.save(e); }

    public Empresa update(Integer id, Empresa e) {
        Empresa existing = findById(id);
        existing.setRuc(e.getRuc());
        existing.setNombre(e.getNombre());
        existing.setTelefono(e.getTelefono());
        existing.setDireccion(e.getDireccion());
        existing.setRazonSocial(e.getRazonSocial());
        return repo.save(existing);
    }

    public void delete(Integer id) { repo.delete(findById(id)); }
}
