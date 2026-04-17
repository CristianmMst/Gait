describe('Pruebas módulo Producto', () => { 
  beforeEach(() => { 
    jest.clearAllMocks(); 
  }); 
 
  it('Creación de producto válido', async () => { 
    const productRepository = { 
      create: jest.fn(), 
    }; 
 
    const crearProducto = async (producto: { 
      nombre: string; 
      precio: number; 
      stock: number; 
    }) => { 
      if (producto.precio < 0) { 
        throw new Error('Precio inválido'); 
      } 
 
      return await productRepository.create(producto); 
    }; 
 
    const productoMock = { 
      id: 1, 
      nombre: 'Teclado', 
      precio: 100, 
      stock: 5, 
    }; 
 
    productRepository.create.mockResolvedValue(productoMock); 
 
    const resultado = await crearProducto({ 
      nombre: 'Teclado', 
      precio: 100, 
      stock: 5, 
    }); 
 
    expect(productRepository.create).toHaveBeenCalledWith({ 
      nombre: 'Teclado', 
      precio: 100, 
      stock: 5, 
    }); 
    expect(resultado.nombre).toBe('Teclado'); 
    expect(resultado.precio).toBe(100); 
    expect(resultado.stock).toBe(5); 
  }); 
 
  it('Actualización de precio y stock', async () => { 
    const productRepository = { 
      findById: jest.fn(), 
      update: jest.fn(), 
    }; 
 
    const actualizarProducto = async ( 
      id: number, 
      datos: { precio: number; stock: number } 
    ) => { 
      const producto = await productRepository.findById(id); 
 
      if (!producto) { 
        throw new Error('Producto no encontrado'); 
      } 
 
      const actualizado = { 
        ...producto, 
        precio: datos.precio, 
        stock: datos.stock, 
      }; 
 
      return await productRepository.update(actualizado); 
    }; 
 
    const productoExistente = { 
      id: 1, 
      nombre: 'Mouse', 
      precio: 50, 
      stock: 10, 
    }; 
 
    productRepository.findById.mockResolvedValue(productoExistente); 
    productRepository.update.mockResolvedValue({ 
      id: 1, 
      nombre: 'Mouse', 
      precio: 70, 
      stock: 8, 
    }); 
 
    const resultado = await actualizarProducto(1, { 
      precio: 70, 
      stock: 8, 
    }); 
 
    expect(productRepository.findById).toHaveBeenCalledWith(1); 
    expect(productRepository.update).toHaveBeenCalledWith({ 
      id: 1, 
      nombre: 'Mouse', 
      precio: 70, 
      stock: 8, 
    }); 
    expect(resultado.precio).toBe(70); 
    expect(resultado.stock).toBe(8); 
  }); 
 
  it('Validación de precio negativo', async () => { 
    const productRepository = { 
      create: jest.fn(), 
    }; 
 
    const crearProducto = async (producto: { 
      nombre: string; 
      precio: number; 
      stock: number; 
    }) => { 
      if (producto.precio < 0) { 
        throw new Error('Precio inválido'); 
      } 
 
      return await productRepository.create(producto); 
    }; 
 
    await expect( 
      crearProducto({ 
        nombre: 'Monitor', 
        precio: -100, 
        stock: 3, 
      }) 
    ).rejects.toThrow('Precio inválido'); 
 
    expect(productRepository.create).not.toHaveBeenCalled(); 
  }); 
}); 