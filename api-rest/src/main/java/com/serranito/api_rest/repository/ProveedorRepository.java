package com.serranito.api_rest.repository;

import com.serranito.api_rest.model.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProveedorRepository extends JpaRepository<Proveedor, Integer> {
}
