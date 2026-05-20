package com.serranito.api_rest.dao;

import com.serranito.api_rest.model.Empresa;
import com.serranito.api_rest.repository.EmpresaRepository;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;

@Component
public class EmpresaDAO {
    private final EmpresaRepository repository;

    public EmpresaDAO(EmpresaRepository repository) {
        this.repository = repository;
    }

    public List<Empresa> findAll() {
        return repository.findAll();
    }

    public Optional<Empresa> findById(Integer id) {
        return repository.findById(id);
    }

    public Empresa save(Empresa empresa) {
        return repository.save(empresa);
    }

    public void delete(Empresa empresa) {
        repository.delete(empresa);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    public boolean exists(Integer id) {
        return repository.existsById(id);
    }
}
