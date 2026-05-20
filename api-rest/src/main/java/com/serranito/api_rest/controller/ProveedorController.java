package com.serranito.api_rest.controller;

import com.serranito.api_rest.dto.ProveedorDTO;
import com.serranito.api_rest.facade.ProveedorFacade;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proveedores")
public class ProveedorController {
    private final ProveedorFacade facade;

    public ProveedorController(ProveedorFacade facade) { this.facade = facade; }

    @GetMapping
    public List<ProveedorDTO> list() { return facade.getAllProveedores(); }

    @GetMapping("/{id}")
    public ProveedorDTO get(@PathVariable Integer id) { return facade.getProveedorById(id); }

    @PostMapping
    public ResponseEntity<ProveedorDTO> create(@RequestBody ProveedorDTO dto) { return ResponseEntity.ok(facade.createProveedor(dto)); }

    @PutMapping("/{id}")
    public ProveedorDTO update(@PathVariable Integer id, @RequestBody ProveedorDTO dto) { return facade.updateProveedor(id, dto); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) { facade.deleteProveedor(id); return ResponseEntity.noContent().build(); }
}
