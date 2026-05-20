package com.serranito.api_rest.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "proveedores")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Proveedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_proveedor")
    private Integer idProveedor;

    @Column(name = "ruc", length = 15, nullable = false)
    private String ruc;

    @Column(name = "nombre", length = 100, nullable = false)
    private String nombre;

    @Column(name = "telefono", length = 15)
    private String telefono;

    @Column(name = "direccion", length = 150)
    private String direccion;

    @Column(name = "razon_social", length = 150)
    private String razonSocial;
}
