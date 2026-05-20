package com.serranito.api_rest.repository;

import com.serranito.api_rest.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {
}
