package com.serranito.api_rest.facade;

import com.serranito.api_rest.dao.DetalleVentaDAO;
import com.serranito.api_rest.dao.ProductoDAO;
import com.serranito.api_rest.dao.VentaDAO;
import com.serranito.api_rest.dto.DetalleVentaDTO;
import com.serranito.api_rest.model.DetalleVenta;
import com.serranito.api_rest.model.Producto;
import com.serranito.api_rest.model.Venta;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DetalleVentaFacade {
    private final DetalleVentaDAO detalleVentaDAO;
    private final VentaDAO ventaDAO;
    private final ProductoDAO productoDAO;

    public DetalleVentaFacade(DetalleVentaDAO detalleVentaDAO, VentaDAO ventaDAO, ProductoDAO productoDAO) {
        this.detalleVentaDAO = detalleVentaDAO;
        this.ventaDAO = ventaDAO;
        this.productoDAO = productoDAO;
    }

    public List<DetalleVentaDTO> getAllDetalles() {
        return detalleVentaDAO.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public DetalleVentaDTO getDetalleById(Integer id) {
        DetalleVenta detalle = detalleVentaDAO.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Detalle no encontrado"));
        return toDTO(detalle);
    }

    public DetalleVentaDTO createDetalle(DetalleVentaDTO dto) {
        DetalleVenta detalle = toEntity(dto);
        detalle.setIdDetalle(null);
        DetalleVenta saved = detalleVentaDAO.save(detalle);
        return toDTO(saved);
    }

    public DetalleVentaDTO updateDetalle(Integer id, DetalleVentaDTO dto) {
        DetalleVenta existing = detalleVentaDAO.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Detalle no encontrado"));
        if (dto.getIdVenta() != null) {
            Venta venta = ventaDAO.findById(dto.getIdVenta())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venta no encontrada"));
            existing.setVenta(venta);
        }
        if (dto.getIdProducto() != null) {
            Producto producto = productoDAO.findById(dto.getIdProducto())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
            existing.setProducto(producto);
        }
        existing.setCantidad(dto.getCantidad());
        existing.setPrecio(dto.getPrecio());
        existing.setSubtotal(dto.getSubtotal());
        DetalleVenta updated = detalleVentaDAO.save(existing);
        return toDTO(updated);
    }

    public void deleteDetalle(Integer id) {
        if (!detalleVentaDAO.exists(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Detalle no encontrado");
        }
        detalleVentaDAO.deleteById(id);
    }

    private DetalleVentaDTO toDTO(DetalleVenta detalle) {
        return DetalleVentaDTO.builder()
                .id(detalle.getIdDetalle())
                .idVenta(detalle.getVenta() != null ? detalle.getVenta().getIdVenta() : null)
                .idProducto(detalle.getProducto() != null ? detalle.getProducto().getIdProducto() : null)
                .cantidad(detalle.getCantidad())
                .precio(detalle.getPrecio())
                .subtotal(detalle.getSubtotal())
                .build();
    }

    private DetalleVenta toEntity(DetalleVentaDTO dto) {
        DetalleVenta detalle = DetalleVenta.builder()
                .idDetalle(dto.getId())
                .cantidad(dto.getCantidad())
                .precio(dto.getPrecio())
                .subtotal(dto.getSubtotal())
                .build();
        if (dto.getIdVenta() != null) {
            Venta venta = ventaDAO.findById(dto.getIdVenta())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venta no encontrada"));
            detalle.setVenta(venta);
        }
        if (dto.getIdProducto() != null) {
            Producto producto = productoDAO.findById(dto.getIdProducto())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
            detalle.setProducto(producto);
        }
        return detalle;
    }
}
