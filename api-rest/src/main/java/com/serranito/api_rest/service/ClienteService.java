package com.serranito.api_rest.service;

import com.serranito.api_rest.model.Cliente;
import com.serranito.api_rest.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
public class ClienteService {
    private final ClienteRepository repo;

    public ClienteService(ClienteRepository repo) {
        this.repo = repo;
    }

    public List<Cliente> findAll() {
        return repo.findAll();
    }

    public Cliente findById(Integer id) {
        return repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente no encontrado"));
    }

    public Cliente create(Cliente c) {
        c.setIdCliente(null);
        return repo.save(c);
    }

    public Cliente update(Integer id, Cliente c) {
        Cliente existing = findById(id);
        existing.setDniRuc(c.getDniRuc());
        existing.setNombre(c.getNombre());
        existing.setTelefono(c.getTelefono());
        existing.setDireccion(c.getDireccion());
        existing.setRazonSocial(c.getRazonSocial());
        return repo.save(existing);
    }

    public void delete(Integer id) {
        Cliente existing = findById(id);
        repo.delete(existing);
    }
}
