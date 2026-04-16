describe('Pruebas módulo Orden y Login', () => { 

  beforeEach(() => { 

    jest.clearAllMocks(); 

  }); 

  it('Cálculo correcto del total', () => { 

    const productos = [ 

      { precio: 100, cantidad: 2 }, 

      { precio: 50, cantidad: 1 }, 

    ]; 

     const calcularTotal = (items: { precio: number; cantidad: number }[]) => { 

     return items.reduce((acc, item) => acc + item.precio * item.cantidad, 0); 

  }; 

  const total = calcularTotal(productos); 

expect(total).toBe(250); 

  }); 

  it('Cambio de estado de la orden', async () => { 

    const orderRepository = { 

      findById: jest.fn(), 

      save: jest.fn(), 
    };
const cambiarEstado = async (id: number, nuevoEstado: string) => { 

      const orden = await orderRepository.findById(id); 

      orden.estado = nuevoEstado; 

      return await orderRepository.save(orden); 

    }; 

const ordenMock = { id: 1, estado: 'pendiente' }; 


    orderRepository.findById.mockResolvedValue(ordenMock); 

    orderRepository.save.mockResolvedValue({ 

      id: 1, 

      estado: 'pagado', 

    }); 
const resultado = await cambiarEstado(1, 'pagado'); 

 

    expect(orderRepository.findById).toHaveBeenCalledWith(1); 

    expect(orderRepository.save).toHaveBeenCalledWith({ 

      id: 1, 

      estado: 'pagado', 

    }); 

    expect(resultado.estado).toBe('pagado'); 

  }); 

  it('Logout del usuario', () => { 

    const tokenService = { 

      invalidate: jest.fn(), 

    }; 
logout = (token: string) => { 

return tokenService.invalidate(token); 

    }; 

    tokenService.invalidate.mockReturnValue(true); 
const resultado = logout('fake-token'); 

 

    expect(tokenService.invalidate).toHaveBeenCalledWith('fake-token'); 

    expect(resultado).toBe(true); 

  }); 

}); 
