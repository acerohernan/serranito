package com.serranito.api_rest.controller;

import com.serranito.api_rest.dto.ClienteDTO;
import com.serranito.api_rest.facade.ClienteFacade;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    private final ClienteFacade facade;

    public ClienteController(ClienteFacade facade) { this.facade = facade; }

    @GetMapping
    public List<ClienteDTO> list() { return facade.getAllClientes(); }

    @GetMapping("/{id}")
    public ClienteDTO get(@PathVariable Integer id) { return facade.getClienteById(id); }

    @PostMapping
    public ResponseEntity<ClienteDTO> create(@RequestBody ClienteDTO dto) {
        ClienteDTO created = facade.createCliente(dto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ClienteDTO update(@PathVariable Integer id, @RequestBody ClienteDTO dto) { return facade.updateCliente(id, dto); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) { facade.deleteCliente(id); return ResponseEntity.noContent().build(); }
}
