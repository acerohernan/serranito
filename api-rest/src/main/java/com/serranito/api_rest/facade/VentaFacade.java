package com.serranito.api_rest.facade;

import com.serranito.api_rest.dao.ClienteDAO;
import com.serranito.api_rest.dao.VentaDAO;
import com.serranito.api_rest.dto.VentaDTO;
import com.serranito.api_rest.model.Cliente;
import com.serranito.api_rest.model.Venta;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class VentaFacade {
    private final VentaDAO ventaDAO;
    private final ClienteDAO clienteDAO;

    public VentaFacade(VentaDAO ventaDAO, ClienteDAO clienteDAO) {
        this.ventaDAO = ventaDAO;
        this.clienteDAO = clienteDAO;
    }

    public List<VentaDTO> getAllVentas() {
        return ventaDAO.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public VentaDTO getVentaById(Integer id) {
        Venta venta = ventaDAO.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venta no encontrada"));
        return toDTO(venta);
    }

    public VentaDTO createVenta(VentaDTO dto) {
        Venta venta = toEntity(dto);
        venta.setIdVenta(null);
        Venta saved = ventaDAO.save(venta);
        return toDTO(saved);
    }

    public VentaDTO updateVenta(Integer id, VentaDTO dto) {
        Venta existing = ventaDAO.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venta no encontrada"));
        if (dto.getIdCliente() != null) {
            Cliente cliente = clienteDAO.findById(dto.getIdCliente())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente no encontrado"));
            existing.setCliente(cliente);
        }
        existing.setFecha(dto.getFecha());
        existing.setTotal(dto.getTotal());
        Venta updated = ventaDAO.save(existing);
        return toDTO(updated);
    }

    public void deleteVenta(Integer id) {
        if (!ventaDAO.exists(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Venta no encontrada");
        }
        ventaDAO.deleteById(id);
    }

    private VentaDTO toDTO(Venta venta) {
        return VentaDTO.builder()
                .id(venta.getIdVenta())
                .idCliente(venta.getCliente() != null ? venta.getCliente().getIdCliente() : null)
                .fecha(venta.getFecha())
                .total(venta.getTotal())
                .build();
    }

    private Venta toEntity(VentaDTO dto) {
        Venta venta = Venta.builder()
                .idVenta(dto.getId())
                .fecha(dto.getFecha())
                .total(dto.getTotal())
                .build();
        if (dto.getIdCliente() != null) {
            Cliente cliente = clienteDAO.findById(dto.getIdCliente())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente no encontrado"));
            venta.setCliente(cliente);
        }
        return venta;
    }
}
