package com.serranito.api_rest.repository;

import com.serranito.api_rest.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpresaRepository extends JpaRepository<Empresa, Integer> {
}
