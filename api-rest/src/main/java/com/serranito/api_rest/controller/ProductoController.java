package com.serranito.api_rest.controller;

import com.serranito.api_rest.dto.ProductoDTO;
import com.serranito.api_rest.facade.ProductoFacade;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    private final ProductoFacade facade;

    public ProductoController(ProductoFacade facade) { this.facade = facade; }

    @GetMapping
    public List<ProductoDTO> list() { return facade.getAllProductos(); }

    @GetMapping("/{id}")
    public ProductoDTO get(@PathVariable Integer id) { return facade.getProductoById(id); }

    @PostMapping
    public ResponseEntity<ProductoDTO> create(@RequestBody ProductoDTO dto) { return ResponseEntity.ok(facade.createProducto(dto)); }

    @PutMapping("/{id}")
    public ProductoDTO update(@PathVariable Integer id, @RequestBody ProductoDTO dto) { return facade.updateProducto(id, dto); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) { facade.deleteProducto(id); return ResponseEntity.noContent().build(); }
}
