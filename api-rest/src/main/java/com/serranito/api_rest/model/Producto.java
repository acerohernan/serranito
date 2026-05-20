package com.serranito.api_rest.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "productos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Integer idProducto;

    @Column(name = "codigo", length = 20)
    private String codigo;

    @Column(name = "descripcion", length = 150)
    private String descripcion;

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "precio", precision = 10, scale = 2)
    private BigDecimal precio;

    @ManyToOne
    @JoinColumn(name = "id_proveedor")
    private Proveedor proveedor;
}
