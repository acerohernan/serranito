package com.serranito.api_rest.controller;

import com.serranito.api_rest.dto.VentaDTO;
import com.serranito.api_rest.facade.VentaFacade;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ventas")
public class VentaController {
    private final VentaFacade facade;

    public VentaController(VentaFacade facade) {
        this.facade = facade;
    }

    @GetMapping
    public List<VentaDTO> list() {
        return facade.getAllVentas();
    }

    @GetMapping("/{id}")
    public VentaDTO get(@PathVariable Integer id) {
        return facade.getVentaById(id);
    }

    @PostMapping
    public ResponseEntity<VentaDTO> create(@RequestBody VentaDTO dto) {
        return ResponseEntity.ok(facade.createVenta(dto));
    }

    @PutMapping("/{id}")
    public VentaDTO update(@PathVariable Integer id, @RequestBody VentaDTO dto) {
        return facade.updateVenta(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        facade.deleteVenta(id);
        return ResponseEntity.noContent().build();
    }
}
