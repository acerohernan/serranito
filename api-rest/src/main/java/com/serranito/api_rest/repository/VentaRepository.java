package com.serranito.api_rest.repository;

import com.serranito.api_rest.model.Venta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VentaRepository extends JpaRepository<Venta, Integer> {
}
