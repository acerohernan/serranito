package com.serranito.api_rest.facade;

import com.serranito.api_rest.dao.ClienteDAO;
import com.serranito.api_rest.dto.ClienteDTO;
import com.serranito.api_rest.model.Cliente;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ClienteFacade {
    private final ClienteDAO clienteDAO;

    public ClienteFacade(ClienteDAO clienteDAO) {
        this.clienteDAO = clienteDAO;
    }

    public List<ClienteDTO> getAllClientes() {
        return clienteDAO.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ClienteDTO getClienteById(Integer id) {
        Cliente cliente = clienteDAO.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente no encontrado"));
        return toDTO(cliente);
    }

    public ClienteDTO createCliente(ClienteDTO dto) {
        Cliente cliente = toEntity(dto);
        cliente.setIdCliente(null);
        Cliente saved = clienteDAO.save(cliente);
        return toDTO(saved);
    }

    public ClienteDTO updateCliente(Integer id, ClienteDTO dto) {
        Cliente existing = clienteDAO.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente no encontrado"));
        existing.setDniRuc(dto.getDniRuc());
        existing.setNombre(dto.getNombre());
        existing.setTelefono(dto.getTelefono());
        existing.setDireccion(dto.getDireccion());
        existing.setRazonSocial(dto.getRazonSocial());
        Cliente updated = clienteDAO.save(existing);
        return toDTO(updated);
    }

    public void deleteCliente(Integer id) {
        if (!clienteDAO.exists(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente no encontrado");
        }
        clienteDAO.deleteById(id);
    }

    private ClienteDTO toDTO(Cliente cliente) {
        return ClienteDTO.builder()
                .id(cliente.getIdCliente())
                .dniRuc(cliente.getDniRuc())
                .nombre(cliente.getNombre())
                .telefono(cliente.getTelefono())
                .direccion(cliente.getDireccion())
                .razonSocial(cliente.getRazonSocial())
                .build();
    }

    private Cliente toEntity(ClienteDTO dto) {
        return Cliente.builder()
                .idCliente(dto.getId())
                .dniRuc(dto.getDniRuc())
                .nombre(dto.getNombre())
                .telefono(dto.getTelefono())
                .direccion(dto.getDireccion())
                .razonSocial(dto.getRazonSocial())
                .build();
    }
}
