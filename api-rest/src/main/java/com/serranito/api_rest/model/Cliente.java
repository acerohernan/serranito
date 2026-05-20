package com.serranito.api_rest.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "clientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private Integer idCliente;

    @Column(name = "dni_ruc", length = 15, nullable = false)
    private String dniRuc;

    @Column(name = "nombre", length = 100, nullable = false)
    private String nombre;

    @Column(name = "telefono", length = 15)
    private String telefono;

    @Column(name = "direccion", length = 150)
    private String direccion;

    @Column(name = "razon_social", length = 150)
    private String razonSocial;
}
