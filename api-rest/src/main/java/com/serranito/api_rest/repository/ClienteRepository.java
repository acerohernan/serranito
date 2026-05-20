package com.serranito.api_rest.repository;

import com.serranito.api_rest.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
}
