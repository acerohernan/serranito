package com.serranito.api_rest.facade;

import com.serranito.api_rest.dao.ProductoDAO;
import com.serranito.api_rest.dao.ProveedorDAO;
import com.serranito.api_rest.dto.ProductoDTO;
import com.serranito.api_rest.model.Producto;
import com.serranito.api_rest.model.Proveedor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductoFacade {
    private final ProductoDAO productoDAO;
    private final ProveedorDAO proveedorDAO;

    public ProductoFacade(ProductoDAO productoDAO, ProveedorDAO proveedorDAO) {
        this.productoDAO = productoDAO;
        this.proveedorDAO = proveedorDAO;
    }

    public List<ProductoDTO> getAllProductos() {
        return productoDAO.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ProductoDTO getProductoById(Integer id) {
        Producto producto = productoDAO.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
        return toDTO(producto);
    }

    public ProductoDTO createProducto(ProductoDTO dto) {
        Producto producto = toEntity(dto);
        producto.setIdProducto(null);
        Producto saved = productoDAO.save(producto);
        return toDTO(saved);
    }

    public ProductoDTO updateProducto(Integer id, ProductoDTO dto) {
        Producto existing = productoDAO.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
        existing.setCodigo(dto.getCodigo());
        existing.setDescripcion(dto.getDescripcion());
        existing.setStock(dto.getStock());
        existing.setPrecio(dto.getPrecio());
        if (dto.getIdProveedor() != null) {
            Proveedor proveedor = proveedorDAO.findById(dto.getIdProveedor())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proveedor no encontrado"));
            existing.setProveedor(proveedor);
        }
        Producto updated = productoDAO.save(existing);
        return toDTO(updated);
    }

    public void deleteProducto(Integer id) {
        if (!productoDAO.exists(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado");
        }
        productoDAO.deleteById(id);
    }

    private ProductoDTO toDTO(Producto producto) {
        return ProductoDTO.builder()
                .id(producto.getIdProducto())
                .codigo(producto.getCodigo())
                .descripcion(producto.getDescripcion())
                .stock(producto.getStock())
                .precio(producto.getPrecio())
                .idProveedor(producto.getProveedor() != null ? producto.getProveedor().getIdProveedor() : null)
                .build();
    }

    private Producto toEntity(ProductoDTO dto) {
        Producto producto = Producto.builder()
                .idProducto(dto.getId())
                .codigo(dto.getCodigo())
                .descripcion(dto.getDescripcion())
                .stock(dto.getStock())
                .precio(dto.getPrecio())
                .build();
        if (dto.getIdProveedor() != null) {
            Proveedor proveedor = proveedorDAO.findById(dto.getIdProveedor())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proveedor no encontrado"));
            producto.setProveedor(proveedor);
        }
        return producto;
    }
}
