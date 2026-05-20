package com.serranito.api_rest.facade;

import com.serranito.api_rest.dao.ProveedorDAO;
import com.serranito.api_rest.dto.ProveedorDTO;
import com.serranito.api_rest.model.Proveedor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProveedorFacade {
    private final ProveedorDAO proveedorDAO;

    public ProveedorFacade(ProveedorDAO proveedorDAO) {
        this.proveedorDAO = proveedorDAO;
    }

    public List<ProveedorDTO> getAllProveedores() {
        return proveedorDAO.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ProveedorDTO getProveedorById(Integer id) {
        Proveedor proveedor = proveedorDAO.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proveedor no encontrado"));
        return toDTO(proveedor);
    }

    public ProveedorDTO createProveedor(ProveedorDTO dto) {
        Proveedor proveedor = toEntity(dto);
        proveedor.setIdProveedor(null);
        Proveedor saved = proveedorDAO.save(proveedor);
        return toDTO(saved);
    }

    public ProveedorDTO updateProveedor(Integer id, ProveedorDTO dto) {
        Proveedor existing = proveedorDAO.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proveedor no encontrado"));
        existing.setRuc(dto.getRuc());
        existing.setNombre(dto.getNombre());
        existing.setTelefono(dto.getTelefono());
        existing.setDireccion(dto.getDireccion());
        existing.setRazonSocial(dto.getRazonSocial());
        Proveedor updated = proveedorDAO.save(existing);
        return toDTO(updated);
    }

    public void deleteProveedor(Integer id) {
        if (!proveedorDAO.exists(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Proveedor no encontrado");
        }
        proveedorDAO.deleteById(id);
    }

    private ProveedorDTO toDTO(Proveedor proveedor) {
        return ProveedorDTO.builder()
                .id(proveedor.getIdProveedor())
                .ruc(proveedor.getRuc())
                .nombre(proveedor.getNombre())
                .telefono(proveedor.getTelefono())
                .direccion(proveedor.getDireccion())
                .razonSocial(proveedor.getRazonSocial())
                .build();
    }

    private Proveedor toEntity(ProveedorDTO dto) {
        return Proveedor.builder()
                .idProveedor(dto.getId())
                .ruc(dto.getRuc())
                .nombre(dto.getNombre())
                .telefono(dto.getTelefono())
                .direccion(dto.getDireccion())
                .razonSocial(dto.getRazonSocial())
                .build();
    }
}
