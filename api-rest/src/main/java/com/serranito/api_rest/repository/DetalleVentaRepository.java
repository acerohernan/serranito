package com.serranito.api_rest.repository;

import com.serranito.api_rest.model.DetalleVenta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetalleVentaRepository extends JpaRepository<DetalleVenta, Integer> {
}
