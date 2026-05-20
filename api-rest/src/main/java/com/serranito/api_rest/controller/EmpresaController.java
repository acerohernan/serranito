package com.serranito.api_rest.controller;

import com.serranito.api_rest.dto.EmpresaDTO;
import com.serranito.api_rest.facade.EmpresaFacade;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {
    private final EmpresaFacade facade;

    public EmpresaController(EmpresaFacade facade) { this.facade = facade; }

    @GetMapping
    public List<EmpresaDTO> list() { return facade.getAllEmpresas(); }

    @GetMapping("/{id}")
    public EmpresaDTO get(@PathVariable Integer id) { return facade.getEmpresaById(id); }

    @PostMapping
    public ResponseEntity<EmpresaDTO> create(@RequestBody EmpresaDTO dto) { return ResponseEntity.ok(facade.createEmpresa(dto)); }

    @PutMapping("/{id}")
    public EmpresaDTO update(@PathVariable Integer id, @RequestBody EmpresaDTO dto) { return facade.updateEmpresa(id, dto); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) { facade.deleteEmpresa(id); return ResponseEntity.noContent().build(); }
}
