package com.serranito.api_rest.controller;

import com.serranito.api_rest.dto.DetalleVentaDTO;
import com.serranito.api_rest.facade.DetalleVentaFacade;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detalle-ventas")
public class DetalleVentaController {
    private final DetalleVentaFacade facade;

    public DetalleVentaController(DetalleVentaFacade facade) { this.facade = facade; }

    @GetMapping
    public List<DetalleVentaDTO> list() { return facade.getAllDetalles(); }

    @GetMapping("/{id}")
    public DetalleVentaDTO get(@PathVariable Integer id) { return facade.getDetalleById(id); }

    @PostMapping
    public ResponseEntity<DetalleVentaDTO> create(@RequestBody DetalleVentaDTO dto) { return ResponseEntity.ok(facade.createDetalle(dto)); }

    @PutMapping("/{id}")
    public DetalleVentaDTO update(@PathVariable Integer id, @RequestBody DetalleVentaDTO dto) { return facade.updateDetalle(id, dto); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) { facade.deleteDetalle(id); return ResponseEntity.noContent().build(); }
}
