package com.serranito.api_rest.controller;

import com.serranito.api_rest.dto.EmpresaDTO;
import com.serranito.api_rest.facade.EmpresaFacade;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empresa")
public class EmpresaController {
    private final EmpresaFacade facade;

    public EmpresaController(EmpresaFacade facade) {
        this.facade = facade;
    }

    @GetMapping
    public EmpresaDTO get() {
        List<EmpresaDTO> list = facade.getAllEmpresas();
        if (list == null || list.isEmpty()) {
            return EmpresaDTO.builder()
                    .id(null)
                    .ruc("")
                    .nombre("")
                    .telefono("")
                    .direccion("")
                    .razonSocial("")
                    .build();
        }
        return list.get(0);
    }

    @PutMapping
    public ResponseEntity<EmpresaDTO> edit(@RequestBody EmpresaDTO dto) {
        EmpresaDTO result = facade.editEmpresa(dto);
        return ResponseEntity.ok(result);
    }
}
