package com.serranito.api_rest.facade;

import com.serranito.api_rest.dao.EmpresaDAO;
import com.serranito.api_rest.dto.EmpresaDTO;
import com.serranito.api_rest.model.Empresa;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class EmpresaFacade {
    private final EmpresaDAO empresaDAO;

    public EmpresaFacade(EmpresaDAO empresaDAO) {
        this.empresaDAO = empresaDAO;
    }

    public List<EmpresaDTO> getAllEmpresas() {
        return empresaDAO.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public EmpresaDTO getEmpresaById(Integer id) {
        Empresa empresa = empresaDAO.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Empresa no encontrada"));
        return toDTO(empresa);
    }

    public EmpresaDTO editEmpresa(EmpresaDTO dto) {
        List<Empresa> empresas = empresaDAO.findAll();
        if (empresas == null || empresas.isEmpty()) {
            return createEmpresa(dto);
        }
        Integer id = empresas.get(0).getIdEmpresa();
        return updateEmpresa(id, dto);
    }

    public EmpresaDTO createEmpresa(EmpresaDTO dto) {
        Empresa empresa = toEntity(dto);
        empresa.setIdEmpresa(null);
        Empresa saved = empresaDAO.save(empresa);
        return toDTO(saved);
    }

    public EmpresaDTO updateEmpresa(Integer id, EmpresaDTO dto) {
        Empresa existing = empresaDAO.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Empresa no encontrada"));
        existing.setRuc(dto.getRuc());
        existing.setNombre(dto.getNombre());
        existing.setTelefono(dto.getTelefono());
        existing.setDireccion(dto.getDireccion());
        existing.setRazonSocial(dto.getRazonSocial());
        Empresa updated = empresaDAO.save(existing);
        return toDTO(updated);
    }

    public void deleteEmpresa(Integer id) {
        if (!empresaDAO.exists(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Empresa no encontrada");
        }
        empresaDAO.deleteById(id);
    }

    private EmpresaDTO toDTO(Empresa empresa) {
        return EmpresaDTO.builder()
                .id(empresa.getIdEmpresa())
                .ruc(empresa.getRuc())
                .nombre(empresa.getNombre())
                .telefono(empresa.getTelefono())
                .direccion(empresa.getDireccion())
                .razonSocial(empresa.getRazonSocial())
                .build();
    }

    private Empresa toEntity(EmpresaDTO dto) {
        return Empresa.builder()
                .idEmpresa(dto.getId())
                .ruc(dto.getRuc())
                .nombre(dto.getNombre())
                .telefono(dto.getTelefono())
                .direccion(dto.getDireccion())
                .razonSocial(dto.getRazonSocial())
                .build();
    }
}
