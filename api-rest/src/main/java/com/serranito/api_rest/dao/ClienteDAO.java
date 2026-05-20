package com.serranito.api_rest.dao;

import com.serranito.api_rest.model.Cliente;
import com.serranito.api_rest.repository.ClienteRepository;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;

@Component
public class ClienteDAO {
    private final ClienteRepository repository;

    public ClienteDAO(ClienteRepository repository) {
        this.repository = repository;
    }

    public List<Cliente> findAll() {
        return repository.findAll();
    }

    public Optional<Cliente> findById(Integer id) {
        return repository.findById(id);
    }

    public Cliente save(Cliente cliente) {
        return repository.save(cliente);
    }

    public void delete(Cliente cliente) {
        repository.delete(cliente);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    public boolean exists(Integer id) {
        return repository.existsById(id);
    }
}
